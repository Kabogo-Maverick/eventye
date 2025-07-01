import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyEvents from './pages/MyEvents';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/check')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/myevents"
          element={user ? <MyEvents user={user} /> : <Navigate to="/login" />}   
          /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
