# Lição 01 — Sequestro de sessão (Session Hijacking)

**Tempo estimado:** 40 min

## Objetivo

Entender por que o cookie de sessão é o "ouro" de uma aplicação web e como um atacante que o rouba vira o usuário.

## Teoria (10 min)

Quando você faz login, o servidor:

1. Verifica usuário e senha.
2. Cria uma sessão na memória e gera um identificador único (o `sid`).
3. Envia esse `sid` ao navegador dentro do cookie `connect.sid`.

A partir daí, **o servidor não sabe mais quem você é** — ele só olha o cookie que chega em cada requisição. Quem apresenta o `sid` correto é o "dono" da sessão. Por isso:

> Roubar o cookie = roubar a identidade. Não é preciso saber senha nenhuma.

No nosso laboratório isso é fácil de ver: sessões ficam em memória, sem amarrar o cookie a IP, navegador ou dispositivo. Copiou o cookie, virou o aluno.

## Prática (30 min)

**Passo 1 — Prepare dois navegadores**

- Navegador A: seu navegador normal.
- Navegador B: janela anônima (ou outro navegador instalado).

**Passo 2 — Faça login no Navegador A**

```powershell
npm start
```

Abra `http://localhost:3000` e entre com `aluno` / `rede-segura`. Você deve cair em `/perfil`.

**Passo 3 — Copie o cookie (o "roubo")**

1. No Navegador A, abra `F12` → aba **Application** → **Cookies** → `http://localhost:3000`.
2. Localize `connect.sid` e **copie o valor** (o texto longo do `Value`).

Isso representa o atacante capturando o cookie (na vida real: XSS, rede sem criptografia, malware, vazamento em log).

**Passo 4 — Injete o cookie no Navegador B (o "uso do roubo")**

1. No Navegador B, visite `http://localhost:3000` (a página de login aparece, mas ignore).
2. `F12` → **Application** → **Cookies** → `http://localhost:3000`.
3. Clique no **+** (novo cookie) e preencha:
   - Name: `connect.sid`
   - Value: cole o valor roubado
4. Clique em salvar.

**Passo 5 — Prove o sequestro**

No Navegador B, acesse `http://localhost:3000/perfil` **sem fazer login**.

- Você entrou na rota protegida. O servidor acreditou que você é o `aluno`.
- Confira em `http://localhost:3000/api/sessao` — retorna `{"usuario":"aluno","sessaoAtiva":true}`.

**Passo 6 — Limpeza**

No Navegador B, apague o cookie injetado. Volte ao Navegador A e clique em **Encerrar sessão**.

## Verificação (responda sozinho)

1. O que exatamente o servidor usa para decidir que uma requisição tem sessão?
2. Por que o atacante não precisou da senha para virar o `aluno`?
3. Se o servidor reiniciar, o sequestro funciona? Por quê? (teste e descubra)
4. O que o `httpOnly: true` no cookie protege? O que ele **não** protege?

## O que isso ensina

- Sessão por cookie é confiança cega: o servidor verifica o `sid`, não a pessoa.
- Mitigações reais: `secure` (cookie só em HTTPS), tempo de vida curto, regenerar `sid` após login, amarrar sessão ao IP/User-Agent, monitorar anomalias.
- O `httpOnly` protege contra roubo **via JavaScript** (XSS) — mas não contra roubo em rede, logs ou acesso físico. Por isso HTTPS importa.

## Anote no diário

No arquivo `estudos/diario.md`, escreva a data de hoje e:

- O que você fez.
- O que mais te surpreendeu.
- Uma pergunta que ficou em aberto.

Na próxima sessão (Lição 02), vamos usar o laboratório para o **fixação de sessão** — o ataque onde o atacante **entrega** o cookie para a vítima usar, em vez de roubar.