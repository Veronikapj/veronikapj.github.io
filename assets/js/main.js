document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // Get current theme
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Apply theme changes
      document.documentElement.setAttribute('data-theme', newTheme);
      document.querySelector('meta[name="color-scheme"]').setAttribute('content', newTheme);
      
      // Save user choice in cache
      localStorage.setItem('theme', newTheme);
    });
  }

  // Optional: Listen to OS theme changes if the user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      document.querySelector('meta[name="color-scheme"]').setAttribute('content', newTheme);
    }
  });
});
