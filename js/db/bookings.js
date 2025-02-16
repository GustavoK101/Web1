import { loadDb, saveDb } from "./data.js";

const defaultBookings = [
  {
    id: 1,
    roomId: 1,
    userEmail: "usuario@email.com",
    checkIn: "2021-10-01",
    checkOut: "2021-10-01",
    confirmed: true,
  },
  {
    id: 2,
    roomId: 2,
    userEmail: "usuario2@email.com",
    checkIn: "2021-10-01",
    checkOut: "2021-10-01",
    confirmed: true,
  },
  {
    id: 3,
    roomId: 3,
    userEmail: "usuario3@email.com",
    checkIn: "2021-10-01",
    checkOut: "2021-10-01",
    confirmed: true,
  },
  {
    id: 4,
    roomId: 3,
    userEmail: "usuario4@email.com",
    checkIn: "2021-10-01",
    checkOut: "2021-10-01",
    confirmed: false,
  },
];

const bookingData = loadDb("bookings");

if (!bookingData || bookingData.length === 0) {
  saveDb("bookings", defaultBookings);
}

const saveBookings = () => {
  saveDb("bookings", bookingData);
};

export default {
  listAll: () => {
    return bookingData.map((room) => ({ ...room }));
  },
  find: (roomId, date, startTime) => {
    let booking = bookingData.find(
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
    bookingData.push(booking);
    saveBookings();
  },
  remove: (roomId, date, startTime) => {
    let index = bookingData.findIndex(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        booking.startTime === startTime,
    );
    if (index !== -1) {
      bookingData.splice(index, 1);
      saveBookings();
    }
  },
  update: (booking) => {
    let index = bookingData.findIndex(
      (b) =>
        b.roomId === booking.roomId &&
        b.date === booking.date &&
        b.startTime === booking.startTime,
    );

    if (index !== -1) {
      bookingData[index] = booking;
      saveBookings();
    }
  },
  confirmBooking(bookingId) {
    let index = bookingData.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookingData[index].confirmed = true;
      saveBookings();
    }
  },
  revokeConfirmation(bookingId) {
    let index = bookingData.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookingData[index].confirmed = false;
      saveBookings();
    }
  },
};
