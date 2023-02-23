const results = document.getElementById("results");
const username = document.getElementById("username");
const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const output = document.getElementById("output");

function toPercentage(num) {
  return (num * 100).toFixed(2);
}

// when there are data.country.length > 0
function guessed(data) {
  for (let i = 0; i < data.country.length; i++) {
    results.innerHTML += `
    <div class="flex w-[330px] justify-between h-10 border-2 rounded-xl items-center px-4 bg-[#F4F4F4] mt-1">
      <p>${data.country[i].country_id}</p>
      <p class="text-[#FF5C00]">${toPercentage(data.country[i].probability)}%</p>
    </div>
    `
  }
}

// when there are data.country.length = 0
function cannotGuess() {
  results.innerHTML = `
  <div class="w-[330px] border-2 rounded-xl py-4 bg-[#F4F4F4] mt-4">
    <p class="text-[#FF5C00] text-[1.5rem]">Sorry, I have no idea.</p>
    <p class="text-[4rem]">😥</p>
  </div>
  `
}


function startGuessing() {
  results.innerHTML = "";
  loading.hidden = false;
  output.hidden = true;
  fetch(`https://api.nationalize.io?name=${username.value}`)
    .then((res) => {
      res.json().then((data) => {
        nameInput.innerHTML = username.value;
        data.country.length == 0 ? cannotGuess() : guessed(data);
        username.value = "";
        loading.hidden = true;
        output.hidden = false;
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

// when the user enter to input the name instead of click the button
username.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
  }
})