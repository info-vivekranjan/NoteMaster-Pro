/**
 *
 * @param {string} key
 * @param {any} data
 */

 export const setLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  /**
   *
   * @param {string} key
   * @returns val
   */
  export const getLocalData = (key) => {
    try {
      let val = JSON.parse(localStorage.getItem(key));
      return val;
    } catch (error) {
      return undefined;
    }
  };