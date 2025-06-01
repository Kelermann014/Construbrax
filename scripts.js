// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Login ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('error-message');

            // Simples validação (exemplo)
            if (username === 'admin' && password === '1234') {
                // Simular login bem-sucedido
                localStorage.setItem('usuarioLogado', username);
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Usuário ou senha incorretos.';
                errorMessage.style.display = 'block';
            }
        });
    }

    // --- Dashboard ---
    const usuarioNome = document.getElementById('usuario-nome');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioNome && usuarioLogado) {
        usuarioNome.textContent = `Olá, ${usuarioLogado}`;
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    const btnSair = document.getElementById('btn-sair');
    const btnPerfil = document.getElementById('btn-perfil');

    function logout() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    }

    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (btnSair) btnSair.addEventListener('click', logout);

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            alert('Perfil do usuário ainda não implementado.');
        });
    }

    // Filtrar tabela
    const btnFilter = document.getElementById('btn-filter');
    const selectClient = document.getElementById('select-client');
    const filterDate = document.getElementById('filter-date');
    const tableRows = document.querySelectorAll('#data-table tbody tr');

    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            const clientValue = selectClient.value;
            const dateValue = filterDate.value;

            tableRows.forEach(row => {
                const rowClient = row.getAttribute('data-client');
                const rowDate = row.getAttribute('data-date');

                let show = true;

                if (clientValue && clientValue !== rowClient) {
                    show = false;
                }

                if (dateValue && dateValue !== rowDate) {
                    show = false;
                }

                row.style.display = show ? '' : 'none';
            });
        });
    }

    // Ações da tabela (editar, excluir) - Simples alertas
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            alert('Funcionalidade de editar ainda não implementada.');
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir este registro?')) {
                const row = button.closest('tr');
                if (row) row.remove();
            }
        });
    });
});
