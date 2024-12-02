import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<h1>Welcome to Smart Task Manager</h1>} />
                    <Route path="/about" element={<h1>About This Project</h1>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Protected Routes */}
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-task"
                        element={
                            <ProtectedRoute>
                                <AddTask />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
