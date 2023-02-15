var displayNumber = document.getElementById("diplayNumber");

class Counter {
  number = 0;
  constructor(number) { this.number = number; }
  decrease() { this.number -= 1; }
  increase() { this.number += 1; }
  reset() { this.number = 0; }
  display() { displayNumber.innerHTML = `${this.number}`; }
}

let numberFromLocalstorage = parseInt(localStorage.getItem("counter")) || null;
if (numberFromLocalstorage == null)  numberFromLocalstorage = 0; 
var counter = new Counter(numberFromLocalstorage);

counter.display();

// decrease number
const decreaseNumber = () => {
  counter.decrease();
  saveToLocalstorage(counter);
  counter.display();
}

// increase number
const increaseNumber = () => {
  counter.increase();
  saveToLocalstorage(counter);
  counter.display();
}

// reset number
const resetNumber = () => {
  counter.reset();
  saveToLocalstorage(counter);
  counter.display();
}

// save value counter to localstorage
const saveToLocalstorage = (counter) => {
  localStorage.setItem("counter", `${counter.number}`);
}

