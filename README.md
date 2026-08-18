# Laboratório de Sessões Web

Aplicação local e intencionalmente simples para estudar login, cookies de sessão e rotas protegidas.

## Como executar

```powershell
npm install
npm start
```

Abra `http://localhost:3000` e faça login com `aluno` / `rede-segura`.

## Primeiro exercício

1. Abra o DevTools (`F12`) antes de fazer login.
2. Na aba **Network**, envie o formulário e selecione a resposta do `POST /login`.
3. Localize o cabeçalho `Set-Cookie` na resposta.
4. Em **Application > Cookies**, veja as propriedades do cookie criado.
5. Acesse `/perfil` e veja que a requisição envia o cabeçalho `Cookie`.
6. Faça logout e tente abrir `/perfil` novamente.

Nunca publique o valor do cookie ou altere este laboratório para receber credenciais reais.
