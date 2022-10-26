import {
  screen,
  render,
  fireEvent,
} from '@testing-library/react';
import { Rituals } from '../../pages/rituais';

describe('Rituals Page', () => {
  it('returns 6 rectangles with elements from Ordem Paranormal', () => {
    render(<Rituals />);
    expect(screen.getByText('rituais')).toBeInTheDocument();
  });
  it('allows you to click and select what rituals you want in the quiz', () => {
    render(<Rituals />);
    const bloodBtn = screen.getByText('blood');
    const startQuizBtn = screen.getByText('start');

    fireEvent.click(bloodBtn);
    fireEvent.click(startQuizBtn);
  });
});
