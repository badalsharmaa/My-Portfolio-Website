/*===========================================Preloader=========================================*/

var loader = document.getElementById("preloader");
var delayInMilliseconds = 5; //1 second


window.addEventListener("load",function(){
  setTimeout(function() {
    loader.style.display = "none";
  }, delayInMilliseconds);
  
})

/*============================================toggle icon navbar===============================*/
const themeButton = document.getElementById('theme')
const lightTheme = 'lightTheme'
const iconTheme = 'bx bx-moon'
// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-sun' : 'bx bx-moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*============================================toggle icon navbar===============================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.nav');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/*=============================================nav active link================================*/

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navlinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });   
    };
  });
};

/*=================================sticky nav bar==========================================================*/

let header = document.querySelector('header');

header.classList.toggle('sticky',window.scrollY > 100);

/*=========================remove toggle icon and navbar when click navbar link=============================*/

menuIcon.classList.remove('bx-x');
menuIcon.classList.remove('active');

/*==================================scroll effect============================================================*/

ScrollReveal({ 
  reset: true, 
  distance:'69px',
  duration: 1500,
  delay: 150
});

ScrollReveal().reveal('.home-content,.heading,.skills,.portfolio-container #pbtop, .container', { origin: 'top' });
ScrollReveal().reveal('.home-img,.box-container #box2,.portfolio-container #pbbuttom,.contact form,.skills .container .bar,.contact form #formBody', { origin: 'bottom' });
ScrollReveal().reveal('.home h1,.box-container #box1,.portfolio-container #pbleft,.about-img, .about-content h3,.education h4,.education .box-container .box .content h3,.education .box-container .boxleft,.contact form #input-boxleft  ', { origin: 'left' });
ScrollReveal().reveal('.home p,.box-container #box3,.portfolio-container #pbright,.about-content p,.education .box-container .box .content p,.education .box-container .boxright,.contact form #input-boxright', { origin: 'right' });

/*===============================================typed js=================================================*/

const typed = new Typed('.multiple-text', {
  strings:['Frontend Developer','Software Engineer','UI UX Developer','Graphic designer'],
  typeSpeed:100,
  backSpeed:100,
  backDelay:1000,
  loop:true
}); 

/*===============================================form =================================================*/

const form = document.querySelector("#form")
const submitButton = document.querySelector("#submitbtn")
const scriptURL = 'https://script.google.com/macros/s/AKfycbyryPCvtt1WpGIsC8E7ZboLfyHo317H-4eBS3lHFbZNaALgm9XFrrIU2uNEW2kTYd8Jiw/exec'

form.addEventListener('submit', e => {
  submitButton.disabled = true
  e.preventDefault()
  let requestBody = new FormData(form)
  fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
       alert('Success!', response)
       submitButton.disabled = false
      })
    .catch(error => {
    alert('Error!', error.message)
      submitButton.disabled = false

    }
    )
})

