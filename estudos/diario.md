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

---

## 2026-08-18 — Lição 03: CSRF

- O que fiz: logado como `aluno`, abri uma página maliciosa (`estudos/ataque/csrf.html`) que dispara sozinha um POST para `/logout`. Com `SameSite=Lax` o ataque falhou (continuei logado); trocando para `SameSite=None` + HTTPS local, fui **deslogado sem clicar em nada**. Depois restaurei o `Lax`.
- O que mais me surpreendeu: o navegador é um "mensageiro cego" — ele entrega o cookie pelo **destino** da requisição, não pela origem. O atacante nem precisa do cookie; a vítima o carrega por ele. E o `SameSite` só protege contra navegadores — o token anti-CSRF (senha do portão) é a defesa universal, verificada no servidor.
- Pergunta em aberto: como a página maliciosa engana a vítima para clicar/visitar na vida real? (engenharia social, anúncios, e-mails?) E o HTTPS local com certificado de teste que configuramos — quando vou entender certificados a fundo? (Lição 07)