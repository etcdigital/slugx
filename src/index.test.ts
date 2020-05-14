import slugx from './';

describe('slugx.create', () => {
  it('throws', () => {
    try {
      slugx.create(undefined);
    } catch (err) {
      expect(err.message).toBe('slugx.create: string argument expected');
    }
  });

  it('replace whitespaces with separator', () => {
    expect(slugx.create('foo bar baz')).toBe('foo-bar-baz');
    expect(slugx.create('foo bar baz', { separator: '_' })).toBe('foo_bar_baz');
  });

  it('remove trailing space if any', () => {
    expect(slugx.create(' foo bar baz ')).toBe('foo-bar-baz');
  });

  it('remove not allowed chars', () => {
    expect(slugx.create('foo, bar baz')).toBe('foo-bar-baz');
    expect(slugx.create('foo- bar baz')).toBe('foo-bar-baz');
    expect(slugx.create('foo] bar baz')).toBe('foo-bar-baz');
    expect(slugx.create('foo  bar--baz')).toBe('foo-bar-baz');
  });

  it('options.separator', () => {
    expect(slugx.create('foo bar baz', { separator: '_' })).toBe('foo_bar_baz');
  });

  it('options.lowercase', () => {
    expect(slugx.create('Foo bAr baZ', { lowercase: true })).toBe('foo-bar-baz');
  });

  it('without lowercase param', () => {
    expect(slugx.create('Is Slug Valid')).toBe('is-slug-valid');
  });

  it('options.strict', () => {
    expect(slugx.create('foo_bar. -baz!', { strict: true })).toBe('foobar-baz');
  });

  it('options.separator and options.strict', () => {
    expect(
      slugx.create('foo_bar-baz!', {
        separator: '_',
        strict: true,
      }),
    ).toBe('foo_barbaz');
  });
});

describe('slugx.validate', () => {
  it('is valid without min/mx', () => {
    expect(slugx.validate('is-slug-valid')).toBe(true);
  });

  it('is invalid without min/mx', () => {
    expect(slugx.validate('is 2 slug-valid')).toBe(false);
  });

  it('is valid with min', () => {
    expect(slugx.validate('is-slug-valid', { min: 4 })).toBe(true);
  });

  it('is invalid with min', () => {
    expect(slugx.validate('is', { min: 3 })).toBe(false);
  });

  it('is valid with min and max', () => {
    expect(slugx.validate('is-slug-valid', { min: 4, max: 20 })).toBe(true);
  });

  it('is invalid with min and max', () => {
    expect(slugx.validate('is-max', { min: 3, max: 4 })).toBe(false);
  });

  it('allow only numbers by defalt', () => {
    expect(slugx.validate('12312312')).toBe(true);
  });

  it('allow only numbers by config', () => {
    expect(slugx.validate('12312312', { allowOnlyNumbers: true })).toBe(true);
  });

  it('deny only numbers', () => {
    expect(slugx.validate('12312312', { allowOnlyNumbers: false })).toBe(false);
  });
});
