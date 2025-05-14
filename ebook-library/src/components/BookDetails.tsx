import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookDetails.css";
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

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = (location.state as { book: Book })?.book;

  if (!book) {
    return (
      <div className="book-details-container">
        <p>Book not found. <button onClick={() => navigate(-1)}>Go Back</button></p>
      </div>
    );
  }

  return (
    <>
      <div className="book-details-container">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Published:</strong> {book.publication_year}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <Link
            to={`/read/${book.id}`}
            className="btn btn-sm btn-outline-primary flex-grow-1 me-2"
          >
            Read
          </Link>
      </div>
    </>
  );
};

export default BookDetails;
