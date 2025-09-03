document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            // Simulação de chamada de API.
            // No futuro, isso será substituído por uma chamada fetch real ao seu back-end.
            if (username && password) {
                 // Sucesso no login (simulado)
                 window.location.href = 'gestao-emprestimos.html';
            } else {
                 // Falha no login (simulado)
                 alert('Usuário ou senha incorretos.');
            }
        });
    }
});