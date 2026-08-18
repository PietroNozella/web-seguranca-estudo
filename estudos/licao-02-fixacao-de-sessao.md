# Lição 02 — Fixação de Sessão (Session Fixation)

**Tempo estimado:** 40 min

## Objetivo

Entender o ataque inverso ao da Lição 01: em vez de roubar o cookie, o atacante **entrega** um cookie para a vítima usar — e colhe o resultado.

## Teoria (10 min)

No sequestro (Lições 01), o atacante captura o cookie de uma sessão já autenticada.

Na fixação, o fluxo é outro:

1. O atacante visita o site e recebe um cookie de sessão **válido, porém não autenticado**.
2. O atacante injeta esse cookie no navegador da vítima (por e-mail, página maliciosa, etc.).
3. A vítima faz login normalmente — e o servidor **mantém o mesmo sid** (sem regenerar).
4. O atacante, que também tem esse sid, agora está autenticado como a vítima.

A raiz da falha: **o servidor não troca o identificador de sessão depois do login**. A defesa correta é chamar `request.session.regenerate()` ao autenticar, para que o sid usado por quem ainda não provou identidade nunca seja o mesmo do usuário logado.

## Preparação (feita com o guia)

O laboratório foi alterado de propósito: `saveUninitialized: true`. Isso faz o servidor emitir cookie para **qualquer visitante**, mesmo sem login — o comportamento vulnerável. Reverta isso **apenas** na Lição 05.

## Prática (30 min)

**Passo 1 — O atacante coleta o crachá**

- Abra uma janela anônima (navegador do atacante).
- Visite `http://localhost:3000` e **copie** o `connect.sid` (F12 → Application → Cookies). O atacante agora tem um sid válido.

**Passo 2 — A vítima é contaminada**

- No navegador normal (vítima), **apague todos os cookies** de `localhost:3000` (F12 → Application → Cookies → excluir).
- Crie um novo cookie `connect.sid` com o **valor do atacante**.
- **Anote o valor antes de logar.**

**Passo 3 — A vítima faz login**

- Na vítima, faça login com `aluno` / `rede-segura`.
- Volte em Application → Cookies e **compare o valor do `connect.sid`**: continua igual ao do atacante. O servidor não trocou o crachá.

**Passo 4 — O atacante colhe**

- No navegador do atacante (janela anônima), acesse `http://localhost:3000/perfil`.
- O atacante está logado como `aluno`, sem nunca ter digitado a senha. Fixação consumada.

**Passo 5 — Limpeza**

- Apague os cookies dos dois navegadores e faça logout.

## Código: a falha e a correção

**A falha (o que está no laboratório hoje):**

```js
app.post('/login', (request, response) => {
  const { username, password } = request.body;

  if (username !== 'aluno' || password !== 'rede-segura') {
    return response.redirect('/?erro=credenciais');
  }

  request.session.user = username;   // FALHA: reutiliza a sessão ANTIGA
  response.redirect('/perfil');      // (a que o atacante entregou na fixação)
});
```

O servidor só anexa a identidade ao sid que já existia, em vez de criar um sid novo. O atacante conhece esse sid — é o que ele injetou na vítima.

**O código correto:**

```js
app.post('/login', (request, response) => {
  const { username, password } = request.body;

  if (username !== 'aluno' || password !== 'rede-segura') {
    return response.redirect('/?erro=credenciais');
  }

  request.session.regenerate((error) => {   // CORREÇÃO: destrói a sessão antiga
    if (error) return response.redirect('/?erro=erro');  // e cria uma NOVA, com sid novo
    request.session.user = username;        // marca a sessão NOVA como autenticada
    response.redirect('/perfil');
  });
});
```

`regenerate()` recebe um callback que roda **depois** de destruir/criar a sessão — por isso `user` e `redirect` ficam dentro dele. E a segunda metade da falha:

```js
saveUninitialized: false,  // não emite cookie sem login → atacante não tem crachá pra fixar
```

## Verificação (responda sozinho)

1. Qual a diferença essencial entre sequestro (Lições 01) e fixação?
2. Qual linha de código é a vulnerabilidade? Por que `saveUninitialized: true` a habilita?
3. Por que `regenerate()` após o login destruiria o ataque?
4. Se o servidor reiniciar depois do login da vítima, o atacante ainda entra? Por quê?

## O que isso ensina

- Sessões não autenticadas também são valiosas: são "crachás em branco" esperando um login.
- Qualquer troca de privilégio (login, troca de perfil admin) deve gerar um **sid novo**.
- É por isso que frameworks modernos regeneram o sid por padrão no login.

## Anote no diário

Data, o que fez, o que te surpreendeu e uma pergunta em aberto.