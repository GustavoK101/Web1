import { loadDb, saveDb } from "./data.js";

const defaultRooms = [
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

const roomData = loadDb("rooms");

if (!roomData || roomData.length === 0) {
  saveDb("rooms", defaultRooms);
}

const saveRooms = () => {
  saveDb("rooms", roomData);
};

export default {
  listAll: () => {
    return roomData.map((room) => ({ ...room }));
  },
  find: (id) => {
    let room = roomData.find((room) => room.id === id);
    if (room) {
      room = { ...room };
    }
    return room;
  },
  save: (room) => {
    roomData.push(room);
    saveRooms();
  },
  remove: (id) => {
    let index = roomData.findIndex((room) => room.id === id);
    if (index !== -1) {
      roomData.splice(index, 1);
      saveRooms();
    }
  },
  update: (room) => {
    let index = roomData.findIndex((r) => r.id === room.id);
    if (index !== -1) {
      roomData[index] = room;
      saveRooms();
    }
  },
};
