import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Swabah from './Components/Swabah';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Swabah />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
