import { screen, render } from '@testing-library/react';
import { Rituals } from '../../pages/rituais';

describe('Rituals Page', () => {
  const rituals = [{ name: 'Cinerária', imagePath: '#', type: 'fear' }];
  jest.mock('@ct-ordo-realitas/app/firebase/clientApp', () => ({
    getRituals: () => Promise.resolve([
      {
        docs: {
          data: () => rituals[0],
        },
      },
    ]),
  }));
  it('returns 6 rectangles with elements from Ordem Paranormal', () => {
    render(<Rituals />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
});
