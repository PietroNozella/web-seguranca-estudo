const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 3000;
const events = [];
const certDir = path.join(__dirname, '..', 'cert');

function registerEvent(message) {
  events.unshift({ message, time: new Date().toLocaleTimeString('pt-BR') });
  events.splice(10);
}

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'laboratorio-local-nao-use-em-producao',
    resave: false,
    // LIÇÃO 02 (vulnerável): emite cookie para qualquer visitante, mesmo sem login.
    // Isso permite a fixação de sessão. Será corrigido na Lição 05 com regenerate().
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // Defesa padrão contra CSRF: cookie não acompanha POSTs de outras origens.
      // A Lição 05 adiciona a segunda camada (token anti-CSRF).
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    }
  })
);
app.use(express.static(path.join(__dirname, '..', 'public')));

function requireLogin(request, response, next) {
  if (!request.session.user) {
    registerEvent('Tentativa de acessar /perfil sem sessão.');
    return response.redirect('/');
  }

  next();
}

app.post('/login', (request, response) => {
  const { username, password } = request.body;

  if (username !== 'aluno' || password !== 'rede-segura') {
    registerEvent(`Login recusado para o usuário: ${username || '(vazio)'}.`);
    return response.redirect('/?erro=credenciais');
  }

  request.session.user = username;
  registerEvent(`Sessão criada para ${username}.`);
  response.redirect('/perfil');
});

app.get('/perfil', requireLogin, (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'public', 'perfil.html'));
});

app.get('/api/sessao', requireLogin, (request, response) => {
  response.json({ usuario: request.session.user, sessaoAtiva: true });
});

app.get('/api/eventos', requireLogin, (request, response) => {
  response.json(events);
});

app.post('/logout', requireLogin, (request, response) => {
  const user = request.session.user;
  request.session.destroy(() => {
    registerEvent(`Sessão encerrada para ${user}.`);
    response.clearCookie('connect.sid');
    response.redirect('/');
  });
});

// HTTPS local (Lição 03): se os certificados existirem, o laboratório roda em https.
// Necessário porque o cookie SameSite=None + Secure só é emitido em conexões seguras.
const hasTls = fs.existsSync(path.join(certDir, 'key.pem')) && fs.existsSync(path.join(certDir, 'cert.pem'));

if (hasTls) {
  const tlsOptions = {
    key: fs.readFileSync(path.join(certDir, 'key.pem')),
    cert: fs.readFileSync(path.join(certDir, 'cert.pem'))
  };
  https.createServer(tlsOptions, app).listen(port, () => {
    console.log(`Laboratório disponível em https://localhost:${port} (certificado local de teste)`);
  });
} else {
  app.listen(port, () => {
    console.log(`Laboratório disponível em http://localhost:${port}`);
  });
}
