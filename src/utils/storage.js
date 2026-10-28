export function readStorage(key, fallbackValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? fallbackValue : JSON.parse(storedValue);
  } catch (error) {
    console.error(`Unable to read "${key}" from localStorage.`, error);
    return fallbackValue;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save "${key}" to localStorage.`, error);
  }
}
