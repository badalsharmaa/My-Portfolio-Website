// mouse animation
const cursorAnimation = document.querySelector(".cursor");
const cursors = document.querySelectorAll(".cursor");
document.addEventListener("click", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  cursorAnimation.style.top = y + "px";
  cursorAnimation.style.left = x + "px";

  cursors.forEach((cursor) => {
    cursor.classList.add("active");

    function removeCursorActive() {
      cursor.classList.remove("active");
    }
    setTimeout(removeCursorActive, 1000);
  });
  let cursorClone = cursorAnimation.cloneNode(true);
  document.querySelector("body").appendChild(cursorClone);
  setTimeout(() => {
    cursorClone.remove();
  }, 1000);
});
//light-dark-mode
let icon = document.getElementById('theme');
icon.onclick = function () {
  document.body.classList.toggle('toggle-theme');
  if (document.body.classList.contains('toggle-theme')) {
    icon.classList.toggle('bx-moon');
  }
  else {
    icon.classList.toggle('bx-sun');
  }
};
//toggle icon nav
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.nav');
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

//nav-active-link
let section = document.querySelectorAll('section');
let lists = document.querySelectorAll('header nav a');
function activeLink(){
  lists.forEach((item) =>
  item.classList.remove('active'));
  this.classList.add('active');
};
lists.forEach((item) =>
item.addEventListener('click',activeLink));

window.onscroll = () =>{
section.forEach(sec =>{
  let top = window.scrollY;
  let offset = sec.offsetTop;
  let height = sec.offsetHeight;
  let id = sec.getAttribute('id');

  if(top >= offset && top < offset + height){
    lists.forEach(sec =>{
       
    })
  }
})
};
//sticky nav-bar 
let header = document.querySelector('header');
header.classList.toggle('sticky',window.scrollY>100);
//remove toggle icon and navbar when click navbar link
menuIcon.classList.remove('bx-x');
menuIcon.classList.remove('active');
//scroll effect
ScrollReveal({ 
  // reset: true, 
  distance:'80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img,.box-container,.portfolio-container,.contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home h1,.about-img', { origin: 'left' });
ScrollReveal().reveal('.home p,.about-content', { origin: 'right' });
//typed js
const typed = new typed('.multiple-text',{
  strings:['Frontend Developer','Software Engineer','Website Designer'],
  typeSpeed:100,
  backSpeed:100,
  backDelay:1000,
  loop:true
}); 