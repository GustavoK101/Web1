const loadDb = (name) => {
  let json = localStorage.getItem(name);
  if (!json) {
    return [];
  }
  return JSON.parse(localStorage.getItem(name));
};

const saveDb = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export { loadDb, saveDb };
