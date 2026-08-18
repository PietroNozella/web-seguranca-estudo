const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;
const events = [];

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

app.listen(port, () => {
  console.log(`Laboratório disponível em http://localhost:${port}`);
});
