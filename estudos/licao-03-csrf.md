# Lição 03 — CSRF (Cross-Site Request Forgery)

**Tempo estimado:** 45 min

## Objetivo

Entender o ataque onde o atacante **não rouba nada**: ele faz o **navegador da vítima** agir sozinho. A vítima está logada; o atacante só precisa que ela abra uma página maliciosa.

## Teoria (10 min)

O navegador anexa cookies automaticamente a requisições para o domínio que os emitiu — **independentemente de onde a requisição veio**. Um form de outro site fazendo `POST` para `localhost:3000/logout` leva o cookie de sessão junto, a menos que o cookie tenha proteção `SameSite`.

O alvo aqui é o `POST /logout` — a vítima logada visita uma página maliciosa e é **deslogada sem clicar em nada**. O ataque real é o mesmo com ações piores (trocar senha, transferir dinheiro).

**As defesas em camadas:**
1. `SameSite=Lax` — o cookie não acompanha requisições cross-site de POST (o laboratório já tem isso!)
2. Token anti-CSRF — o formulário exige um segredo que só o site legitimo conhece
3. (Opcional) Verificação de `Origin`/`Referer` no servidor

## Prática (30 min)

**Passo 1 — A vítima loga**

- Navegador normal: `npm start` (o servidor ainda está com `sameSite: 'lax'`), login `aluno` / `rede-segura`.

**Passo 2 — A vítima visita a página maliciosa**

- Abra `estudos/ataque/csrf.html` (clique duas vezes no arquivo ou arraste pro navegador — ele abre via `file://`, ou seja, **outra origem**).
- A página parece uma "oferta" inofensiva — mas dispara sozinha um `POST` para `/logout`.

**Passo 3 — A defesa funciona (observe!)**

- Após a página "disparar", volte ao navegador e abra `http://localhost:3000/perfil`.
- **Você continua logado.** O `SameSite=Lax` barrou o cookie na requisição cross-site. O logout não aconteceu.

**Passo 4 — Remova a defesa (o ataque funciona)**

No `src/server.js`, mude (é a Lição 05 que conserta, não se preocupe):

```js
cookie: {
  httpOnly: true,
  sameSite: 'none',      // LIÇÃO 03: sem proteção cross-site (vulnerável)
  secure: true,          // navegadores modernos exigem Secure junto com None
  maxAge: 15 * 60 * 1000
}
```

Reinicie o servidor, refaça o login e abra `estudos/ataque/csrf.html` de novo. Depois tente `/perfil`:

- **Você foi deslogado.** O navegador enviou o cookie sem o SameSite, e o `POST /logout` funcionou sozinho. CSRF consumado.

**Passo 5 — Limpeza**

- Volte o servidor para `sameSite: 'lax'` e `secure: false`. Reinicie.

## Código: a falha e a correção

**A falha (no estado do Passo 4):**

```js
app.use(session({
  cookie: {
    sameSite: 'none',   // FALHA: cookie viaja em requisições cross-site
    secure: true,
  }
}));
```

E o `POST /logout` aceita a requisição sem exigir nenhuma prova de que ela veio da própria aplicação:

```js
app.post('/logout', requireLogin, (request, response) => {
  // FALHA: não verifica de onde a requisição veio nem exige token
  request.session.destroy(() => { ... });
});
```

**O código correto (duas camadas):**

Camada 1 — `SameSite=Lax` de volta:

```js
cookie: {
  sameSite: 'lax',   // CORREÇÃO: cookie não acompanha POST cross-site
}
```

Camada 2 — token anti-CSRF (defesa em profundidade, mesmo se um dia o SameSite não bastar):

```js
const crypto = require('crypto');

// middleware que garante um token único por sessão
app.use((request, response, next) => {
  if (!request.session.csrfToken) {
    request.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  response.locals.csrfToken = request.session.csrfToken;  // disponível para o HTML
  next();
});

app.post('/logout', requireLogin, (request, response) => {
  // CORREÇÃO: só aceita se o token enviado bater com o da sessão
  if (request.body._csrf !== request.session.csrfToken) {
    return response.status(403).send('Token CSRF inválido.');
  }
  request.session.destroy(() => { ... });
});
```

E o form do `perfil.html` deve incluir o token (a rota `/perfil` precisaria renderizar o HTML com o token injetado):

```html
<form action="/logout" method="post">
  <input type="hidden" name="_csrf" value="{token-da-sessão}">
  <button type="submit">Encerrar sessão</button>
</form>
```

**Explicação em JS:** `crypto.randomBytes(32).toString('hex')` gera um segredo aleatório por sessão. A página maliciosa **não conhece esse segredo** — mesmo com o cookie fluindo, o `POST` dela chega sem o `_csrf` correto e é rejeitado com `403`. O token é a prova de que o form foi gerado pela própria aplicação.

## Verificação (responda sozinho)

1. Por que o navegador enviou o cookie na requisição vinda do arquivo `file://`? (O que ele não sabia sobre a origem?)
2. O que exatamente o `SameSite=Lax` bloqueia — e o que ele ainda permite? (Dica: clique em links?)
3. Se a vítima está logada, por que o token anti-CSRF para o atacante, já que ele nem precisa dele?
4. Uma aplicação só com `SameSite=Lax` está 100% protegida contra CSRF? Justifique.

## O que isso ensina

- CSRF usa o **navegador da vítima** como arma — o atacante não precisa do cookie, o navegador já o carrega.
- `SameSite` é a defesa moderna padrão; o token anti-CSRF é a camada que não depende do navegador.
- A "oferta inofensiva" que você abriu é como os ataques reais começam — e por isso formulários sensíveis sempre exigem mais do que o cookie.

## Anote no diário

Data, o que fez, o que te surpreendeu e uma pergunta em aberto.