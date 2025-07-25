export default darkMode = () => {
  const pageTheme = document.documentElement.dataset.theme;
  const systemDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const classList = document.documentElement.classList;

  if (pageTheme === 'system' || pageTheme === '')
    if (systemDarkTheme) classList.add('dark');
    else classList.remove('dark');

  if (pageTheme === 'light') classList.remove('dark');

  if (pageTheme === 'dark') classList.add('dark');
};
