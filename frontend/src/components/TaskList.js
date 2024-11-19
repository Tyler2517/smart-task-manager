import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('tasks/')
            .then((response) => setTasks(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
