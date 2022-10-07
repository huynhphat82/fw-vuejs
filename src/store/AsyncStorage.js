const AsyncStorage = {
  setItem(key, data) {
    return new Promise((resolve, reject) => {
      window.localStorage.setItem(
        key,
        data && typeof data === "object" ? JSON.stringify(data) : data
      );
      resolve();
    });
  },
  getItem(key) {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(window.localStorage.getItem(key)));
      } catch (err) {
        resolve(window.localStorage.getItem(key));
      }
    });
  },
  removeItem(key) {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(key);
      resolve();
    });
  },
  clear() {
    return new Promise((resolve, reject) => {
      window.localStorage.clear();
      resolve();
    });
  },
  key(index) {
    return new Promise((resolve, reject) => {
      resolve(window.localStorage.key(index));
    });
  },
  length() {
    return new Promise((resolve, reject) => {
      resolve(window.localStorage.length);
    });
  }
};

export default AsyncStorage;
