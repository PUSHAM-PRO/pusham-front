import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../customerpage/SideBar';
import { BrowserRouter as Router } from 'react-router-dom';

// Wrap the component with Router for Link components to work
const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('SideBar Component', () => {
  test('renders SideBar component with logo, search input, and navigation links', () => {
    renderWithRouter(<SideBar />);

    // Check that the logo is rendered
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    // Check that the search input is rendered
    expect(screen.getByPlaceholderText(/search or find/i)).toBeInTheDocument();

    // Check that all navigation links are rendered with correct text
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/ticket tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/history & archiving/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/help and support/i)).toBeInTheDocument();
  });

  test('renders user info correctly', () => {
    renderWithRouter(<SideBar />);

    // Check that user info (name and email) is rendered correctly
    expect(screen.getByText(/mireille eto/i)).toBeInTheDocument();
    expect(screen.getByText(/mireille\.dot@example\.com/i)).toBeInTheDocument();
  });

  test('triggers search input change event', () => {
    renderWithRouter(<SideBar />);

    // Check that the search input can handle text input
    const searchInput = screen.getByPlaceholderText(/search or find/i);
    fireEvent.change(searchInput, { target: { value: 'Search Query' } });
    expect(searchInput.value).toBe('Search Query');
  });

  test('checks if navigation links are functional', () => {
    renderWithRouter(<SideBar />);

    // Test that each Link component is rendered as a link
    const dashboardLink = screen.getByText(/dashboard/i).closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');

    const ticketTrackingLink = screen.getByText(/ticket tracking/i).closest('a');
    expect(ticketTrackingLink).toHaveAttribute('href', '#');

    const historyLink = screen.getByText(/history & archiving/i).closest('a');
    expect(historyLink).toHaveAttribute('href', '#');
  });

  test('renders logout button correctly', () => {
    renderWithRouter(<SideBar />);

    // Check if the logout icon is rendered
    const logoutButton = screen.getByRole('link', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
