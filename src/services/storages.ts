const initializeStorage = (storageKey: string, defaultValue: any) => {
  localStorage.setItem(storageKey, JSON.stringify(defaultValue));
  return defaultValue;
};

const getStorageData = (key: string, defaultValue: any = null) => {
  const data = localStorage.getItem(key);

  if (!data) {
    return initializeStorage(key, defaultValue);
  }

  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    return initializeStorage(key, defaultValue);
  }
};

const setStorageData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageData, setStorageData };
