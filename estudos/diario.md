# Diário de Estudos

## Como usar

Após cada lição, adicione uma entrada com a data. Três frases honestas valem mais que um texto decorado.

---

## 2026-08-17 — Lição 01: Sequestro de sessão

- O que fiz: fiz login como `aluno`, copiei o cookie `connect.sid` no DevTools e injetei ele numa janela anônima. Sem digitar senha, entrei em `/perfil` e o servidor retornou `usuario: aluno`. Depois limpei o cookie e fiz logout.
- O que mais me surpreendeu: o servidor não verifica IP nem navegador — ele confia cegamente no valor do cookie. Copiei o valor, virei o dono da sessão. A senha só vale na hora do login; depois disso, o crachá (cookie) vale mais que a prova de identidade.
- Pergunta em aberto: na vida real, como um atacante consegue roubar o cookie de uma vítima de verdade? (sei que XSS é um caminho — quero ver isso na prática na Lição 04)

---

## 2026-08-17 — Lição 02: Fixação de sessão

- O que fiz: com `saveUninitialized: true`, a janela anônima (atacante) pegou um cookie de sessão só de visitar o site. Injetei esse cookie no navegador normal (vítima), que fez login com ele — o valor do `connect.sid` não mudou após o login. Aí o atacante abriu `/perfil` e estava logado como `aluno`, sem nunca ter digitado a senha.
- O que mais me surpreendeu: o atacante não rouba nada — ele **entrega** o crachá e a própria vítima o autentica com o login dela. A vulnerabilidade nasce de duas coisas juntas: emitir sessão sem autenticação + não trocar o sid no login. E o `regenerate()` destrói a sessão antiga na hora em que a vítima prova quem é.
- Pergunta em aberto: como um atacante entregaria o cookie pra vítima na vida real sem parecer suspeito? (querry em e-mails, links ou sites maliciosos?)