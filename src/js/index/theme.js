/*
 * @Date: 2022-09-15 18:51:29
 * @LastEditors: Leo
 * @LastEditTime: 2022-11-17 13:47:06
 * @FilePath: \test2\src\js\index\theme.js
 */
import '../../css/theme.css';
import '../utility/public-path';
import '../utility/newsletter-subscribe';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes';
import openCart from '../utility/open-cart';

import vueTest from '../apps/vue-test';
import {testComp} from '../apps/vue-t2'

document.querySelector('html').classList.add('js');

// Handle cart-slider
const cartLinks = document.querySelectorAll('.open-cart');
if (cartLinks) {
  cartLinks.forEach((cartLink) => {
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      const cartHref = e.currentTarget.getAttribute('href');
      openCart().then((res) => {
        if (res === false) {
          window.location.href = cartHref;
        }
      });
    });
  });
}

setTimeout(() => {
  testComp({
    parentNodes: document.querySelector(".site-header"),
    text: "z-test"
  })

}, 200);