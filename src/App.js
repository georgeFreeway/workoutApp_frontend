import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

//protecting routes
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
