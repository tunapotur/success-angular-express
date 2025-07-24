export default lightDarkMode = () => {
  const className = document.documentElement.className;

  let themeType;
  if (className === 'system' || className === '') themeType = 'system';
  if (className === 'light') themeType = 'light';
  if (className === 'dark') themeType = 'dark';

  if (themeType === 'system')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList = 'dark';
    else document.documentElement.classList = '';

  if (themeType === 'light') document.documentElement.classList = '';

  if (themeType === 'dark') document.documentElement.classList = 'dark';
};
