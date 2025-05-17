import { Link } from "react-router-dom";
import "../styles/NotFound.css"
import image404 from "../images/img.png";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card not-found-left">
        <div className="not-found-title">404</div>
        <div className="not-found-message">
          <h1>СТОРІНКА НЕ ПРАЦЮЄ</h1>
          <p>Поки не знаємо в чому проблема, <br /> 
          але ми скоро все виправимо!</p>
        </div>
        <Link to="/" className="not-found-button">
          Он як, Go Home
        </Link>
    </div>
    
      <div className="not-found-card">
        <img src={image404} alt="Not Found" className="not-found-image"/>
        <p className="not-found-image-text">Он як</p>
      </div>
    </div>
  )
};

export default NotFound;