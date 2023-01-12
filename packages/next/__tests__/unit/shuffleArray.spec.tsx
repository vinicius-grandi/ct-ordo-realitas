import shuffleArray from '../../lib/utils/shuffleArray';

describe('Array Shuffle', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('shuffles an array', () => {
    const arr = [1, 2, 3, 4];
    expect(shuffleArray(arr)).toEqual([4, 3, 2, 1]);
  });
});
