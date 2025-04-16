// JS/theme.js

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.theme-toggle');
    const icon = toggleBtn?.querySelector('i');
  
    // Verifica localStorage al cargar
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  
    // Alternar modo al hacer click
    toggleBtn?.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  
      if (icon) {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
      }
    });
  });
  