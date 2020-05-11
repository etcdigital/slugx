import charMap from './charmap';

type Options = {
  separator?: string;
  decamelize?: boolean;
  lowercase?: boolean;
  strict?: boolean;
};

export const create = (value: string, options: Options = {}): string => {
  if (typeof value !== 'string') {
    throw new Error('slugx.create: string argument expected');
  }

  const separator = options.decamelize ? '' : options.separator || '-';

  let slug = value
    .split('')
    // replace characters based on charMap
    .reduce((result, chars) => result + (charMap[chars] || chars), '')
    // remove not allowed characters
    .replace(/[^\w\s$*_+~.()'"!\-:@]+/g, '')
    // trim leading/trailing spaces
    .trim()
    // convert spaces to replacement character
    // also remove duplicates of the replacement character
    .replace(new RegExp('[\\s' + separator + ']+', 'g'), separator);

  if (options.lowercase !== false) {
    slug = slug.toLowerCase();
  }

  const isStrict = options.strict === false ? false : true;
  if (isStrict) {
    // remove anything besides letters, numbers, and the replacement char
    slug = slug.replace(new RegExp('[^a-zA-Z0-9' + separator + ']', 'g'), '');
  }

  return slug;
};

export const validate = (slug: string, minChar = 3, maxChar = 32): boolean => {
  const genSlug = create(slug, { lowercase: true });
  if (genSlug !== slug) {
    return false;
  }
  if (minChar) {
    if (genSlug.length < minChar) {
      return false;
    }
  }
  if (maxChar) {
    if (genSlug.length > maxChar) {
      return false;
    }
  }
  return true;
};

export default { create, validate };
