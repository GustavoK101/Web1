import { loadDb, saveDb } from "./data.js";

const defaultRooms = [
  {
    id: 1,
    name: "Suíte Launch Site",
    description:
      "Suíte premium com vista panorâmica inspirada no centro tecnológico do jogo, perfeita para estadias prolongadas",
    capacity: 2,
    amenities: [
      "Ar-condicionado",
      "TV tela plana 55'",
      "Minibar premium",
      "Room service 24h",
    ],
    price: 250, // in reals
  },
  {
    id: 2,
    name: "Sala de Reuniões Bandit Camp",
    description:
      "Espaço rústico com decoração industrial, ideal para negociações intensas e estratégias ousadas",
    capacity: 8,
    amenities: [
      "Projetor 4K",
      "Wi-Fi ultrarrápido",
      "Flip chart",
      "Coffee break executivo",
    ],
    price: 150,
  },
  {
    id: 3,
    name: "Quarto Outpost",
    description:
      "Quarto seguro com design minimalista e proteção reforçada, inspirado no posto comercial do jogo",
    capacity: 4,
    amenities: [
      "Cofre digital",
      "Banheiro privativo",
      "Frigobar",
      "Serviço de lavanderia",
    ],
    price: 100,
  },
  {
    id: 4,
    name: "Suíte Harbor",
    description:
      "Acomodação náutica com varanda privativa e sons do mar, remetendo aos doces de ferrugem",
    capacity: 3,
    amenities: [
      "Varanda mobiliada",
      "Banheira de hidromassagem",
      "Kit chá/café premium",
      "Toalhas de algodão egípcio",
    ],
    price: 180,
  },
  {
    id: 5,
    name: "Sala de Eventos Airfield",
    description:
      "Amplo espaço aeronáutico adaptado para convenções e workshops corporativos",
    capacity: 20,
    amenities: [
      "Sistema de som 360°",
      "Palco modular",
      "16 Mesas retráteis",
      "Iluminação profissional",
    ],
    price: 300,
  },
  {
    id: 6,
    name: "Quarto Mining Outpost",
    description:
      "Acomodação temática para grupos, inspirada nas estações de mineração remotas",
    capacity: 6,
    amenities: [
      "Beliches premium",
      "Banheiro compartilhado",
      "Área de churrasco",
      "Estacionamento privativo",
    ],
    price: 120,
  },
  {
    id: 7,
    name: "Suíte Power Plant",
    description:
      "Suíte industrial com elementos steampunk e energia sustentável",
    capacity: 2,
    amenities: [
      "Recarga para veículos elétricos",
      "Vista para usina",
      "Automação residencial",
      "Escritório integrado",
    ],
    price: 200,
  },
  {
    id: 8,
    name: "Sala de Treinamento Water Treatment",
    description:
      "Espaço modular para capacitações com tecnologia de purificação ambiental",
    capacity: 12,
    amenities: [
      "Ar purificado",
      "Lousa digital interativa",
      "Kits de treinamento",
      "Água mineral ilimitada",
    ],
    price: 250,
  },
  {
    id: 9,
    name: "Quarto Train Yard",
    description:
      "Cabine premium adaptada com elementos ferroviários históricos",
    capacity: 3,
    amenities: [
      "Cama extralarga",
      "Netflix Premium",
      "Isolamento acústico",
      "Máquina de espresso",
    ],
    price: 150,
  },
  {
    id: 10,
    name: "Suíte Oxum's Gas Station",
    description:
      "Suíte temática com elementos retro-futuristas e serviço premium 24/7",
    capacity: 2,
    amenities: [
      "Serviço de concierge",
      "Jardim vertical",
      "Despertador personalizado",
      "Robô aspirador",
    ],
    price: 220,
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
    const maxId = Math.max(...roomData.map((r) => r.id));
    room.id = maxId + 1;
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
