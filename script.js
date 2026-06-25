document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle dropdowns inside mobile menu
    document.querySelectorAll('#mobile-menu .dropdown-trigger').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            const isOpen = parent.classList.toggle('open');
            // set accessibility attribute
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // Handle any button that should open/close the mobile nav
    function toggleMobileMenu(force) {
        if (!mobileMenu) return;
        const willOpen = typeof force === 'boolean' ? force : mobileMenu.classList.contains('hidden');
        if (willOpen) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            // close any open dropdowns inside mobile menu
            mobileMenu.querySelectorAll('.has-dropdown.open').forEach(function (el) { el.classList.remove('open'); });
        }
    }

    // Attach to elements that may toggle the menu (id or class)
    const menuToggle = document.getElementById('menu-toggle');
    const mobileButtons = Array.from(document.querySelectorAll('.mobile-menu-btn'));

    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    mobileButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            // if button has its own inline onclick, let it run too; still ensure scroll lock
            e.preventDefault();
            toggleMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;
        const inside = e.target.closest && (e.target.closest('#mobile-menu') || e.target.closest('.mobile-menu-btn') || e.target.closest('#menu-toggle'));
        if (!inside) toggleMobileMenu(false);
    });

    // Ensure menu is visible state consistent on resize (remove scroll lock)
    window.addEventListener('resize', function () {
        if (!mobileMenu) return;
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = '';
        } else if (!mobileMenu.classList.contains('hidden')) {
            // mobile viewport and menu open: keep it as-is
        } else {
            // ensure hidden on small screens by default
            mobileMenu.classList.add('hidden');
        }
    });
});
