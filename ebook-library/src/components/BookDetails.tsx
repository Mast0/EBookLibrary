import { useLocation, useNavigate } from "react-router-dom";
import { checkPermissions } from "../services/check";
import ThemeToggle from "./ThemeToggle";
import "../styles/BookDetails.css";

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
      <ThemeToggle />
      <div className="book-details-container">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Published:</strong> {book.publication_year}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <button
        className="btn btn-primary"
        onClick={async () => {
          const hasPermission = await checkPermissions('read');
          if (hasPermission)
            navigate(`/read/${book.id}`)
          else navigate('/');
        }}>
          Read
        </button>
      </div>
    </>
  );
};

export default BookDetails;
