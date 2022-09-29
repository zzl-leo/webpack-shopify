/*
 * @Date: 2022-09-29 13:47:55
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 14:15:14
 * @FilePath: \webpack-shopify\tailwind.config.js
 */
const typography = require('@tailwindcss/typography');

module.exports = {
  mode: 'jit',
  purge: [
    './theme/**/*.liquid',
    './themes/**/*.liquid',
    './src/**/*.svelte',
  ],
  corePlugins: {},
  plugins: [
    typography(),
  ],
};
