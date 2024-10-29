const personalBooks = document.getElementById("personal-books-page");

const menuBars = document.getElementById("menu-bars");

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
const toggleReadStatus = (bookName) => {
  const book = books.find((b) => b.bookName === bookName);

  if (book) {
    book.read = !book.read;

    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = storedBooks.map((storedBook) => {
      if (storedBook.bookName === bookName) {
        return { ...storedBook, read: book.read };
      }
      return storedBook;
    });
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    renderPersonalBooks();
  }
};

const renderPersonalBooks = () => {
  personalBooks.innerHTML = "";
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  if (storedBooks.length === 0) {
    personalBooks.innerHTML = `<p class="no-books-message">There are no books in your library.</p>`;
    return;
  }

  storedBooks.forEach((book) => {
    const bookHTML3 = `
          <div class="book">
            <div class="image">
              <img src="${book.img}" alt="${book.bookName}" />
            </div>
            <div class="info">
              <h5>${book.bookName}</h5>
              <p>${book.author}</p>
              <span class="status" onClick="toggleReadStatus('${
                book.bookName
              }')" style="color: ${book.read ? "green" : "red"};">
  ${book.read ? "Read" : "Unread"}
</span>
              <span class="rating">${book.rate}</span>
              <button onClick="removeFromLocal('${
                book.bookName
              }')">Remove From My Library</button>
            </div>
          </div>
        `;

    personalBooks.insertAdjacentHTML("beforeend", bookHTML3);
  });
};
const removeFromLocal = (bookName) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = storedBooks.filter((book) => book.bookName !== bookName);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  renderPersonalBooks();
};
window.onload = renderPersonalBooks;
