/**
 * Sets data in localStorage after converting it to a JSON string.
 *
 * @param {string} key - The key under which data will be stored.
 * @param {any} data - The data to store in localStorage.
 */
export const setLocalData = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Retrieves data from localStorage and parses it from JSON string.
 *
 * @param {string} key - The key of the data to retrieve.
 * @returns {any} The parsed data from localStorage, or undefined if an error occurs.
 */
export const getLocalData = (key: string): any => {
  try {
    let val = JSON.parse(localStorage.getItem(key) || 'null');
    return val;
  } catch (error) {
    return undefined;
  }
};
