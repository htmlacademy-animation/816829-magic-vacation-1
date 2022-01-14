export class StateStorage {
  /**
   * @param {Storage} storage
   * @param {string} key
   */
  constructor(storage, key) {
    this._storage = storage;
    this._key = key;
  }

  getState(defaultState) {
    try {
      const item = this._storage.getItem(this._key);
      return item === null
        ? defaultState
        : JSON.parse(item);
    } catch (_e) {
      return defaultState;
    }
  }

  setState(newState) {
    try {
      this._storage.setItem(this._key, JSON.stringify(newState));
      return true;
    } catch (_e) {
      return false;
    }
  }
}
