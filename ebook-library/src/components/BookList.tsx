import { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import '../styles/BookList.css';
import ThemeToggle from "./ThemeToggle";

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
    <>
      <ThemeToggle />
      <div className="container mt-4">
        <h2 className="mb-4">Books</h2>
        <div className="mb-3">
          <a href="/create-book" className="btn btn-primary">Add New Book</a>
        </div>
        <div className="book-scroll">
          {books.map((book, index) => (
            <div key={index} className="card book-card">
              <div className="book-image-placeholder bg-secondary">
                <i className="bi bi-book"></i>
              </div>
              <div className="card-body d-flex flex-column">
                <h6 className="card-title mb-1">{book.title}</h6>
                <small className="text-muted">{book.publication_year}</small>
                <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="card-text mb-1"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text small mb-1"><strong>Description:</strong>{book.description}</p>
                <a 
                  href="{book.file_url}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary mt-auto">Read</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;