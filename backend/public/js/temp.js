const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

if (matchMedia.matches) document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

const themeSwitchFn = (event) => {
  if (event.matches) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
};

matchMedia.addEventListener('change', themeSwitchFn);

//* Immediately Invoked Function
(async () => {
  const { isUserLoggedIn, userTheme } = await getUserLoginThemeInfo();
  // console.log(`User is logged: ${isUserLoggedIn}. User Theme: ${userTheme}`);

  if (isUserLoggedIn) {
    matchMedia.removeEventListener('change', themeSwitchFn);

    if (userTheme === 'light')
      document.documentElement.classList.remove('dark');
    if (userTheme === 'dark') document.documentElement.classList.add('dark');
    if (userTheme === 'system') {
      if (matchMedia.matches) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      matchMedia.addEventListener('change', themeSwitchFn);
    }
  }
})();

(async () => {
  const isUserLoggedIn = !!document.cookie;

  //* User Not Logged In! or User Theme is SYSTEM
  if (!isUserLoggedIn || userTheme === 'system')
    localStorage.removeItem('theme');

  //* User Theme is Light
  if (isUserLoggedIn && userTheme === 'light')
    localStorage.setItem('theme', 'light');

  //* User Theme is Dark
  if (isUserLoggedIn && userTheme === 'dark')
    localStorage.setItem('theme', 'dark');
})();

document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
);

// localStorage operations

// document.documentElement.className

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
);
