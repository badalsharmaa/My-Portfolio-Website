//mouse animation
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
var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    icon.src = "Asset/moon.png";
  } else {
    icon.src = "Asset/sun.png";
  }
};
//nav-active-link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header navbar a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};
