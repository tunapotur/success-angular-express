export default darkMode = () => {
  const pageDatasetTheme = document.documentElement.dataset.theme;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const classList = document.documentElement.classList;

  if (pageDatasetTheme === 'system' || pageDatasetTheme === '')
    systemTheme ? classList.add('dark') : classList.remove('dark');

  if (pageDatasetTheme === 'light') classList.remove('dark');

  if (pageDatasetTheme === 'dark') classList.add('dark');
};
