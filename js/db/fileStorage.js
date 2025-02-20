function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fileStorage", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("fileStorage")) {
        db.createObjectStore("fileStorage"); // key-value storage
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function saveFile(key, blob) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["fileStorage"], "readwrite");
    const store = transaction.objectStore("fileStorage");
    const request = store.put(blob, key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function loadFile(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["fileStorage"], "readonly");
    const store = transaction.objectStore("fileStorage");
    const request = store.get(key);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function deleteFile(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["fileStorage"], "readwrite");
    const store = transaction.objectStore("fileStorage");
    const request = store.delete(key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function deleteDb() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase("fileStorage");

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export default {
  save: saveFile,
  load: loadFile,
  delete: deleteFile,
  deleteDb,
};
