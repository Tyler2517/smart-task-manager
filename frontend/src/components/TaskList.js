import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('tasks/')
      .then((response) => setTasks(response.data))
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

    const handleCompleteTask = async (taskId) => {
        try {
            await axios.patch(`tasks/${taskId}/`, { completed: true });
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleRemoveTask = async (taskId) => {
        try {
            await axios.delete(`tasks/${taskId}/`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const filteredTasks = tasks.filter((task) => !task.completed);
    
    return (
      <div>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
            <h1 style={{ marginRight: 'auto' }}>Tasks</h1>
            <Button variant="contained" onClick={() => window.location.href = '/add-task'}>Add Task</Button>
        </Stack>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title} - {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</h2>
              <p>{task.description}</p>
              <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
              <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default TaskList;
