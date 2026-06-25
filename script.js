document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#mobile-menu .dropdown-trigger').forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.parentElement.classList.toggle('open');
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
