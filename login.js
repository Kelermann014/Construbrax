document.addEventListener('DOMContentLoaded', function() {
    // Fetch para obter o nome do usuário e exibi-lo na página
    fetch('/api/username')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                document.querySelector('.user-info strong').textContent = data.username;
            } else {
                console.error('Erro: Nome do usuário não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao obter o nome do usuário:', error);
        });


    // Conversão de texto para maiúsculas no campo de nome de usuário
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }

    // Troca de fundo na tela de login
    const backgrounds = [
        'construction-background.jpg'
    ];

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

    // Manipulação do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || 'Usuário ou senha incorretos.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
            });
        });
    }

  // Função para carregar conteúdo
    function loadPage(page) {
        fetch(`/views/${page}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('main-content').innerHTML = html;
            })
            .catch(error => {
                console.error('Erro ao carregar a página:', error);
                document.getElementById('main-content').innerHTML = '<p>Erro ao carregar a página.</p>';
            });
    }

    // Eventos de clique para navegação
    document.querySelectorAll('.sidebar a[data-page]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });


    // Logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();

            fetch('/logout', { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = 'index.html'; // Redireciona para a página de login após o logout
                    } else {
                        alert('Erro ao tentar fazer logout. Tente novamente.');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Ocorreu um erro ao tentar fazer logout. Tente novamente.');
                });
        });
    }
});


// Função para abrir o modal
function openModal() {
    document.getElementById('client-modal').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('client-modal').style.display = 'none';
}



