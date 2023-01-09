/// <reference types="@testing-library/jest-dom" />
import { screen, render, fireEvent } from '@testing-library/react';
import { Rituals } from '../../pages/rituais';

window.scrollTo = jest.fn();

describe('Rituals Page', () => {
  it('returns 6 rectangles with elements from Ordem Paranormal', () => {
    render(<Rituals />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
  it('doesn\'t let you start the quiz without selecting a element', () => {
    render(<Rituals />);
    fireEvent.click(screen.getByText(/startQuiz/i));
    expect(screen.getByText(/atLeastOneElementError/i)).toBeInTheDocument();
  });
});
