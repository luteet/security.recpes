
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

document.addEventListener('keydown', function(event) {
	if (event.shiftKey && event.key === 'C') {
		const theme = (localStorage.getItem('security-recipes-theme')) ? localStorage.getItem('security-recipes-theme') : 'light';
		if(theme == 'light') {
			html.dataset.theme = 'dark';
			localStorage.setItem('security-recipes-theme', 'dark');
		} else {
			html.dataset.theme = 'light';
			localStorage.setItem('security-recipes-theme', 'light');
		}
	}
  });



// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
	top: box.top + window.pageYOffset,
	right: box.right + window.pageXOffset,
	bottom: box.bottom + window.pageYOffset,
	left: box.left + window.pageXOffset
	};
}

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <change-theme> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const changeThemeBtn = $(".header__theme--btn")
	if(changeThemeBtn) {
	
		const theme = (localStorage.getItem('security-recipes-theme')) ? localStorage.getItem('security-recipes-theme') : 'light';
		if(theme == 'light') {
			html.dataset.theme = 'dark';
			localStorage.setItem('security-recipes-theme', 'dark');
			if(document.querySelector('.code-snippet-light')) document.querySelector('.code-snippet-light').remove();
		} else {
			html.dataset.theme = 'light';
			localStorage.setItem('security-recipes-theme', 'light');
			body.insertAdjacentHTML('beforeend', `<style class="code-snippet-light">/* https://github.com/lonekorean/gist-syntax-themes */@import url('https://cdn.rawgit.com/lonekorean/gist-syntax-themes/d49b91b3/stylesheets/solarized-light.css');@import url('https://fonts.googleapis.com/css?family=Open+Sans');body .gist .highlight {  background: #101424;}body .gist .gist-file {  border-color: #ddd}body .gist .gist-data {  border-color: #ddd;	border-width: 1px;}body .gist .gist-meta {  color: #666;  background: #f7f7f7; }body .gist .gist-meta a {  color: #ffffff}body .gist .gist-data .pl-s .pl-s1 {  color: #a5c261}body .gist .blob-num:hover{color:#1F2328}</style>`)
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </change-theme> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-nav-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavButton = $(".header__nav--list .drop-down > button")
	if(headerNavButton) {

		if(!headerNavButton.classList.contains('active')) {
			document.querySelectorAll('.header__nav--list .drop-down > button.active').forEach(element => {
				element.classList.remove('active')
			})	
		}

		headerNavButton.classList.toggle('active');

		
	
	} else if(!$(".header__nav--list .drop-down")) {
		document.querySelectorAll('.header__nav--list .drop-down > button.active').forEach(element => {
			element.classList.remove('active')
		})
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-nav-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let toUp = $('.to-up');
	if(toUp) {
		event.preventDefault();
		body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	let btnToScroll = $('.btn-to-scroll');
	if(btnToScroll) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(btnToScroll.getAttribute('href'))
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			window.scrollTo({
				left: 0,
				top: getCoords(section).top,
				behavior: 'smooth',
			})
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;
const headerWrapper = document.querySelector('.header-wrapper');

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(headerWrapper) headerWrapper.style.setProperty('--height', header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	

}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.featured__slider')) {

	const featuredSlider = new Splide('.featured__slider', {
		gap: 15,
		pagination: false,
	});

	featuredSlider.mount();

}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		AOS.init({
			disable: "mobile",
			once: true,
		});
	},500)
})

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=


if(localStorage.getItem('security-recipes-theme') == 'light' || !localStorage.getItem('security-recipes-theme')) {
	body.insertAdjacentHTML('beforeend', `<style class="code-snippet-light">/* https://github.com/lonekorean/gist-syntax-themes */@import url('https://cdn.rawgit.com/lonekorean/gist-syntax-themes/d49b91b3/stylesheets/solarized-light.css');@import url('https://fonts.googleapis.com/css?family=Open+Sans');body .gist .highlight {  background: #101424;}body .gist .gist-file {  border-color: #ddd}body .gist .gist-data {  border-color: #ddd;	border-width: 1px;}body .gist .gist-meta {  color: #666;  background: #f7f7f7; }body .gist .gist-meta a {  color: #ffffff}body .gist .gist-data .pl-s .pl-s1 {  color: #a5c261}body .gist .blob-num:hover{color:#1F2328}</style>`)
}

new Sticky('.sticky');

