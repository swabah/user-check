import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </Router>
  );
}

export default App;
