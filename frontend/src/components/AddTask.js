import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const taskData = {
                title,
                description,  // Include description
                priority,
                due_date: dueDate,  // Include due_date
            };

            await axios.post('tasks/', taskData);
            alert('Task added successfully!');
            setTitle('');
            setDescription('');
            setPriority(1);
            setDueDate('');
            navigate('/tasks');
        } catch (error) {
            console.error('Error adding task:', error.response.data);
            alert('Failed to add task. Check the console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Priority:</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                >
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
            </div>
            <div>
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
