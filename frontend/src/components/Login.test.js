import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from '../api/axios';
import Login from './Login';
import Register from './Register';

jest.mock('../api/axios');

describe('Login', () => {
  it('renders login form', () => {
    const { getByPlaceholderText } = render(<MemoryRouter><Login /></MemoryRouter>);
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('calls axios.post with correct data when submitting form', async () => {
    const { getByPlaceholderText, getAllByText } = render(<MemoryRouter><Login /></MemoryRouter>);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getAllByText('Login')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('token/', {
      username: 'testuser',
      password: 'testpassword',
    });
  });
});

describe('Register', () => {
  it('renders register form', () => {
    const { getByLabelText } = render(<MemoryRouter><Register /></MemoryRouter>);
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
  });

  it('calls axios.post with correct data when submitting form', async () => {
    const { getByLabelText, getAllByText } = render(<MemoryRouter><Register /></MemoryRouter>);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getAllByText('Register')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/register/', {
      username: 'testuser',
      password: 'testpassword',
    });
  });
});