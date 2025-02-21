import { loadDb, saveDb } from "./data.js";

const sampleBookings = [
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

const names = ["joao", "maria", "jose", "ana", "pedro", "lucas"];
const lastNames = ["silva", "souza", "santos", "oliveira", "costa", "pereira"];
const userDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const defaultBookings = [];
// generate 100 random bookings for the past 30 days
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

for (let i = 0; i < 20; i++) {
  const checkIn = new Date(
    thirtyDaysAgo.getTime() +
      Math.random() * (today.getTime() - thirtyDaysAgo.getTime()),
  );
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 1);

  let domain = userDomains[Math.floor(Math.random() * userDomains.length)];
  let user = `${names[Math.floor(Math.random() * names.length)]}`;
  user += `${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

  const booking = {
    id: i + 1,
    roomId: rooms[Math.floor(Math.random() * rooms.length)],
    userEmail: `${user}@${domain}`,
    checkIn: checkIn.toISOString().split("T")[0],
    checkOut: checkOut.toISOString().split("T")[0],
    confirmed: true,
  };

  defaultBookings.push(booking);
}

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
