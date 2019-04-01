import { JsonWebToken } from './json-web-token';

describe('JsonWebToken', () => {
  it('should be defined', () => {
    expect(new JsonWebToken()).toBeDefined();
  });
});
