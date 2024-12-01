import * as CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { colors, myPublicSecretKey } from "./constant";
import gifs from "./gifs";

const getCurrentDate = () => {
  const now = new Date();
  const formatter = now
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "/");
  return formatter.replace(",", "");
};

const getCurrentDate_2 = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${day}${month}${year}.${hours}${minutes}${seconds}`;
};

const encrypt = (value: any) => {
  return CryptoJS.AES.encrypt(value, myPublicSecretKey).toString();
};

const decrypt = (encryptedValue: any) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedValue, myPublicSecretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const getRandomGif = () => {
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
};

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const initializeStorage = (storageKey: string, defaultValue: any) => {
  localStorage.setItem(storageKey, JSON.stringify(defaultValue));
  return defaultValue;
};

const findStorageItemBy = (
  storageKey: string,
  searchKey: string,
  searchValue: string
): any => {
  const data = getStorageData(storageKey);
  if (data === null) {
    return initializeStorage(storageKey, []);
  }
  return data.find(
    (item: any) =>
      String(item[searchKey]).toLowerCase() === searchValue.toLowerCase()
  );
};

const getPaginatedStorageData = (
  storageKey: string,
  page: number = 0,
  size: number = 5,
  searchKey?: string,
  searchValue?: string
): any => {
  const data = localStorage.getItem(storageKey);
  if (data === null) {
    return initializeStorage(storageKey, []);
  }
  try {
    const parsedData = JSON.parse(data);
    let filteredData = parsedData;
    if (searchKey && searchValue) {
      filteredData = parsedData.filter((item: any) =>
        String(item[searchKey])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
    filteredData.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return {
      totalElements: filteredData.length,
      totalPages: Math.ceil(filteredData.length / size),
      currentPage: page,
      items: paginatedData,
    };
  } catch (err) {
    return initializeStorage(storageKey, []);
  }
};

const getStorageData = (storageKey: string): any => {
  const data = localStorage.getItem(storageKey);
  if (data === null) {
    return initializeStorage(storageKey, []);
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    return initializeStorage(storageKey, []);
  }
};

const addItemToStorage = (storageKey: string, newItem: any) => {
  const storageData = getStorageData(storageKey);
  storageData.push(newItem);
  localStorage.setItem(storageKey, JSON.stringify(storageData));
};

const updateItemInStorage = (
  storageKey: string,
  updatedFields: any,
  id: string
) => {
  const storageData = getStorageData(storageKey);
  const itemIndex = storageData.findIndex((item: any) => item.id === id);
  if (itemIndex !== -1) {
    const updatedItem = { ...storageData[itemIndex], ...updatedFields };
    storageData[itemIndex] = updatedItem;
    localStorage.setItem(storageKey, JSON.stringify(storageData));
  }
};

const overwriteItemInStorage = (storageKey: string, newItem: any) => {
  const storageData = getStorageData(storageKey);
  const itemIndex = storageData.findIndex(
    (item: any) => item.id === newItem.id
  );
  if (itemIndex !== -1) {
    storageData[itemIndex] = { ...newItem };
    localStorage.setItem(storageKey, JSON.stringify(storageData));
  }
};

const deleteItemFromStorage = (storageKey: string, id: any) => {
  const storageData = getStorageData(storageKey);
  const itemIndex = storageData.findIndex((item: any) => item.id === id);
  if (itemIndex !== -1) {
    storageData.splice(itemIndex, 1);
    localStorage.setItem(storageKey, JSON.stringify(storageData));
  }
};

const getItemById = (storageKey: string, id: string): any => {
  const storageData = getStorageData(storageKey);
  const item = storageData.find((item: any) => item.id === id);
  return item || null;
};

const generateUniqueId = () => {
  return uuidv4();
};

const parseResponseText = (text: string): string => {
  if (text.startsWith("<?xml") || text.startsWith("<")) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    return xmlDoc.getElementsByTagName("Json")[0]?.textContent ?? "";
  }
  return text;
};

const truncateString = (str: any, limit: any) => {
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
};

export {
  getRandomGif,
  getRandomColor,
  encrypt,
  decrypt,
  getStorageData,
  addItemToStorage,
  getCurrentDate,
  generateUniqueId,
  updateItemInStorage,
  deleteItemFromStorage,
  getPaginatedStorageData,
  getItemById,
  parseResponseText,
  truncateString,
  overwriteItemInStorage,
  getCurrentDate_2,
  findStorageItemBy,
  initializeStorage,
};
