// src/components/TaskForm.js
import React, { useState } from 'react';
import api from '../services/api';

const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', task);
      refreshTasks(); // Reload tasks after adding
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <select name="status" onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
