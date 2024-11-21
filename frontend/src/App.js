import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Welcome to Smart Task Manager</h1>} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/add-task" element={<AddTask />} />
                    <Route path="/about" element={<h1>About This Project</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
