import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Очищаємо token з localStorage
    localStorage.removeItem("accessToken");
    // Перенаправляємо на початкову сторінку (наприклад, головну з формою входу/реєстрації)
    navigate("/login");
  }, [navigate]);

  return null; // Цей компонент не має відображати UI, він лише виконує логіку
};

export default Logout;
