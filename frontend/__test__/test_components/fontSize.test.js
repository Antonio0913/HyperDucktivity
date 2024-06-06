import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FontSize from '../../src/components/fontSize';

describe('FontSize Component', () => {
  const mockSetTextSize = jest.fn();
  const textSize = 20;

  test('renders FontSize component', () => {
    render(<FontSize textSize={textSize} setTextSize={mockSetTextSize} />);
    
    // Check if the input range is rendered
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    
    // Check if the slider has the correct value
    expect(slider).toHaveValue(String(textSize));
  });

  test('calls setTextSize with the new value when slider is changed', () => {
    render(<FontSize textSize={textSize} setTextSize={mockSetTextSize} />);
    
    // Simulate changing the slider value
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '50' } });
    
    // Check if setTextSize was called with the correct value
    expect(mockSetTextSize).toHaveBeenCalledWith(50);
  });
});
