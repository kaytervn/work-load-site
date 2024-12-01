import { GORGEOUS_SWAGGER } from "../types/pageConfig";
import {
  addItemToStorage,
  decrypt,
  findStorageItemBy,
  generateUniqueId,
  getRandomColor,
} from "../types/utils";

const getNewCollectionName = (name: string): string => {
  let newName = name;
  let count = 1;
  while (findStorageItemBy(GORGEOUS_SWAGGER.name, "collectionName", newName)) {
    newName = `${name} (${count})`;
    count++;
  }
  return newName;
};

const mapCollectionRequests = (requests: any) => {
  return requests.map(
    ({
      name,
      method,
      body,
      path,
      preScriptIsChecked,
      preScript,
      postScriptIsChecked,
      postScript,
      authKind,
    }: any) => ({
      name,
      method,
      ...(["post", "put"].includes(method) && { body }),
      path,
      ...(preScriptIsChecked && { preScript }),
      ...(postScriptIsChecked && { postScript }),
      authKind: authKind || "0",
    })
  );
};

const importCollectionData = (data: string) => {
  try {
    const decryptedData = JSON.parse(decrypt(data));
    if (!Array.isArray(decryptedData)) {
      return 0;
    }
    for (const item of decryptedData) {
      addItemToStorage(GORGEOUS_SWAGGER.name, {
        ...item,
        collectionName: getNewCollectionName(item.collectionName),
        id: generateUniqueId(),
        color: getRandomColor(),
        createdAt: new Date(),
      });
    }
    return decryptedData.length;
  } catch (ignored) {
    return 0;
  }
};

export { mapCollectionRequests, importCollectionData, getNewCollectionName };
