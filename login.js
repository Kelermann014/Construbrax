document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');

  // Converte entrada para maiúsculas
  if (usernameInput) {
    usernameInput.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
  }

  // Lógica de login
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMessage = document.getElementById('error-message');

      if (username === "DIOGO.MENA" && password === "123") {
        localStorage.setItem("usuarioLogado", username);
        window.location.href = "TelaInicial.html";
      } else {
        errorMessage.textContent = "Usuário ou senha incorretos.";
      }
    });
  }
});
