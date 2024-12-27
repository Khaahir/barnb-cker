
export interface Book {
    id: number;
    title: string;
    author: string;
    plot: string;
  }
  
  export async function fetchBooks(): Promise<Book[]> {
    const response = await fetch("https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books: Book[] = await response.json();
    console.log(books);
    return books;
  }
  
