var recordColors = document.getElementById("colorContainer");
var box = document.getElementById("boxColor");
var code = document.getElementById("generatedColor");
var header = document.getElementById("header");

class Color {
  records = [];

  constructor() {
    this.records = this.getRecords();
    this.display();
    changeColor(this.records[this.records.length - 1]);
  }

  generate() {
    const hexValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    var color = '#';
    for (let i = 0; i < 6; i++) {
      var index = Math.floor(Math.random() * hexValue.length);
      color += hexValue[index];
    }
    this.records.push(color);
    rander(color);
    changeColor(color);
  }

  getRecords() {
    if (localStorage.getItem("generatedColors") != null)
      return JSON.parse(localStorage.getItem("generatedColors"))
    else return [];
  }

  reset() {
    this.records.length = 0;
    recordColors.innerHTML = '';
    changeColor("NaN");
  }

  display() {
    this.records.forEach(color => { 
      rander(color);
    });
  }

}

function rander(color) {
  recordColors.innerHTML += `
  <div class="flex justify-start gap-[5%] w-[26%] h-[1.8rem]">
    <div class="w-[1.5rem] rounded-md h-[1.5rem] bg-[${color}] active:shadow-[${color}] 
      active:shadow-lg" id="${color}" onclick="changeColor(this.id)"></div>
    <div>
      <p>${color}</p>
    </div>
  </div>
  `;
}

function changeColor(color) {
  code.innerHTML = `${color}`;
  code.style.color = `${color}`;
  box.style.background = `${color}`;
  header.style.color =  `${color}`;
  recordColors.style.boxShadow = `0 5px 10px ${color}`;
}

const colors = new Color;

const generateColor = () => {
  colors.generate();
  saveToLocalstorage(colors);
}

const resetColor = () => {
  colors.reset();
  saveToLocalstorage(colors);
}

const saveToLocalstorage = (colors) => {
  localStorage.setItem("generatedColors", JSON.stringify(colors.records));
}


