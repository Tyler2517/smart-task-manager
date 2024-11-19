import React, { useState } from 'react';
import axios from '../api/axios';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('tasks/', { title, priority })
            .then(() => {
                alert('Task added successfully!');
                setTitle('');
                setPriority(1);
            })
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Priority:</label>
                <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
