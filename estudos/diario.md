# Diário de Estudos

## Como usar

Após cada lição, adicione uma entrada com a data. Três frases honestas valem mais que um texto decorado.

---

## 2026-08-17 — Lição 01: Sequestro de sessão

- O que fiz: fiz login como `aluno`, copiei o cookie `connect.sid` no DevTools e injetei ele numa janela anônima. Sem digitar senha, entrei em `/perfil` e o servidor retornou `usuario: aluno`. Depois limpei o cookie e fiz logout.
- O que mais me surpreendeu: o servidor não verifica IP nem navegador — ele confia cegamente no valor do cookie. Copiei o valor, virei o dono da sessão. A senha só vale na hora do login; depois disso, o crachá (cookie) vale mais que a prova de identidade.
- Pergunta em aberto: na vida real, como um atacante consegue roubar o cookie de uma vítima de verdade? (sei que XSS é um caminho — quero ver isso na prática na Lição 04)