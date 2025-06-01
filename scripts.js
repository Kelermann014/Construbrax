// Botão de logoff
document.getElementById("logoff-button").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Submenus (abrir/fechar)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const parentLi = toggle.parentElement;
    const dropdownMenu = parentLi.querySelector('.dropdown-menu');
    const isActive = parentLi.classList.toggle("active");

    dropdownMenu.style.maxHeight = isActive ? dropdownMenu.scrollHeight + "px" : "0";
    const chevron = toggle.querySelector('.fa-chevron-down');
    if (chevron) {
      chevron.style.transform = isActive ? "rotate(180deg)" : "rotate(0deg)";
    }
  });
});

// Botão hamburguer para mostrar/esconder o menu lateral
document.getElementById("menu-toggle").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");
});
