var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks } from "./fetchBooks.js";
function renderBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById("book-container");
        try {
            const books = yield fetchBooks();
            container.innerHTML = books
                .map((book) => `
        <div class="book" style="background-color: ${getRandomColor()}" data-id="${book.id}">
          <h3>${book.title}</h3>
        </div>
      `)
                .join("");
            container.querySelectorAll(".book").forEach((element) => {
                element.addEventListener("click", () => {
                    const bookId = Number(element.getAttribute("data-id"));
                    const book = books.find((b) => b.id === bookId);
                    if (book)
                        renderBookDetails(book);
                });
            });
        }
        catch (_a) {
            container.innerHTML = "<p>Failed to load books.</p>";
        }
    });
}
function renderBookDetails(book) {
    var _a;
    const container = document.getElementById("book-container");
    container.innerHTML = `
    <div class="book-details">
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.plot}</p>
      <button id="back-button">Back</button>
    </div>
  `;
    (_a = document.getElementById("back-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", renderBooks);
}
function getRandomColor() {
    const colors = ["#FFB6C1", "#D8BFD8", "#ADD8E6", "#90EE90", "#FFD700"];
    return colors[Math.floor(Math.random() * colors.length)];
}
renderBooks();
