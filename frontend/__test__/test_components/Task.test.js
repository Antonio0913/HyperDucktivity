import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from '../../src/components/Task';

describe('Task Component', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    content: 'Test Content',
    dueDate: '2024-05-27',
    isComplete: false,
    isPriority: false,
  };
  
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockCompleteTask = jest.fn();
  const mockPrioritizeTask = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      task: mockTask,
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      completeTask: mockCompleteTask,
      prioritizeTask: mockPrioritizeTask,
      textSize: 16,
    };
    return render(<Task {...defaultProps} {...props} />);
  };

  test('renders Task component', () => {
    renderComponent();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Due:')).toBeInTheDocument();
    expect(screen.getByText('5/27/2024')).toBeInTheDocument();
  });

  test('calls prioritizeTask when priority button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('priority-button'));
    expect(mockPrioritizeTask).toHaveBeenCalledWith('1');
  });

  test('calls deleteTask when delete button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByAltText('Delete Button'));
    expect(mockDeleteTask).toHaveBeenCalledWith('1');
  });

  test('calls completeTask when complete button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByAltText('Completed'));
    expect(mockCompleteTask).toHaveBeenCalledWith('1');
  });

  test('enters edit mode when edit button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByAltText('Edit Icon'));
    expect(screen.getByPlaceholderText('Name your task...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe your task...')).toBeInTheDocument();
  });

  test('calls updateTask when saving an edited task', () => {
    renderComponent();
    fireEvent.click(screen.getByAltText('Edit Icon'));
    
    const titleInput = screen.getByPlaceholderText('Name your task...');
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    
    const contentInput = screen.getByPlaceholderText('Describe your task...');
    fireEvent.change(contentInput, { target: { value: 'Updated Content' } });

    fireEvent.submit(screen.getByTestId('submit-edit-button'));

    expect(mockUpdateTask).toHaveBeenCalledWith(
      '1',
      'Updated Task',
      'Updated Content',
      '2024-05-27'
    );
  });

  test('cancels editing task', () => {
    renderComponent();
    fireEvent.click(screen.getByAltText('Edit Icon'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByPlaceholderText('Name your task...')).not.toBeInTheDocument();
  });
});
