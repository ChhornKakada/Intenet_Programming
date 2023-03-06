let scrollerEle = document.getElementById("scroller");

let pageNum = 0;
let isDataLoading = false;
var toShow = "";

function fetchAPI(pageNumber) {
  isDataLoading = true;
  fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=15`)
    .then(async (res) => {
      let dataInfors = await res.json();
      toShow += `
          <div class="font-bold text-[1.5rem] px-2">${pageNumber + 1}</div>
      `;

      dataInfors.data.forEach(element => {
        toShow += `
          <div class="w-full border-2 rounded-lg px-5 py-2 mb-2 bg-[#F4F4F4]">
            <div class="font-bold">✈️ : ${element.airline[0].name} - ${element.airline[0].country}</div>
            <div>😊 : ${element.name}</div>
          </div>
        `
      });
      scrollerEle.innerHTML = toShow;
      pageNum++;
      isDataLoading = false;
    })
    .then(() => {
      scrollerEle.addEventListener("scroll", () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollerEle;
        if ((clientHeight + scrollTop) >= (scrollHeight * 0.95)) {
          if (!isDataLoading) {
            fetchAPI(pageNum);
          }
        }
      });
    })
    .catch((err) => {
      alert(err);
    });
}

fetchAPI(pageNum);






