import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import PdfReader from './components/PdfReader';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';


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
          <Route path='/read/:id' element={<PdfReader /> }/>
          <Route path="/book-details" element={<BookDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
