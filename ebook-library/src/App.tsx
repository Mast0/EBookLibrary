import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<BookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
