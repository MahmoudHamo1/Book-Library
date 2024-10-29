const trendbooks = document.getElementById("trend-books");
const populerbooks = document.getElementById("populer-books");
const menuBars = document.getElementById("menu-bars");
const headerLinks = document.querySelectorAll(".links");

headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar");
    const sidebar = document.querySelector(".sidebar");

    navbar.classList.remove("show");
    sidebar.classList.remove("show");
  });
});

menuBars.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.add("show");
  sidebar.classList.add("show");
});

const closeSidebar = document.getElementById("close-sidebar");

closeSidebar.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.remove("show");
  sidebar.classList.remove("show");
});

const renderTrendBook = (book) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const isBookInStorage = storedBooks.some(
    (storedBook) => storedBook.bookName === book.bookName
  );

  const buttonText = isBookInStorage
    ? "Remove From My Library"
    : "Add To My Library";

  const bookHTML1 = `
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
  trendbooks.insertAdjacentHTML("beforeend", bookHTML1);
};

const renderPopulerBook = (book) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const isBookInStorage = storedBooks.some(
    (storedBook) => storedBook.bookName === book.bookName
  );

  const buttonText = isBookInStorage
    ? "Remove From My Library"
    : "Add To My Library";

  const bookHTML2 = `
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
  populerbooks.insertAdjacentHTML("beforeend", bookHTML2);
};

const renderAllTrendBooks = () => {
  trendbooks.innerHTML = "";
  books
    .filter((book) => book.category[0] === "Trending")
    .forEach((book) => renderTrendBook(book));
};

const renderAllPopulerBooks = () => {
  populerbooks.innerHTML = "";
  books
    .filter((book) => book.category[0] === "Popular")
    .forEach((book) => renderPopulerBook(book));
};

renderAllTrendBooks();
renderAllPopulerBooks();

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

      renderAllTrendBooks();
      renderAllPopulerBooks();
    } else {
      storedBooks.push(bookToSave);
      localStorage.setItem("books", JSON.stringify(storedBooks));

      renderAllTrendBooks();
      renderAllPopulerBooks();
    }
  }
};
