import { loadDb, saveDb } from "./data.js";

let defaultUsers = [
  {
    email: "admin@utfpr.edu.br",
    password: "123456",
  },
];

const getCurrentUser = () => {
  let userInfo = localStorage.getItem("currentUser");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

const userData = loadDb("users");

const session = {
  currentUser: getCurrentUser(),
};

if (!userData || userData.length === 0) {
  saveDb("users", defaultUsers);
}

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
    saveDb("users", userData);
  },
  remove: (email) => {
    // remove user from userData in place
    let index = userData.findIndex((user) => user.email === email);
    if (index !== -1) {
      userData.splice(index, 1);
      saveDb("users", userData);
    }
  },
  update: (user) => {
    // update user in userData in place
    let index = userData.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      userData[index] = user;
      saveDb("users", userData);
    }
  },

  getCurrentUser: () => {
    return session.currentUser;
  },

  saveCurrentUser(user) {
    session.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  checkLogin: (email, password) => {
    let user = userData.find((user) => user.email === email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  },

  checkUserLoggedIn: () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      let container = document.getElementById("app");
      if (container) {
        container.classList.remove("invisible");
      }
    } else {
      window.location.href = "/admin/login.html";
    }
  },
};
