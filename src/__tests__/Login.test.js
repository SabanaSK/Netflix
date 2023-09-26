import LoginPage from './LoginPage';
import { it, describe, expect } from 'vitest';
import { render, screen, fireEvent,beforeEach } from '@testing-library/react';
import { UserProvider } from '../../context/UserContext';
import { MemoryRouter } from 'react-router';

describe('LoginPage tests', () => {
  
  beforeEach(() => {
    render(
      <UserProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginPage />
        </MemoryRouter>
      </UserProvider>
    );
  });

  it('renders LoginPage correctly', () => {
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows error if username or password field is empty', () => {
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Both fields are requried!')).toBeInTheDocument();
  });

  it('shows error if password is less than or equal to 5 characters', () => {
    fireEvent.input(screen.getByPlaceholderText('Username'), { target: { value: 'test' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: '12345' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Password should be more than 5 characters!')).toBeInTheDocument();
  });

  // Add more tests as needed...
});
