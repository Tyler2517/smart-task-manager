import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios
            .get('tasks/')
            .then((response) => setTasks(response.data))
            .catch((error) => {
                console.error('Error fetching tasks:', error); // Explicitly log the error
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
            <h1>Tasks</h1>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                        <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
