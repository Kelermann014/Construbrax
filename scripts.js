document.addEventListener('DOMContentLoaded', function() {
    const logoffButton = document.getElementById("logoff-button");
    if (logoffButton) {
        logoffButton.addEventListener("click", function() {
            window.location.href = "login.html";
        });
    }

    const homeButton = document.getElementById("home-button");
    if (homeButton) {
        homeButton.addEventListener("click", function() {
            window.location.href = "dashboard.html";
        });
    }

    const menuLinks = document.querySelectorAll('.sidebar a');

    menuLinks.forEach(link => {
        if (link.href.includes("gestao-emprestimos.html")) {
            return;
        }
        
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const modal = document.getElementById('modalEmDesenvolvimento');
            if (modal) modal.style.display = 'block';
        });
    });

    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => fecharModal(btn.dataset.modalId));
    });
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            fecharModal(event.target.id);
        }
    });

    function fecharModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
        }
    }
});