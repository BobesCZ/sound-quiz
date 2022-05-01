const STORAGE_KEY_USER_DATA = "userQuizzesData";

const loadFromStorage = () => {
  if (window.localStorage) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA) ?? "{}");
  }
  return null;
};

const clearStorage = () => {
  if (window.localStorage) {
    localStorage.removeItem(STORAGE_KEY_USER_DATA);
  }
};

export { clearStorage, loadFromStorage };
