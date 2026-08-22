# Cheatsheet — Forense / Blue Team (noções)

## Linha de comando
history                       # comandos executados
last / lastb                  # logins
cat /var/log/auth.log         # autenticação (Debian/Kali)
journalctl -u ssh             # logs de serviço
find / -mtime -1              # arquivos modificados no último dia
lsof -p PID                   # arquivos abertos por processo

## Hashes / integridade
sha256sum arquivo
md5sum arquivo

## Rede (defesa)
ss -tunlp                     # portas abertas locais
iptables -L -n -v             # regras de firewall

## Strings / análise de binário
strings binario
file binario
