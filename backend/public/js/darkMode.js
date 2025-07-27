export default darkMode = () => {
  const pageTheme = document.documentElement.dataset.theme;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const classList = document.documentElement.classList;

  if (pageTheme === 'system')
    systemTheme ? classList.add('dark') : classList.remove('dark');

  if (pageTheme === 'light') classList.remove('dark');

  if (pageTheme === 'dark') classList.add('dark');
};
