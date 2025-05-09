import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../services/api";
import { checkPermissions } from "../services/check";
import '../styles/BookList.css';
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
interface Book {
  id: string
  title: string;
  author: string;
  genre: string;
  description: string;
  publication_year: number;
  file_url: string;
};

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
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
          <button 
          className="btn btn-primary"
          onClick={async () => {
            const hasPermission = await checkPermissions('create');
            if (hasPermission)
              navigate('/create-book');
            else navigate('/')
          }}>
            Add New Book
          </button>
        </div>
        <div className="book-scroll">
          {books.map((book, index) => (
            <div key={index} className="card book-card">
              <div className="book-image-placeholder bg-secondary">
                <i className="bi bi-book"></i>
              </div>
              <div className="card-body d-flex flex-column">
              <h6 className="card-title mb-1 book-title">{book.title}</h6>
              <p className="book-author mb-2">{book.author}</p>
                <p className="card-text small mb-1">

                  {book.description.length > 100
                    ? `${book.description.slice(0, 100)}...`
                    : book.description}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/read/${book.id}`}
                    className="btn btn-sm btn-outline-primary flex-grow-1 me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to="/book-details"
                    state={{ book }}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
