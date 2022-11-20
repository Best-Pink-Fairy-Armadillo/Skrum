import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from './Home.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Profile from './Profile.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={< Profile />} />
      </Routes>
    </Router>
  )
}

export default App;