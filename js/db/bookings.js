import { loadDb, saveDb } from "./data.js";

const defaultBookings = [
  {
    roomId: 1,
    userEmail: "usuario@email.com",
    date: "2021-10-01",
    startTime: "08:00",
    endTime: "09:00",
  },
];

const roomData = loadDb("bookings");

if (!roomData || roomData.length === 0) {
  saveDb("bookings", defaultBookings);
}

const saveBookings = () => {
  saveDb("bookings", roomData);
};

export default {
  listAll: () => {
    return roomData.map((room) => ({ ...room }));
  },
  find: (roomId, date, startTime) => {
    let booking = roomData.find(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        booking.startTime === startTime,
    );
    if (booking) {
      booking = { ...booking };
    }
    return booking;
  },
  save: (booking) => {
    roomData.push(booking);
    saveBookings();
  },
  remove: (roomId, date, startTime) => {
    let index = roomData.findIndex(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        booking.startTime === startTime,
    );
    if (index !== -1) {
      roomData.splice(index, 1);
      saveBookings();
    }
  },
  update: (booking) => {
    let index = roomData.findIndex(
      (b) =>
        b.roomId === booking.roomId &&
        b.date === booking.date &&
        b.startTime === booking.startTime,
    );

    if (index !== -1) {
      roomData[index] = booking;
      saveBookings();
    }
  },
};
