/* eslint-disable */
import '@babel/polyfill';
import { login, logout, getUserLoginThemeInfo } from './login';
import { updateSettings } from './updateSettings';
// import { lightMode, darkMode, systemMode } from './lightDarkMode';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.getElementById('logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const backToPreviousPageButton = document.getElementById('go-back');

// TODO Local host kullanarak göz kırpma sorunu çözülecek.
//*****************************************************************************/
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
//*****************************************************************************/

if (backToPreviousPageButton)
  backToPreviousPageButton.addEventListener('click', () => {
    history.back();
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
