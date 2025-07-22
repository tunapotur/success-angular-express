/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
// import { lightMode, darkMode, systemMode } from './lightDarkMode';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.getElementById('logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const backToPreviousPageButton = document.getElementById('go-back');
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const systemThemeBtn = document.getElementById('system-theme');

/*
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    // const newColorScheme = event.matches ? "dark" : "light";
    if (event.matches) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });
*/
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
/*document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
);*/
// Whenever the user explicitly chooses light mode
// localStorage.theme = 'light';
// Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark';
// Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem("theme");

// DELEGATION

if (lightThemeBtn)
  lightThemeBtn.addEventListener('click', () => {
    document.documentElement.classList.remove('dark');
  });

if (darkThemeBtn)
  darkThemeBtn.addEventListener('click', () => {
    document.documentElement.classList.add('dark');
  });

if (systemThemeBtn)
  systemThemeBtn.addEventListener('click', () => {
    console.log('System Theme');
  });

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
