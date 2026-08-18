# Plano de Estudos — Segurança Web

Trilha prática usando o laboratório local. Ritmo: **30–60 min por dia**.

## Como estudar (método)

1. Leia a teoria curta da lição (10 min).
2. Execute a prática passo a passo no laboratório (20–40 min).
3. Leia a seção **Código: a falha e a correção** — o trecho vulnerável do `server.js` explicado em JS, lado a lado com a versão correta.
4. Responda as perguntas de verificação no final da lição.
5. Escreva com suas palavras o que aprendeu — mesmo que 3 frases.
6. Se travar em algum passo, releia a teoria em vez de pular direto pra solução.

## Trilha

Fase 1 — fundamentos de ataques de sessão (no laboratório):

| Lição | Tema | Conceitos |
|-------|------|-----------|
| 01 | Sequestro de sessão (session hijacking) | Por que o cookie vale ouro; como o servidor confia no cookie |
| 02 | Fixação de sessão (session fixation) | Forçar um cookie conhecido na vítima; regeneração de sessão |
| 03 | CSRF | Fazer o navegador da vítima agir sem ela perceber; tokens anti-CSRF |
| 04 | XSS (Cross-Site Scripting) | Injetar script no servidor; por que httpOnly protege o cookie |
| 05 | Endurecimento | Consertar todas as falhas descobertas nas lições 1–4 |
| 06 | Mapeamento OWASP Top 10 | Encaixar cada ataque estudado na classificação oficial |

Fase 2 — auditoria de sites estáticos (meta comercial: vender auditoria de segurança de LPs):

| Lição | Tema | Conceitos |
|-------|------|-----------|
| 07 | HTTPS e SSL/TLS | Certificados, SSL Labs, por que HTTPS não é opcional |
| 08 | Cabeçalhos de segurança | HSTS, CSP, X-Frame-Options, nos sites que você entrega |
| 09 | Formulários e integrações | Spam, injeção, validação no servidor; formulários de terceiros |
| 10 | Vazamento de informações | Erros expostos, .env, rotas escondidas, metadados |
| 11 | WordPress (módulo opcional) | Plugins vulneráveis, wp-admin, temas desatualizados |
| 12 | OWASP ZAP na prática | Ferramenta gratuita de varredura; como ler o relatório |

Fase 3 — o serviço (entregar o pentest/auditoria com segurança jurídica):

- Escopo e contrato: o que é permitido testar, autorização por escrito (art. 154-A do Código Penal — testar sem autorização é crime)
- Modelo de relatório: achado, risco (baixo/médio/alto), evidência, correção sugerida
- Precificação e venda do serviço junto às LPs que você já entrega

## Regras do laboratório

- Nunca use credenciais reais.
- Sessões vivem em memória: reiniciar o servidor encerra todas as sessões.
- Ao final de cada lição, anote no arquivo `diario.md` a data, o que aprendeu e o que quer revisar.

## Guia de comandos

```powershell
# Iniciar o laboratório (a partir da pasta do projeto)
npm start

# Parar o servidor no terminal
Ctrl + C
```