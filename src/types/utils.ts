import * as CryptoJS from "crypto-js";
import { myPublicSecretKey } from "./constant";
import BG1 from "../assets/GIF_01.gif";
import BG2 from "../assets/GIF_02.gif";
import BG3 from "../assets/GIF_03.gif";
import BG4 from "../assets/GIF_04.gif";
import BG5 from "../assets/GIF_05.gif";

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
  const colors = [
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-pink-500",
    "bg-pink-600",
    "bg-pink-700",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-teal-500",
    "bg-teal-600",
    "bg-teal-700",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-lime-500",
    "bg-lime-600",
    "bg-lime-700",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-cyan-700",
    "bg-rose-500",
    "bg-rose-600",
    "bg-rose-700",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const initializeStorage = (storageKey: string, defaultValue: any) => {
  localStorage.setItem(storageKey, encrypt(JSON.stringify(defaultValue)));
  return defaultValue;
};

const getStorageData = (storageKey: string): any => {
  const data = localStorage.getItem(storageKey);
  if (data === null) {
    return initializeStorage(storageKey, []);
  }
  try {
    return JSON.parse(decrypt(data));
  } catch (err) {
    return initializeStorage(storageKey, []);
  }
};

export { getRandomGif, getRandomColor, encrypt, decrypt, getStorageData };
