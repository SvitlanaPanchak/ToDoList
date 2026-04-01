//import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe(' Тести TodoList', () => {

  test('1. Відображається заголовок Task Master', () => {
    render(<App />);
    expect(screen.getByText(/Task Master/i)).toBeInTheDocument();
  });

  test('2. Можна додати нову задачу', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add item..../i);
    const button = screen.getByText('+');

    fireEvent.change(input, { target: { value: 'Вивчити React' } });
    fireEvent.click(button);

    expect(screen.getByText('Вивчити React')).toBeInTheDocument();
  });

  test('3. Показує повідомлення, коли список порожній', () => {
    render(<App />);
    expect(screen.getByText(/You are done!/i)).toBeInTheDocument();
  });

  test('4. Задача закреслюється при кліку', async () => { 
    render(<App />);
    const input = screen.getByPlaceholderText(/Add item..../i);
    fireEvent.change(input, { target: { value: 'Зробити тест' } });
    fireEvent.click(screen.getByText('+'));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      const taskText = screen.getByText('Зробити тест');
      expect(taskText).toHaveClass('isChecked');
    });
  });

  test('5. Задача видаляється', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add item..../i);
    fireEvent.change(input, { target: { value: 'Навчитися писати тести' } });
    fireEvent.click(screen.getByText('+'));

    const deleteBtn = screen.getByRole('listitem').querySelector('.delete-icon');
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Навчитися писати тести')).not.toBeInTheDocument();
  });

});