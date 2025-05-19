import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';
import { vi, test, expect } from 'vitest'; // <- make sure to import from vitest

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

test('renders dropdown and selects an option', () => {
  const onSelect = vi.fn();

  render(<Dropdown options={options} onSelect={onSelect} />);
  
  expect(screen.getByRole('button')).toHaveTextContent('Filter Accounts');

  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Option 1')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Option 1'));
  expect(onSelect).toHaveBeenCalledWith('1');
  expect(screen.getByRole('button')).toHaveTextContent('Option 1');
});