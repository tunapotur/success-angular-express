/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3333/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3333/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const getUserLoginThemeInfo = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3333/api/v1/users/user-login-theme-info',
    });

    if (res.data.status === 'success')
      return {
        isUserLoggedIn: res.data.isUserLoggedIn,
        userTheme: res.data.userTheme,
      };
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Checking user logged status error');
  }
};
