import React, { useState } from 'react';

function Profile(props) {
  const tasks = props.tasks;
  const username = props.username;

  const [taskArr, setTaskArr] = useState([]);

  // define out variables for props.username, props.tasks
  // addTask method

  const addTask = () => {
    // grab information about a new task (populated by user)-- (urgency, name, text, status) -- and put it into an array...
    const urgency = document.querySelector('#urgency').value;
    const name = document.querySelector('#name').value;
    const text = document.querySelector('#text').value;
    const status = document.querySelector('#status').value;

    const newTask = [urgency, name, text, status];

    const reqBody = {
      urgency: urgency,
      name: name,
      text: text,
      status: status
    };

    // conditions that check for the existence of urgenyc, name, text and status w/ urgency being a number


    // invoke props.getTasks(tasks) 
    props.getTasks(...tasks, newTask); // this will update the task state

    // send a POST request to update database with latest task(s) body of: (urgency, name, text, status)
    // '/api/createTask' is the fetch req to be made.. 
    fetch('api/createTask', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
      .then(response => response.json())
      .then(response => console.log('created task!', response))
      .catch((err) => console.log('do better in creating a task'));
  }

  const editTask = () => {

  }

  const deleteTask = () => {

  }
  
  const grabTasks = () => {
    fetch('api/getTasks')
      .then(response => response.json())
      .then((response) => {
        console.log('got the tasks!', response, 'typeof response', Array.isArray(response));
        const taskArrTypeCoerced = Object.entries(response);
        console.log('taskArray typecorededs', taskArrTypeCoerced);
        setTaskArr(JSON.stringify(taskArrTypeCoerced));
      })

    for (let i = 0; i < taskArrTypeCoerced.length; i++) {
      taskArr.push(taskArrTypeCoerced[i]);
    }
  }
  
  // these two will be propped drilled down to tasks
  // editTask method
  // deleteTask method

  // have a for loop goign through props.tasks to create
  // an array of <Task />'s

  

  return (
    <div> 
      <p>Successful profile log in {username}!</p>
      <input id='urgency' placeholder='urgency is a number'></input>
      <input id='name' placeholder='name'></input>
      <input id='text' placeholder='text'></input>
      <input id='status' placeholder='status'></input>
      <button onClick={addTask}>Add Task</button>
      <div>{taskArr}</div>
      <button onClick={grabTasks}>Show Tasks</button>
    </div>
  )
}


export default Profile;