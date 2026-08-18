# Vistoria Gratuita — Guia de Auditoria Passiva

Auditoria que **não exige contrato** porque só observa o que qualquer visitante vê. Use como isca comercial e porta de entrada para a auditoria completa.

## A régua legal (decore)

- ✅ **Pode sem contrato**: visitar páginas públicas, ler headers, verificar HTTPS/certificado, conferir URLs públicas.
- 🚫 **Nunca sem contrato**: payloads de XSS/injeção, tentativa de login, brute force, scan de portas, explorar qualquer falha encontrada.
- O art. 154-A do Código Penal pune invasão sem autorização — a linha é: **observar ≠ invadir**.

## As 6 verificações

### 1. HTTPS e certificado

**Como verificar:** SSL Labs (ssllabs.com/ssltest) → cola a URL → relatório completo.
**O que ler:** nota geral (A-F), data de expiração, protocolos antigos (TLS 1.0/1.1 reprovam), redirecionamento HTTP→HTTPS.
**Como testar o redirecionamento:**
```powershell
curl -I http://seudominio.com.br   # deve responder 301/308 para o https
```
**Achado comum em LP:** certificado vencido ou sem redirecionamento automático.

### 2. Headers de segurança

**Como verificar:** securityheaders.com → cola a URL → nota de A a F.
**Ou manualmente:**
```powershell
curl -I https://seudominio.com.br
```
**O que procurar (e o que significam):**

| Header | O que faz | Ausente = |
|--------|-----------|-----------|
| `Strict-Transport-Security` (HSTS) | Força HTTPS no navegador | Usuário pode cair em HTTP |
| `Content-Security-Policy` (CSP) | Controla scripts permitidos | XSS mais fácil |
| `X-Frame-Options` | Bloqueia embutir o site em iframe | Clickjacking possível |
| `X-Content-Type-Options` | Navegador não "adivinha" tipo de arquivo | Downloads maliciosos |
| `Referrer-Policy` | Controla o que é enviado ao sair do site | Vazamento de URL |
| `Server` | Revela tecnologia/versão | Informação grátis pro atacante |

**Regra do reportar:** note F no SecurityHeaders = "seu site não envia nenhum header de proteção; navegadores modernos esperam eles".

### 3. Formulários e integrações

**Observar (sem enviar dados):**
- O formulário envia para `http://` (sem HTTPS)?
- O destino é serviço de terceiros (Formspree, Google Forms, WhatsApp)? A resposta vai pra onde?
- Existem campos escondidos com dados sensíveis no HTML?

**Por que importa:** formulário é o ponto onde o visitante digita dados reais (nome, e-mail, telefone). Enviar sem HTTPS = entregar em carta aberta.

### 4. URLs suspeitas (só visitar)

**Checar manualmente no navegador (URL pública, é permitido):**
```
/robots.txt        → revela caminhos que o dono quer esconder
/.env              → vazamento de chaves (se retornar conteúdo, ALTA gravidade)
/.git/             → histórico do código exposto
/backup.zip        → backup do site exposto
/wp-admin          → painel de login exposto (WordPress)
/admin, /login     → painéis em sites que não deveriam ter login
```
**NUNCA tentar entrar** nos painéis — só registrar que existem.

### 5. Tecnologias expostas

**Observar:** versões de frameworks no rodapé, `?ver=1.2.3` em scripts, meta generator, WordPress sem atualização, bibliotecas JS desatualizadas (jQuery 1.x etc.).

**Por que importa:** versão conhecida = exploit conhecido. É o primeiro passo de qualquer atacante.

### 6. Erros e vazamentos

**Observar:** páginas de erro revelando stack (Express, PHP, framework), mensagens de erro com caminhos internos, dados de teste visíveis.

## Modelo de relatório (1 página)

```markdown
# Auditoria básica — <domínio> (<data>)

## Resumo
- HTTPS: ✅/❌ — certificado válido até <data>
- Headers de segurança: nota F — nenhum dos 5 headers essenciais presente
- Formulário: envia dados via HTTPS ✅ / HTTP ❌
- Painéis expostos: /admin respondendo (não testado)

## Achados
| # | Achado | Risco | Correção sugerida |
|---|--------|-------|-------------------|
| 1 | Sem HSTS/CSP/X-Frame-Options | Médio | Ativar via .htaccess / config do servidor |
| 2 | Certificado expirando em <data> | Alto | Renovar; ativar renovação automática |
| 3 | .env acessível publicamente | Alto | Bloquear no servidor; mover para variável de ambiente |

## O que NÃO foi testado
Testes ativos (XSS, injeção, login) exigem autorização por escrito.
```

## Script de apresentação ao dono

> "Fiz uma análise gratuita do seu site — igual fazem os serviços de verificação online. O certificado está [ok/vencido], e o site não envia nenhum header de segurança, que é o padrão que os navegadores modernos esperam. Isso [impacto em termos simples]. Posso te entregar uma auditoria completa com correção desses pontos — quer que eu prepare uma proposta?"

## Dicas finais

- Rode SSL Labs + SecurityHeaders **sempre** — o laudo é da ferramenta, não seu (mais credibilidade).
- Sempre declare o que você **não** testou — honestidade é o que separa vistoria de invasão.
- Achado de `.env` ou backup exposto = corra pro dono, isso é emergência real.