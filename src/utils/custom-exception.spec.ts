import { CustomException } from './custom-exception';

describe('CustomException', () => {
  it('should be defined', () => {
    expect(new CustomException()).toBeDefined();
  });
});
