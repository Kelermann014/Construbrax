document.addEventListener('DOMContentLoaded', function() {
    // Simulação de login com usuário fictício
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.toUpperCase();
            const password = document.getElementById('password').value;

            // Simulação de autenticação
            if (username === 'KELERMANN' && password === '1234') {
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'TelaInicial.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // Exibir nome do usuário nas páginas internas
    const userNameElements = document.querySelectorAll('#user-name, #user-name-welcome');
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        userNameElements.forEach(element => {
            element.textContent = loggedInUser;
        });
    }

    // Logout
    const logoutButton = document.getElementById('logoff-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});