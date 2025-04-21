// src/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import API_URL from '../api';
import './Styles/TaskList.css';

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error al obtener las tareas:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  return (
    <div className="task-list-container">
      <h2>Lista de Tareas</h2>
      {tasks.length ? (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onTaskChange={fetchTasks} />
        ))
      ) : (
        <p>No hay tareas.</p>
      )}
    </div>
  );
}

export default TaskList;
