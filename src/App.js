import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import axios from 'axios';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Fetch tasks from backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks') // Backend API URL
      .then(response => {
        setTasks(response.data); // Store tasks in state
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <Router>
      <div>
        <h1>Todo App</h1>  {/* Main Title */}
        
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* Display tasks only on the homepage */}
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h2>Task List</h2>
                <TaskForm />
                <ul>
                  {tasks.map(task => (
                    <li key={task.id}>
                      {task.task} - {task.status}
                    </li>
                  ))}
                </ul>
              </div>
            } 
          />
          
          {/* Routes for different pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} />} />
          <Route path="/add-task" element={<TaskForm addTask={addTask} />}  />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
