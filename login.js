document.addEventListener('DOMContentLoaded', function () {
  // Tornar o nome do usuário maiúsculo automaticamente
  const usernameInput = document.getElementById('username');
  if (usernameInput) {
    usernameInput.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
  }

  // Tela de login: processa o login manualmente
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === 'DIOGO.MENA' && password === '123') {
        localStorage.setItem('usuarioLogado', username);
        window.location.href = 'TelaInicial.html';
      } else {
        document.getElementById('error-message').textContent = 'Usuário ou senha incorretos.';
      }
    });
  }

  // Tela Inicial: exibe o nome do usuário no topo
  const nomeUsuario = localStorage.getItem('usuarioLogado');
  if (nomeUsuario && document.getElementById('user-name')) {
    document.getElementById('user-name').textContent = nomeUsuario;
  }

  // Logoff
  const logoffButton = document.getElementById('logoff-button');
  if (logoffButton) {
    logoffButton.addEventListener('click', function () {
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'index.html';
    });
  }

  // Troca de fundo na tela de login
  const backgrounds = ['construction-background.jpg'];
  let currentBackgroundIndex = 0;
  const loginBody = document.querySelector('.login-body');

  function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    loginBody.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
  }

  if (loginBody) {
    loginBody.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
    setTimeout(() => {
      changeBackground();
      setInterval(changeBackground, 15000);
    }, 5000);
  }
});
