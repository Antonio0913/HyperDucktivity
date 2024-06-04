import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  const placeholderText = 'Search your tasks...';
  const mockOnSearch = jest.fn();

  test('renders SearchBar component', () => {
    render(<SearchBar placeholder={placeholderText} onSearch={mockOnSearch} />);
    
    // Check if the input is rendered with the correct placeholder
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch with the input value when typing', () => {
    render(<SearchBar placeholder={placeholderText} onSearch={mockOnSearch} />);
    
    // Simulate typing in the search input
    const inputElement = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    
    // Check if onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  test('updates the input value as user types', () => {
    render(<SearchBar placeholder={placeholderText} onSearch={mockOnSearch} />);
    
    // Simulate typing in the search input
    const inputElement = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(inputElement, { target: { value: 'new query' } });
    
    // Check if the input value is updated
    expect(inputElement).toHaveValue('new query');
  });
});
