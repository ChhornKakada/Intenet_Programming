
document.querySelector('.img').src = `${window.location.origin}/asset/?assetPath=img/Clock.png`
const dateInput = document.querySelector('.data_input')

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hour = String(now.getHours()).padStart(2, '0');
const minute = String(now.getMinutes()).padStart(2, '0');

dateInput.value = `${year}-${month}-${day}T${hour}:${minute}`;
const getdata = () => {
  fetch(`${window.location.origin}/getPastTime`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ date: dateInput.value })
  })
    .then(res => res.json())
    .then(data => {
      document.querySelector('.Output').innerText = data.msg
    })
}

dateInput.addEventListener('change', () => {
  // alert(dateInput.value)
  getdata()
})

window.addEventListener('load', () => {
  getdata()
})