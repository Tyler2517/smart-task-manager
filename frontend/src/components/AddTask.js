import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';

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
                description,
                priority,
                due_date: dueDate,
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
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
            Add Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
              />
              <TextField
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                required
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </TextField>
              <TextField
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                />
              <Button variant="contained" type="submit">
                Add Task
              </Button>
            </Stack>
          </form>
        </Box>
      );
};

export default AddTask;
