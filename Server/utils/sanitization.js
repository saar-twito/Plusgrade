import xss from 'xss';

export function sanitize(input) {
  if (typeof input === 'string') {
    return xss(input);
  }

  if (typeof input === 'number') {
    return input; 
  }

  if (typeof input === 'object' && input !== null) {
    const clean = {};
    for (const key in input) {
      clean[key] = sanitize(input[key]);
    }
    return clean;
  }

  return input;
}
