import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from '../api/axios';
import TaskList from './TaskList';

jest.mock('../api/axios', () => ({
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
}));

beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(() => 'mocked-token'), // Return a mocked token
            setItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });
});

describe('TaskList Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders tasks fetched from the API', async () => {
        const tasks = [
            { id: 1, title: 'Task 1', priority: 1 },
            { id: 2, title: 'Task 2', priority: 2 },
        ];

        axios.get.mockResolvedValueOnce({ data: tasks });

        render(<TaskList />);

        for (const task of tasks) {
            const priorityText =
                task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low';
            expect(await screen.findByText(`${task.title} - ${priorityText}`)).toBeInTheDocument();
        }
    });

    it('completes a task when the complete button is clicked', async () => {
        const tasks = [
            { id: 1, title: 'Task 1', priority: 1, completed: false, description: 'Task 1 description' },
        ];

        axios.get.mockResolvedValueOnce({ data: tasks });
        axios.patch.mockResolvedValueOnce({}); // Mock successful patch response

        render(<TaskList />);

        await waitFor(() => screen.getByText('Task 1 - High'));

        const completeButton = screen.getByText('Complete');
        userEvent.click(completeButton);

        await waitFor(() => {
            expect(axios.patch).toHaveBeenCalledTimes(1);
            expect(axios.patch).toHaveBeenCalledWith('tasks/1/', { completed: true });
        });
    });

    it('removes a task when the remove button is clicked', async () => {
        const tasks = [
            { id: 1, title: 'Task 1', priority: 1, completed: false, description: 'Task 1 description' },
        ];

        axios.get.mockResolvedValueOnce({ data: tasks });
        axios.delete.mockResolvedValueOnce({}); // Mock successful delete response

        render(<TaskList />);

        await waitFor(() => screen.getByText('Task 1 - High'));

        const removeButton = screen.getByText('Remove');
        userEvent.click(removeButton);

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith('tasks/1/');
        });
    });
});
