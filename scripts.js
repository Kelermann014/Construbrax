document.getElementById("logoff-button").addEventListener("click", function() {
    window.location.href = "index.html";
});

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
