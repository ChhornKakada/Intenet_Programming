const more = document.getElementById("list");
const sideBar = document.getElementById("sideBar");
const close = document.getElementById("close");
let isOpen = false;

more.addEventListener("click", () => {
  sideBar.style.display = "flex";
})

close.addEventListener("click", () => {
  sideBar.style.display = 'none';
})

