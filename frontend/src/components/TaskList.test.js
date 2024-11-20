import { render, screen } from '@testing-library/react';
import axios from '../api/axios';
import TaskList from './TaskList';

jest.mock('../api/axios', () => ({
    get: jest.fn(), // Mock the `get` method
}));


describe('TaskList Component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('renders tasks fetched from the API', async () => {
        const tasks = [
            { id: 1, title: 'Task 1', priority: 1 },
            { id: 2, title: 'Task 2', priority: 2 },
        ];

        // Mock the axios.get method to return the tasks
        axios.get.mockResolvedValueOnce({ data: tasks });

        render(<TaskList />);

        // Assert that tasks are rendered with correct text
        for (const task of tasks) {
            const priorityText =
                task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low';
            expect(await screen.findByText(`${task.title} - ${priorityText}`)).toBeInTheDocument();
        }
    });

    it('displays an empty list if no tasks are fetched', async () => {
        axios.get.mockResolvedValueOnce({ data: [] }); // Mock empty response

        render(<TaskList />);

        expect(await screen.findByText('Tasks')).toBeInTheDocument();
        expect(screen.queryAllByRole('listitem')).toHaveLength(0); // Ensure no list items are rendered
    });
    
});
