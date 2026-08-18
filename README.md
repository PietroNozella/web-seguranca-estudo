# Laboratório de Sessões Web

Aplicação local e intencionalmente simples para estudar login, cookies de sessão, rotas protegidas e ataques de sessão — com trilha de estudos guiada em `estudos/`.

## Como executar

```powershell
npm install
npm start
```

Abra `http://localhost:3000` e faça login com `aluno` / `rede-segura`.

## Observando a sessão (primeiro exercício)

1. Abra o DevTools (`F12`) antes de fazer login.
2. Na aba **Network**, envie o formulário e selecione a resposta do `POST /login`.
3. Localize o cabeçalho `Set-Cookie` na resposta.
4. Em **Application > Cookies**, veja as propriedades do cookie criado.
5. Acesse `/perfil` e veja que a requisição envia o cabeçalho `Cookie`.
6. Faça logout e tente abrir `/perfil` novamente.

## Trilha de estudos

O conteúdo de segurança fica na pasta `estudos/`:

- `PLANO.md` — método de estudo e a trilha completa de lições (sequestro de sessão, fixação, CSRF, XSS, endurecimento e OWASP Top 10)
- `licao-XX-*.md` — cada lição traz teoria curta, prática passo a passo no laboratório, a seção **"Código: a falha e a correção"** (trecho vulnerável vs. versão correta, explicado em JS) e perguntas de verificação
- `diario.md` — registro diário do que foi feito, aprendido e das perguntas em aberto

## Progresso

- [x] **Lição 01 — Sequestro de sessão** (17/08/2026): roubei o cookie `connect.sid` entre navegadores e entrei em `/perfil` sem senha. Aprendi que o servidor confia cegamente no cookie — a senha só vale no login; depois, o cookie é a identidade. Diário: `estudos/diario.md`
- [x] **Lição 02 — Fixação de sessão** (17/08/2026): com `saveUninitialized: true`, o atacante entrega o crachá e a vítima o autentica — o `sid` não é regenerado no login. Aprendi que a correção é `request.session.regenerate()` no `POST /login`. Diário: `estudos/diario.md`
- [ ] Lição 03 — CSRF
- [ ] Lição 04 — XSS
- [ ] Lição 05 — Endurecimento (corrigir `saveUninitialized` + `regenerate()`)
- [ ] Lição 06 — Mapeamento OWASP Top 10

## Avisos

- O laboratório é **vulnerável de propósito** durante o estudo: `saveUninitialized: true` está ativo (Lição 02) para permitir a demonstração de fixação de sessão. A correção faz parte da Lição 05.
- Nunca publique o valor do cookie, nunca use credenciais reais e nunca altere este laboratório para receber credenciais reais.
- Sessões vivem em memória: reiniciar o servidor derruba todas as sessões.