# Ambiente de Estudo de Cyber Security
Workspace central para praticar de forma segura (tudo local, em Docker).

## Estrutura
- `docker-compose.yml` : sobe alvos vulneráveis locais (pratique sem sair da máquina)
- `targets/`           : anotações e dicas de cada alvo
- `notes/`             : cheatsheets por tópico (web, rede, forense, etc.)
- `roadmap.md`         : roteiro de estudos do básico ao intermediário

## Alvos disponíveis (docker-compose up -d)
| Serviço    | URL                          | Foco                        |
|------------|------------------------------|-----------------------------|
| dvwa       | http://localhost:8080        | Web básico (SQLi, XSS, etc) |
| webgoat    | http://localhost:8081/WebGoat| Web guiado (OWASP)          |
| juice-shop | http://localhost:3000        | Web moderno (Angular)       |
| mutillidae | http://localhost:8082        | Web básico / injeções       |
| bwapp      | http://localhost:8083        | Web variado                 |
| vapi       | http://localhost:8084        | API REST vulnerável         |

## Como usar
1. Subir os alvos:   `docker compose up -d`
2. Ver status:       `docker compose ps`
3. Parar:            `docker compose down`
4. Acessar pelo navegador e praticar com as ferramentas já instaladas
   (nmap, sqlmap, gobuster, burpsuite, hydra, hashcat, wireshark...)

## Importante
- Todos os alvos rodam LOCALMENTE. Não ataque máquinas que não sejam suas.
- Para CTFs externos use máquinas isoladas (VirtualBox/HackTheBox/TryHackMe).
