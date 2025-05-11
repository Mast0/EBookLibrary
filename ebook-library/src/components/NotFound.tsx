import { Link } from "react-router-dom";
import "../styles/NotFound.css"

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-icon">
        <span className="book book-open">📖</span>
        <span className="book book-closed">📕</span>
      </div>
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Sorry, the page you`re looking for doest`n exist.</p>
      <Link to="/" className="btn btn-outline-primary not-found-button">
      Go Home
      </Link>
    </div>
  )
};

export default NotFound;