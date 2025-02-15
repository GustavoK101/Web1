import { loadDb, saveDb } from "./data.js";

let defaultUsers = [
  {
    email: "admin@utfpr.edu.br",
    password: "123456",
  },
];

const userData = loadDb("users");

if (!userData || userData.length === 0) {
  saveDb("users", defaultUsers);
}

const saveUsers = () => {
  saveDb("users", userData);
};

export default {
  listAll: () => {
    return userData.map((user) => ({ ...user }));
  },
  find: (email) => {
    let user = userData.find((user) => user.email === email);

    if (user) {
      user = { ...user };
    }

    return user;
  },
  save: (user) => {
    userData.push(user);
    console.log(userData);
    saveUsers();
  },
  remove: (email) => {
    // remove user from userData in place
    let index = userData.findIndex((user) => user.email === email);
    if (index !== -1) {
      userData.splice(index, 1);
      saveUsers();
    }
  },
  update: (user) => {
    // update user in userData in place
    let index = userData.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      userData[index] = user;
      saveUsers();
    }
  },

  checkLogin: (email, password) => {
    let user = userData.find((user) => user.email === email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  },
};
