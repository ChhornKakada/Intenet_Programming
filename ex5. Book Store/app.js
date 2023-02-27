const bookStore = document.getElementById("bookStore");
const newBook = {
  title: document.getElementById("name"),
  category: document.getElementById("category"),
  price: document.getElementById("price")
}

var localBooks = localStorage.getItem("books") != null ? JSON.parse(localStorage.getItem("books")) : [];

// random color
function randomColor() {
  const hexValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  var color = '';
  for (let i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * hexValue.length);
    color += hexValue[index];
  }
  return color;
}

// for a book that create and from localStorage
function showABookLocal(book) {
  const params = `?title=${book.title}&category=${book.category}&price=${book.price}&img=${book.urlImage}`;
  bookStore.innerHTML += `
  <div class="w-[200px] border-2 rounded-lg p-[25px]">
    <img src="${book.urlImage}" alt="">
    <h3 class="font-bold mt-6">${book.title}</h3>
    <p>Category : ${book.category}</p>
    <p>Price : ${book.price}</p>
    <a href="./view.html${params}" target="_blank" class="text-blue-500">see</a>
  </div>
  `
}


function displayLocalBook() {
  for (let book of localBooks) {
    showABookLocal(book);
  }

}

fetch("https://jsonplaceholder.typicode.com/photos")
  .then(async (res) => {
    const books = await res.json();
    for (let i = 0; i < 30; i++) {
      showABookApi(books[i]); 
    }
    displayLocalBook();
  }).catch((err) => {
    console.log(err);
  })

// for a book that get from API
function showABookApi(book) {
  bookStore.innerHTML += `
  <div class="w-[200px] border-2 rounded-lg p-[25px]">
    <img src="${book.thumbnailUrl}" alt="">
    <h3 class="font-bold mt-6">${book.title}</h3>
    <p>Album id : ${book.albumId}</p>
    <p>Category : 1</p>
    <a href="./view.html?id=${book.id}" target="_blank" class="text-blue-500">see</a>
  </div>
  `
}

function resetForm() {
  newBook.title.value = "";
  newBook.category.value = "";
  newBook.price.value = "";
}

function addANewBook() {
  var book = {};
  book["title"] = document.getElementById("name").value;
  book["category"] = document.getElementById("category").value;
  book["price"] = document.getElementById("price").value;
  book["urlImage"] = `https://via.placeholder.com/150/${randomColor()}`;
  localBooks.push(book);
  saveToLocalstorage(localBooks);
  showABookLocal(book);
  resetForm();
}

const saveToLocalstorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
}