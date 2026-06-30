(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    }
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  } catch (e) {
    // Ignore storage failures; page still renders in light mode.
  }
})();
