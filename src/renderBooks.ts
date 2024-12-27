import { fetchBooks, Book } from "./fetchBooks.js";

async function renderBooks() {
  const container = document.getElementById("book-container") as HTMLDivElement;

  try {
    const books = await fetchBooks();
    container.innerHTML = books
      .map(
        (book) => `
        <div class="book" style="background-color: ${getRandomColor()}" data-id="${book.id}">
          <h3>${book.title}</h3>
        </div>
      `
      )
      .join("");

    container.querySelectorAll(".book").forEach((element) => {
      element.addEventListener("click", () => {
        const bookId = Number(element.getAttribute("data-id"));
        const book = books.find((b) => b.id === bookId);
        if (book) renderBookDetails(book);
      });
    });
  } catch {
    container.innerHTML = "<p>Failed to load books.</p>";
  }
}

function renderBookDetails(book: Book) {
  const container = document.getElementById("book-container") as HTMLDivElement;

  container.innerHTML = `
    <div class="book-details">
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.plot}</p>
      <button id="back-button">Back</button>
    </div>
  `;

  document.getElementById("back-button")?.addEventListener("click", renderBooks);
}

function getRandomColor(): string {
  const colors = ["#FFB6C1", "#D8BFD8", "#ADD8E6", "#90EE90", "#FFD700"];
  return colors[Math.floor(Math.random() * colors.length)];
}

renderBooks();

