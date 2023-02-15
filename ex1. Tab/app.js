let history = document.getElementById("historyBtn");
let vision = document.getElementById("visionBtn");
let goals = document.getElementById("goalsBtn");
let divText = document.getElementById("divText");


function moveToVision() {
  vision.style.background = "#ffffff";
  history.style.background = "#DBE2EC";
  goals.style.background = "#DBE2EC";
  divText.innerHTML = `<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p> <br>
      <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>`;
}

function moveToHistory() {
  history.style.background = "#ffffff";
  vision.style.background = "#DBE2EC";
  goals.style.background = "#DBE2EC";
  divText.innerHTML = `<p id="text">It is a long established fact that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content here', making it look like
        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
        default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like).</p>`;
}

function moveToGoals() {
  goals.style.background = "#ffffff";
  history.style.background = "#DBE2EC";
  vision.style.background = "#DBE2EC";
  divText.innerHTML = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>`;
}