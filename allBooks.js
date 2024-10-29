const allBooks = document.getElementById("all-books-page");
const menuBars = document.getElementById("menu-bars");

menuBars.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.add("show");
  sidebar.classList.add("show");
});

const renderAllBooks = (book) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const isBookInStorage = storedBooks.some(
    (storedBook) => storedBook.bookName === book.bookName
  );

  const buttonText = isBookInStorage
    ? "Remove From My Library"
    : "Add To My Library";

  const bookHTML3 = `
    <div class="book">
      <div class="image">
        <img src="${book.img}" alt="${book.bookName}" />
      </div>
      <div class="info">
        <h5>${book.bookName}</h5>
        <p>${book.author}</p>
        <span class="rating">${book.rate}</span>
        <button onClick="addToLocal('${book.bookName}')">${buttonText}</button>
      </div>
    </div>
  `;

  allBooks.insertAdjacentHTML("beforeend", bookHTML3);
};

const renderAllBooksSection = (searchText = "") => {
  allBooks.innerHTML = "";

  books
    .filter((book) => {
      return (
        book.bookName.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .forEach((book) => renderAllBooks(book));
};

const loadBooksFromSession = () => {
  const sessionBooks = JSON.parse(localStorage.getItem("books added"));
  if (sessionBooks) {
    books = sessionBooks;
  }
  renderAllBooksSection();
};

window.onload = loadBooksFromSession;

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchText = event.target.querySelector("input").value;
  renderAllBooksSection(searchText);
});

const addToLocal = (bookN) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const bookToSave = books.find((book) => book.bookName === bookN);

  if (bookToSave) {
    const isBookInStorage = storedBooks.some(
      (book) => book.bookName === bookToSave.bookName
    );

    if (isBookInStorage) {
      const updatedBooks = storedBooks.filter(
        (book) => book.bookName !== bookToSave.bookName
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      renderAllBooksSection();
    } else {
      storedBooks.push(bookToSave);
      localStorage.setItem("books", JSON.stringify(storedBooks));

      renderAllBooksSection();
    }

    const searchText = document.querySelector("#search-form input").value;
    renderAllBooksSection(searchText);
  }
};

const addNewBook = () => {
  const bookNameInput = document.getElementById("bookName-input");
  const authorInput = document.getElementById("author-input");
  const imgInput = document.getElementById("img-input");
  const bookRate = document.getElementById("rate-input");

  const newBook = {
    bookName: bookNameInput.value,
    author: authorInput.value,
    img: imgInput.value,
    read: false,
    rate: bookRate.value + "/5",
    category: "All",
  };

  books.unshift(newBook);

  localStorage.setItem("books added", JSON.stringify(books));

  renderAllBooksSection();

  bookNameInput.value = "";
  authorInput.value = "";
  imgInput.value = "";
  bookRate.value = "";

  toggleModal();
};

const toggleModal = () => {
  const modalElement = document.getElementById("addModal");
  modalElement.classList.toggle("shown");
};
