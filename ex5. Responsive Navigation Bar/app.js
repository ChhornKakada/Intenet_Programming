var menu = document.getElementById("menuList")
var more = document.getElementById("list")
var pos = { start: 0, end: 170 }

function render(x) {
  menu.style.display = "block";
  menu.style.height = x + 'px';
  more.style.rotate = -(x / 1.88888) + "deg"
}

function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
}
requestAnimationFrame(animate)

const init = (start, End) => {
  const coords = { x: start }
  const tween = new TWEEN.Tween(coords)
    .to({ x: End }, 200)
    .easing(TWEEN.Easing.Quadratic.out)
    .onUpdate(() => {
      render(coords.x)
      let tmp = pos.start
      pos.start = pos.end
      pos.end = tmp
    })
    .start()
}

more.addEventListener("click", () => {
  init(pos.start, pos.end);
})

window.addEventListener('resize', function () {
  menu.style = null;
  more.style = null;
  pos.start = 0;
  pos.end = 170;
})