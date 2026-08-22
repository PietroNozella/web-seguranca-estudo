# Cheatsheet — Reconhecimento e Redes

## Nmap
nmap -sn 192.168.1.0/24            # descoberta de hosts (ping scan)
nmap -sV -sC -p- alvo              # todas portas + serviços + scripts
nmap -sU --top-ports 100 alvo      # scan UDP
nmap -A alvo                       # agressivo (OS + serviços + traceroute)

## Masscan (rápido)
masscan -p1-65535 192.168.1.0/24 --rate=1000

## Enumeração web
gobuster dir -u http://alvo -w /usr/share/wordlists/dirb/common.txt
feroxbuster -u http://alvo -x php,html,txt
nikto -h http://alvo

## DNS / conectividade
dig alvo.com; host alvo.com; whois alvo.com
ping -c 4 alvo; traceroute alvo

## Captura (Wireshark ou tshark)
tshark -i eth0 -w captura.pcap
