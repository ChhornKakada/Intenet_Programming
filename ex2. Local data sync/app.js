const username = document.getElementById("username");
const loading = document.getElementById("loading");
const Data = document.getElementById("data");

var guessing = {
  name: document.getElementById("name"),
  gender: document.getElementById("gender"),
  percentage: document.getElementById("percentage")
}


function startGuessing() {
  var url = "https://api.genderize.io?name=" + username.value;
  loading.hidden = false;
  Data.hidden = true;

  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        guessing.name.innerHTML = data["name"];
        if (data["gender"] == null && data["probability"] == 0) {
          guessing.gender.innerHTML = "Sorry, I have no idea for this name.";
          guessing.gender.style.fontSize = "1.5rem";
          guessing.percentage.innerHTML = "😥";
          guessing.percentage.style.fontSize = "3.8rem";
        } 
        else {
          guessing.gender.innerHTML = data["gender"].charAt(0).toUpperCase() + data["gender"].slice(1);
          guessing.percentage.innerHTML = (data["probability"] * 100) + "%";
          guessing.gender.style.fontSize = "";
          guessing.percentage.style.fontSize = "";
        }

        loading.hidden = true;
        Data.hidden = false;
        username.value = "";
      })
    })
    .catch((err) => {
      alert("error");
      console.log(err);
    })
}

// when the user press enter to submit
username.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submitBtn").click();
  }
})