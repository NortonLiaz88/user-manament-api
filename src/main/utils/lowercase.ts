export function keysToLowerCase(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map((item) => keysToLowerCase(item));
    } else {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = key.toLowerCase();
          const newValue = keysToLowerCase(obj[key]);
          newObj[newKey] = newValue;
        }
      }
      return newObj;
    }
  } else {
    return obj;
  }
}
