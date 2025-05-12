import { use, useEffect, useState } from "react";
import { getBooks, getReadings, getUserByEmail } from "../services/api";
import '../styles/BookList.css';
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";

interface Book {
  id: string
  title: string;
  author: string;
  genre: string;
  description: string;
  publication_year: number;
  file_url: string;
};

interface Reading {
  user_id: string;
  book_id: string;
  current_page: string;
  percentage_read: number;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingBooks, setReadingBooks] = useState<{book: Book, reading: Reading}[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);

        const uniqueAuthors: string[] = Array.from(new Set(data.map((book: Book) => book.author)));
        const uniqueGenres: string[] = Array.from(new Set(data.map((book: Book) => book.genre)));

        setAuthors(uniqueAuthors);
        setGenres(uniqueGenres);

        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
          const user = await getUserByEmail(email);
          const readingsData = await getReadings(user.id);

          const readingBookIds = readingsData.map((r: Reading) => r.book_id);

          const readingBookPairs = data
          .filter((book: Book) => readingBookIds.includes(String(book.id).trim()))
          .map((book: Book) => {
            const reading = readingsData.find((r: Reading) => String(r.book_id).trim() === String(book.id).trim());
            return {book, reading};
          });

          setReadingBooks(readingBookPairs);
        } catch (error) {
          navigate('/login');
        }
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
      { readingBooks.length > 0 && (<div className="container mt-4">
        <h2 className="mb-4">Continue Reading</h2>
        <div className="book-scroll">
          {readingBooks.map(({book, reading}, index) => (
            <div key={`reading-${index}`} className="card book-card">
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

                <div className="progress my-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{width: `${reading.percentage_read}%`,
                              backgroundColor: reading.percentage_read < 30
                            ? '#dc3545' //red
                            : reading.percentage_read < 70
                            ? '#ffc107' //yellow
                            : '#28a745' //green
                          }}
                      aria-valuenow={reading.percentage_read}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      ></div>
                </div>
                <p className="card-text small mb-1">{reading.percentage_read.toFixed(0)}% read</p>
                
                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/read/${book.id}`}
                    className="btn btn-sm btn-outline-success flex-grow-1 me-2 w-100"
                  >
                    Resume
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
      </div>)}
      <div className="container mt-4">
        <h2 className="mb-4">Books</h2>
        <div className="mb-3">
          <div className="row g-2 align-items-end mb-3 flex-wrap">
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Filter By Author:</label>
              <select
                className="form-select"
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
              >
                <option value='All'>All</option>
                {authors.map((author) => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Filter By Genre:</label>
              <select
                className="form-select"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value='All'>All</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex gap-2">
                <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSelectedAuthor('All');
                  setSelectedGenre('All');
                }}
              >Clear Filters</button>
              <Link 
                to={"/create-book"}
                className="btn btn-primary"
              >
                Add New Book
              </Link>
            </div>
          </div>
        </div>
        <div className="book-scroll">
          {books
          .filter(book => 
            (selectedAuthor === 'All' || book.author === selectedAuthor) &&
            (selectedGenre === 'All' || book.genre === selectedGenre)
          )
          .map((book, index) => (
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
