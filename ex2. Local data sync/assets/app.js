let scrollerEle = document.getElementById("scroller");

let pageNum = 0;
let isDataLoading = false;

var passengers = localStorage.getItem("passengers") != null ? JSON.parse(localStorage.getItem("passengers")) : [];


// input as array
function displayAPage(dataAPage) {
  dataAPage.forEach(element => {
    scrollerEle.innerHTML += `
      <div class="w-full border-2 rounded-lg px-5 py-2 mb-2 bg-[#F4F4F4]">
        <div class="font-bold">✈️ : ${element.airline[0].name} - ${element.airline[0].country}</div>
        <div>😊 : ${element.name}</div>
      </div>
    `
  });
}

function fetchDataFromLocal(pageNumber) {
  displayAPage(passengers[pageNumber]);
}

function fetchData(pageNumber) {
  scrollerEle.innerHTML += ` <div class="font-bold text-[1.5rem] px-2">${pageNumber + 1}</div>`;
  pageNum >= passengers.length ? fetchAPI(pageNumber) : fetchDataFromLocal(pageNumber);
  pageNum++;
}

function fetchAPI(pageNumber) {
  isDataLoading = true;
  fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=15`)
    .then(async (res) => {
      let dataInfors = await res.json();
      passengers.push(dataInfors.data);
      saveToLocalstorage(passengers);
      displayAPage(dataInfors.data);
      isDataLoading = false;
    })
    .catch((err) => {
      alert(err);
    });
}

const saveToLocalstorage = (data) => {
  localStorage.setItem("passengers", JSON.stringify(data));
}


fetchData(pageNum);

scrollerEle.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = scrollerEle;
  if ((clientHeight + scrollTop) >= (scrollHeight * 0.95)) {
    if (!isDataLoading) {
      fetchData(pageNum);
    }
  }
});






