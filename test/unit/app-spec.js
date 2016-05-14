import createApp from '../../src/app';

describe('App', () => {
  it('returns true', () => {
    assert(createApp(), true);
  });
});
