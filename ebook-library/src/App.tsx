import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/books' element={<BookList />} />
        <Route path="/create-book" element={<CreateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
