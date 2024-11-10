import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock useAuth to simulate login function
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: jest.fn(),
}));

describe('LoginPage', () => {
  // Mock login function
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Mock implementation for useAuth
    useAuth.mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginPage component correctly', () => {
    render(<LoginPage />);

    // Check that the header, inputs, and button are rendered
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('displays default values correctly', () => {
    render(<LoginPage />);

    // Check default email and password values
    expect(screen.getByLabelText(/email/i)).toHaveValue('example@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
    expect(screen.getByLabelText(/role/i)).toHaveValue('Customer');
  });

  test('submits form with selected role', () => {
    render(<LoginPage />);

    // Select a different role
    fireEvent.change(screen.getByLabelText(/role/i), { target: { value: 'Agent' } });
    expect(screen.getByLabelText(/role/i)).toHaveValue('Agent');

    // Click the login button to submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Check if the login function was called with the correct role
    expect(mockLogin).toHaveBeenCalledWith('Agent');
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  test('logs default email, password, and role on submit', () => {
    console.log = jest.fn(); // Mock console.log
    render(<LoginPage />);

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Check if console.log was called with default values
    expect(console.log).toHaveBeenCalledWith({
      email: 'example@example.com',
      password: 'password123',
      role: 'Customer',
    });
  });
});
