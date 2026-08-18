# Plano de Estudos — Segurança Web

Trilha prática usando o laboratório local. Ritmo: **30–60 min por dia**.

## Como estudar (método)

1. Leia a teoria curta da lição (10 min).
2. Execute a prática passo a passo no laboratório (20–40 min).
3. Responda as perguntas de verificação no final da lição.
4. Escreva com suas palavras o que aprendeu — mesmo que 3 frases.
5. Se travar em algum passo, releia a teoria em vez de pular direto pra solução.

## Trilha

| Lição | Tema | Conceitos |
|-------|------|-----------|
| 01 | Sequestro de sessão (session hijacking) | Por que o cookie vale ouro; como o servidor confia no cookie |
| 02 | Fixação de sessão (session fixation) | Forçar um cookie conhecido na vítima; regeneração de sessão |
| 03 | CSRF | Fazer o navegador da vítima agir sem ela perceber; tokens anti-CSRF |
| 04 | XSS (Cross-Site Scripting) | Injetar script no servidor; por que httpOnly protege o cookie |
| 05 | Endurecimento | Consertar todas as falhas descobertas nas lições 1–4 |
| 06 | Mapeamento OWASP Top 10 | Encaixar cada ataque estudado na classificação oficial |

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