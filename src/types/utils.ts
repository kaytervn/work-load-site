import * as CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { colors, myPublicSecretKey } from "./constant";
import BG1 from "../assets/GIF_01.gif";
import BG2 from "../assets/GIF_02.gif";
import BG3 from "../assets/GIF_03.gif";
import BG4 from "../assets/GIF_04.gif";
import BG5 from "../assets/GIF_05.gif";

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

const encrypt = (value: any) => {
  return CryptoJS.AES.encrypt(value, myPublicSecretKey).toString();
};

const decrypt = (encryptedValue: any) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedValue, myPublicSecretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const getRandomGif = () => {
  const gifs = [BG1, BG2, BG3, BG4, BG5];
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
};

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const initializeStorage = (storageKey: string, defaultValue: any) => {
  localStorage.setItem(storageKey, encrypt(JSON.stringify(defaultValue)));
  return defaultValue;
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
    const parsedData = JSON.parse(decrypt(data));
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
  const initializeStorage = (key: string, initialValue: any) => {
    const encryptedData = encrypt(JSON.stringify(initialValue));
    localStorage.setItem(key, encryptedData);
    return initialValue;
  };
  if (data === null) {
    return initializeStorage(storageKey, []);
  }
  try {
    return JSON.parse(decrypt(data));
  } catch (err) {
    return initializeStorage(storageKey, []);
  }
};

const addItemToStorage = (storageKey: string, newItem: any) => {
  const storageData = getStorageData(storageKey);
  storageData.push(newItem);
  const encryptedData = encrypt(JSON.stringify(storageData));
  localStorage.setItem(storageKey, encryptedData);
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
    const encryptedData = encrypt(JSON.stringify(storageData));
    localStorage.setItem(storageKey, encryptedData);
  }
};

const deleteItemFromStorage = (storageKey: string, id: any) => {
  const storageData = getStorageData(storageKey);
  const itemIndex = storageData.findIndex((item: any) => item.id === id);
  if (itemIndex !== -1) {
    storageData.splice(itemIndex, 1);
    const encryptedData = encrypt(JSON.stringify(storageData));
    localStorage.setItem(storageKey, encryptedData);
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
};
