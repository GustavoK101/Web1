const loadDataFromDisk = () => {
  let users = [
    {
      email: "admin@utfpr.edu.br",
      password: "123456",
    },
  ];

  let rooms = [
    {
      id: 1,
      name: "Sala 1",
      capacity: 10,
      resources: ["Projetor", "Computador"],
    },
    {
      id: 2,
      name: "Sala 2",
      capacity: 10,
      resources: ["Projetor", "Computador"],
    },
    {
      id: 3,
      name: "Sala 3",
      capacity: 10,
      resources: ["Projetor", "Computador"],
    },
  ];

  const json = localStorage.getItem("db");

  if (!json) {
    localStorage.setItem(
      "db",
      JSON.stringify({
        users,
        rooms,
      }),
    );
  }
  return JSON.parse(localStorage.getItem("db"));
};

const saveDataToDisk = (data) => {
  localStorage.setItem("db", JSON.stringify(data));
};

const allData = loadDataFromDisk();

const listAllRooms = () => {
  return allData.rooms.map((room) => ({ ...room }));
};
const listAllUsers = () => {
  return allData.users.map((user) => ({ ...user }));
};

const findUserByEmail = (email) => {
  let user = listAllUsers().find((user) => user.email === email);
  if (user) {
    user = { ...user };
  }
  return user;
};

const findRoomById = (id) => {
  let room = listAllRooms().find((room) => room.id === id);
  if (room) {
    room = { ...room };
  }
  return room;
};
const saveRoom = (room) => {
  allData.rooms.push(room);
  saveDataToDisk(allData);
};

const saveUser = (user) => {
  allData.users.push(user);
  saveDataToDisk(allData);
};

const removeRoom = (id) => {
  allData.rooms = allData.rooms.filter((room) => room.id !== id);
  saveDataToDisk(allData);
};

const removeUser = (email) => {
  allData.users = allData.users.filter((user) => user.email !== email);
  saveDataToDisk(allData);
};

const updateRoom = (room) => {
  allData.rooms = allData.rooms.map((r) => (r.id === room.id ? room : r));
  saveDataToDisk(allData);
};

const updateUser = (user) => {
  allData.users = allData.users.map((u) => (u.email === user.email ? user : u));
  saveDataToDisk(allData);
};

const rooms = {
  listAll: listAllRooms,
  find: findRoomById,
  save: saveRoom,
  remove: removeRoom,
};

const users = {
  listAll: listAllUsers,
  find: findUserByEmail,
  save: saveUser,
  remove: removeUser,
  update: updateUser,
};

export default { rooms, users };
