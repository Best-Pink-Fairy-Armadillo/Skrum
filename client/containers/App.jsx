import React, { useState } from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from '../components/Home.jsx';
import SignIn from '../components/SignIn.jsx';
import SignUp from '../components/SignUp.jsx';
import Profile from './Profile.jsx';

function AppContainer() {
  const [tasks, setTasks] = useState([['Task to do', 'blah blah'], ['Task to do later urgent nahh', 'blah blah']]);
  // repeat logic for line 10 doing it with data for username.. initialize user to be ''

  // have username key to username for state
  // tasks to be sent to backend (when adding, have it in state)
  // for backend in cookie: send the state of {username, taskdata} send in header 
  const [username, setUsername] = useState(''); 

  const populateTasks = (data) => {
    setTasks(data);
  }

  const getUser = (data) => {
    setUsername(data);
  }

/* 
initialState = {
  tasks: [] => setState => [[data, data], [data, data]]
  username: '' => setState => username:req.Body.username
}


setTasks--> 

setState(newestState)

*/

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn populateTasks={populateTasks} getUser={getUser}/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile tasks={tasks} username={username} />} />
      </Routes>
    </Router>
  )
}

export default AppContainer;