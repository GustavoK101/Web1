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

// update all dates to a random date between today and 7 days ago

const today = new Date();
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);

defaultBookings.forEach((booking) => {
  const randomDate = new Date(
    sevenDaysAgo.getTime() +
      Math.random() * (today.getTime() - sevenDaysAgo.getTime()),
  );
  booking.checkIn = randomDate.toISOString().split("T")[0];
  booking.checkOut = randomDate.toISOString().split("T")[0];
});

const bookingData = loadDb("bookings");

if (!bookingData || bookingData.length === 0) {
  saveDb("bookings", defaultBookings);
}

const saveBookings = () => {
  saveDb("bookings", bookingData);
};

export default {
  listAll: () => {
    // ordered by checkIn date desc
    return bookingData
      .sort((a, b) => {
        return new Date(b.checkIn) - new Date(a.checkIn);
      })
      .map((booking) => ({ ...booking }));
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
