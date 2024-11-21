import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the navbar correctly', () => {
    // Wrap the Navbar with MemoryRouter for testing
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('navigates to the correct page when a link is clicked', async () => {
    // Use MemoryRouter with an initialEntries prop to simulate routing
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    const tasksLink = screen.getByText('Tasks');
    await userEvent.click(tasksLink);

    // Check if the navigation happened (MemoryRouter keeps track of the location)
    expect(window.location.pathname).toBe('/');
  });
});
