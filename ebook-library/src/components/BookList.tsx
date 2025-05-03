import { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import { getDefaultFormatCodeSettings } from "typescript";

interface Book {
  title: string;
  author: string;
  genre: string;
  description: string;
  publication_year: number;
  file_url: string;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async() => {
      try{
        const data = await getBooks();
        setBooks(data);
      } catch (error){
        console.error("Load books error", error);
        alert("Failed to load books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <a href="/create-book">CreateBook</a>
      {books.map((book, index) => (
        <div key={index}>
          <h3>{book.title} ({book.publication_year})</h3>
          <p><b>Author:</b> {book.author}</p>
          <p><b>Genre:</b> {book.genre}</p>
          <p><b>Description:</b> {book.description}</p>
          <a href="{book.file_url}" target="_blank" rel="noopener noreferrer">Read</a>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookList;