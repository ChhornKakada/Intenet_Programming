const activity = document.getElementById("activity");
const activityContainer = document.getElementById("activityContainer");

const activityName = document.getElementById("activityName");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const loadingContainer = document.getElementById("loadingContainer");
const loadingStop = document.getElementById("loadingStop");



function getMeAnActivity() {
  loadingContainer.style.height = "100%";
  loadingText.hidden = false;
  activity.hidden = true;

  fetch("https://www.boredapi.com/api/activity")  
  .then((res) => {
    res.json().then((data) => {
      activityName.innerHTML = `${data["activity"]}`;
      type.innerHTML = data["type"];
      participants.innerHTML = data["participants"];
      price.innerHTML = data["price"];
      link.innerText = data["link"];
      console.log(data);
      
      activity.hidden = false;
      loadingContainer.style.height = "0px";
      loadingText.hidden = true;
    })
  })
  .catch((err) => {
    console.log(err);
  })
}