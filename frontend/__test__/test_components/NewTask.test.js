import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewTask from '../../src/components/NewTask';

describe('NewTask Component', () => {
  const mockAddTask = jest.fn();

  const renderComponent = () => {
    render(<NewTask addTask={mockAddTask} />);
  };

  test('renders NewTask component', () => {
    renderComponent();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('toggles the form', () => {
    renderComponent();
    const toggleButton = screen.getByText('Add Task');
    fireEvent.click(toggleButton);
    expect(screen.getByPlaceholderText('Name your task...')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.queryByPlaceholderText('Name your task...')).not.toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('submits the form with the correct data', () => {
    renderComponent();
    const toggleButton = screen.getByText('Add Task');
    fireEvent.click(toggleButton);

    const titleInput = screen.getByPlaceholderText('Name your task...');
    const contentTextarea = screen.getByPlaceholderText('Describe your task...');
    const dueDateInput = screen.getByLabelText(/due date/i);

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-05-27' } });

    const submitButton = screen.getByText('Submit Task');
    fireEvent.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledWith('Test Task', 'Test Content', '2024-05-27');
    expect(screen.queryByPlaceholderText('Name your task...')).not.toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('submits the form without a due date', () => {
    renderComponent();
    const toggleButton = screen.getByText('Add Task');
    fireEvent.click(toggleButton);

    const titleInput = screen.getByPlaceholderText('Name your task...');
    const contentTextarea = screen.getByPlaceholderText('Describe your task...');

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

    const submitButton = screen.getByText('Submit Task');
    fireEvent.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledWith('Test Task', 'Test Content', null);
    expect(screen.queryByPlaceholderText('Name your task...')).not.toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });
});
