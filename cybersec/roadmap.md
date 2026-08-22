# Roteiro de Estudos — Cyber Security (Básico → Intermediário)

## Fase 0 — Fundamentos (obrigatório)
- [ ] Linux básico: navegação, permissões, pipes, grep, bash
- [ ] Redes: modelo OSI/TCP-IP, IP, portas, DNS, HTTP/HTTPS
- [ ] Como funciona a web: requisições, cookies, sessões, same-origin

## Fase 1 — Reconhecimento e Redes
- [ ] `nmap` — descoberta de hosts e portas
- [ ] `masscan` — scan rápido de grandes faixas
- [ ] Enumeração com `gobuster`/`feroxbuster` (diretórios web)
- [ ] Wireshark — capturar e entender tráfego

## Fase 2 — Hacking Web (comece pelo DVWA no nível "low")
- [ ] SQL Injection (`sqlmap`)
- [ ] XSS (refletido, armazenado, DOM)
- [ ] Autenticação: brute force (`hydra`), sessões
- [ ] Path traversal / LFI / RFI
- [ ] Burp Suite — interceptar e modificar requisições

## Fase 3 — Exploitação e Pentest
- [ ] Metasploit Framework (`msfconsole`)
- [ ] Ganhar acesso / escalar privilégios (básico)
- [ ] Pivoting e post-exploitation (intro)

## Fase 4 — Forense e Blue Team (noções)
- [ ] Análise de logs e de arquivos
- [ ] Linha de comando defensiva / detecção básica

## Prática contínua
- Juice Shop e WebGoat têm lições guiadas — faça na ordem.
- CTFs: OverTheWire (Bandit), picoCTF, TryHackMe (rótulo "Beginner").
- Anote sempre o que aprendeu em `notes/`.

## Regra de ouro
Só pratique em alvos seus ou autorizados (labs locais, CTFs, HTB/TryHackMe).
