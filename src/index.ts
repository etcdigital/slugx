import charMap from './charmap';

type CreateOptions = {
  separator?: string;
  lowercase?: boolean;
  strict?: boolean;
};

export const create = (value: string, options: CreateOptions = {}): string => {
  const opts: CreateOptions = { separator: '-', lowercase: true, strict: false, ...options };
  if (typeof value !== 'string') {
    throw new Error('slugx.create: string argument expected');
  }

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
    .replace(new RegExp('[\\s' + opts.separator + ']+', 'g'), opts.separator);

  if (opts.lowercase !== false) {
    slug = slug.toLowerCase();
  }

  const isStrict = opts.strict === false ? false : true;
  if (isStrict) {
    // remove anything besides letters, numbers, and the replacement char
    slug = slug.replace(new RegExp('[^a-zA-Z0-9' + opts.separator + ']', 'g'), '');
  }

  return slug;
};

type ValidateOptions = {
  min?: number;
  max?: number;
  allowOnlyNumbers?: boolean;
  slugOptions?: CreateOptions;
};

export const validate = (slug: string, options: ValidateOptions = {}): boolean => {
  const opts: ValidateOptions = { min: 1, max: 1000, allowOnlyNumbers: true, ...options };
  const genSlug = create(slug, { lowercase: true, ...(options.slugOptions || {}) });
  if (genSlug !== slug) {
    return false;
  }
  if (genSlug.length < opts.min) {
    return false;
  }
  if (genSlug.length > opts.max) {
    return false;
  }
  if (!opts.allowOnlyNumbers) {
    // If has parseInt number, has only numbers
    if (parseInt(slug, 10)) {
      return false;
    }
  }
  return true;
};

export default { create, validate };
