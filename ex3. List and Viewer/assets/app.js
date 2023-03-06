let scrollerEle = document.getElementById("scroller");
let view = document.getElementById("view");

let pageNum = 1;
let isDataLoading = false;

var favoriteThings = localStorage.getItem("favoriteThings") != null ? JSON.parse(localStorage.getItem("favoriteThings")) : [];


// input as array
function displayAPage(dataAPage) {
  dataAPage.forEach(element => {
    scrollerEle.innerHTML += `
    <button class="w-[97%] flex gap-2 items-center border-2 p-2 rounded-lg bg-[#F4F4F4] mr-2 mb-2 something"
      onclick="viewDetail(${element.id})">
      <p class="text-[2rem]">🍻</p>
      <div class="shorten text-left">
        <h3 class="font-bold">${element.name}</h3>
        <p class="shorten">${element.description}</p>
      </div>
    </button>
    `
  });
}

function viewDetail(id) {
  for (let pNum of favoriteThings) {
    for (let ele of pNum) {
      if (ele.id == id) {
        view.innerHTML = `
          <center>
            <img src="${ele.image_url}" class="my-6" alt="">
            <h3 class="font-bold">${ele.name}</h3>
            <p class="mb-4">${ele.first_brewed}</p>
            <p class="font-[500] mb-4">${ele.description}</p>
            <hr>
            <p class="font-medium mt-4">Contributor</p>
            <p class="mb-4 font-medium text-[1.2rem]">Sam Mason</p>
          </center>
        `
        break;
      }
    }
  }
  
}

function fetchDataFromLocal(pageNumber) {
  displayAPage(favoriteThings[pageNumber]);
}

function fetchData(pageNumber) {
  scrollerEle.innerHTML += ` <div class="font-bold text-[1.5rem] px-2">${pageNumber}</div>`;
  pageNum > favoriteThings.length ? fetchAPI(pageNumber) : fetchDataFromLocal(pageNumber-1);
  pageNum++;
}

function fetchAPI(pageNumber) {
  isDataLoading = true;
  fetch(`https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=15`)
    .then(async (res) => {
      let datas = await res.json();
      favoriteThings.push(datas);
      saveToLocalstorage(favoriteThings);
      displayAPage(datas);
      isDataLoading = false;
    })
    .catch((err) => {
      alert(err);
    });
}

const saveToLocalstorage = (data) => {
  localStorage.setItem("favoriteThings", JSON.stringify(data));
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






