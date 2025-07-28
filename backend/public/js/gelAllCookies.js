// https://stackoverflow.com/questions/252665/i-need-to-get-all-the-cookies-from-the-browser
export default getAllCookies = () =>
  document.cookie
    .split(';')
    .reduce(
      (ac, str) =>
        Object.assign(ac, { [str.split('=')[0].trim()]: str.split('=')[1] }),
      {},
    );
