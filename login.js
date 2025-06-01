document.addEventListener('DOMContentLoaded', () => {
  inicializarLogin();
  inicializarLogoff();
  inicializarSubmenus();
  inicializarMenuHamburguer();
});

// === LOGIN ===
function inicializarLogin() {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');

  if (usernameInput) {
    usernameInput.addEventListener('input', () => {
      usernameInput.value = usernameInput.value.toUpperCase();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
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
}

// === LOGOFF ===
function inicializarLogoff() {
  const logoffBtn = document.getElementById("logoff-button");
  if (logoffBtn) {
    logoffBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.href = "index.html";
    });
  }
}

// === SUBMENUS ===
function inicializarSubmenus() {
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = toggle.parentElement;
      const dropdownMenu = parentLi.querySelector('.dropdown-menu');
      const isActive = parentLi.classList.toggle("active");

      if (dropdownMenu) {
        dropdownMenu.style.maxHeight = isActive ? dropdownMenu.scrollHeight + "px" : "0";
      }

      const chevron = toggle.querySelector('.fa-chevron-down');
      if (chevron) {
        chevron.style.transform = isActive ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });
}

// === MENU LATERAL ===
function inicializarMenuHamburguer() {
  const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
}
