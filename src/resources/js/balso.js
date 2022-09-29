'use strict';

/* iphone scroll bug */
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// modal
const modalBtnClose = document.querySelectorAll('.modal__close');

modalBtnClose.forEach(item => {
	item.addEventListener('click', () => {
		item.closest('.modal').style.display = 'none';
		document.querySelector('.scrolllock').classList.remove('scrolllock');
	});
});

// setTimeout(() => {
// 	document.getElementsByClassName('modal')[0].style.display = 'block';
// }, 2000);

import {Swiper} from './module/swiper-bundle.esm.browser.min.js';