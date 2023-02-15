const htmlRecordTask = document.getElementById("recordData");

let keys = Object.keys(localStorage);
for (let key of keys) {
  var toDo = JSON.parse(`${localStorage.getItem(key)}`);
  displayInHtml(key, toDo);
}

// record a task and store it in localstorage
function recordDataToLocalStorage() {
  // event.preventDefault();
  var toDo = {};
  toDo["title"] = document.getElementById("taskTitleInput").value;
  toDo["assignee"] = document.getElementById("assignee").value;
  toDo["deadline"] = document.getElementById("deadline").value;

  var today = new Date();
  const value = JSON.stringify(toDo);
  var key = today.getTime();
  localStorage.setItem(`${key}`, value);
  displayInHtml(key, toDo);

  clearForm();
}

// display the task in html
function displayInHtml(key, toDo) {
  htmlRecordTask.innerHTML += `
      <div class="flex justify-evenly w-full mb-[1%] rounded-lg items-center bg-white py-[0.5%] text-[#192A52]"
        id="data${key}">
        <div class="w-[32%]">
          <p>&nbsp;${toDo.title}</p>
        </div>
        <div class="w-[24%]">
          <p>&nbsp;${toDo.assignee}</p>
        </div>
        <div class="w-[16%]">
          <p>&nbsp;${toDo.deadline}</p>
        </div>
        <div class="w-[15%] text-end text-red-500">
          <button id="${key}" onclick="deleteData(this.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
      `;
}

// delete data(task)
function deleteData(key) {
  if (confirm('Are you sure you want to delete this task?')) {
    localStorage.removeItem(`${key}`);
    document.getElementById(`data${key}`).remove();
  }
}

// clear from 
function clearForm() {
  document.getElementById("taskTitleInput").value = '';
  document.getElementById("assignee").value = '';
  document.getElementById("deadline").value = '';
}

