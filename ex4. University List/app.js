const unis = document.getElementById("unis");
const uniList = document.getElementById("uniList");
const loading = document.getElementById("loading");


function displayAUni(uni) {
  uniList.innerHTML += `
  <div class="items-center border-2 w-[280px] text-[1.1rem] rounded-xl bg-[#F4F4F4] py-2 text-center px-3">
    <p class="font-bold text-[1.2rem]">${uni.name}</p>
    <p class="mb-3">(${uni.country} - ${uni.alpha_two_code})</p>
    <a href="${uni.web_pages}" class="" target="_blank">
      <span class="linkUni flex gap-2 text-blue-500 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path
            d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
          <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z"
            clip-rule="evenodd" />
        </svg>
        <p>${uni.web_pages}</p>
      </span>
    </a>
  </div>
  `
}

function displayUnivs() {
  uniList.innerHTML = "";
  loading.hidden = false;
  uniList.hidden = true;
  fetch(`http://universities.hipolabs.com/search?country=${unis.value}`)
    .then(async (res) => {
      const data = await res.json();
      for (let uni of data) {
        displayAUni(uni);
        loading.hidden = true;
        uniList.hidden = false;
      }
    }).catch((err) => {
      alert("error");
      console.log(err);
    })
}

displayUnivs();

