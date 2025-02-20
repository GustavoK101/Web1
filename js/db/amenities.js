import { loadDb, saveDb } from "./data.js";

const defaultAmenities = [
  "Ar-condicionado",
  "TV tela plana 55'",
  "Minibar premium",
  "Room service 24h",
  "Projetor 4K",
  "Wi-Fi ultrarrápido",
  "Flip chart",
  "Coffee break executivo",
  "Cofre digital",
  "Banheiro privativo",
  "Frigobar",
  "Serviço de lavanderia",
  "Varanda mobiliada",
  "Banheira de hidromassagem",
  "Kit chá/café premium",
  "Toalhas de algodão egípcio",
  "Sistema de som 360°",
  "Palco modular",
  "16 Mesas retráteis",
  "Iluminação profissional",
  "Beliches premium",
  "Banheiro compartilhado",
  "Área de churrasco",
  "Estacionamento privativo",
  "Recarga para veículos elétricos",
  "Vista para usina",
  "Automação residencial",
  "Escritório integrado",
  "Ar purificado",
  "Lousa digital interativa",
  "Kits de treinamento",
  "Água mineral ilimitada",
  "Cama extralarga",
  "Netflix Premium",
  "Isolamento acústico",
  "Máquina de espresso",
  "Serviço de concierge",
  "Jardim vertical",
  "Despertador personalizado",
  "Robô aspirador",
];

const amenitiesData = loadDb("amenities");

if (!amenitiesData || amenitiesData.length === 0) {
  saveDb("amenities", defaultAmenities);
}

const saveAmenities = () => {
  saveDb("amenities", amenitiesData);
};

export default {
  listAll: () => {
    return amenitiesData.sort((a, b) => a.localeCompare(b));
  },

  save: (amenity) => {
    amenitiesData.push(amenity);
    saveAmenities();
  },
  remove: (description) => {
    let index = amenitiesData.findIndex((amenity) => amenity === description);
    if (index !== -1) {
      amenitiesData.splice(index, 1);
      saveAmenities();
    }
  },
  update: (amenity) => {
    let index = amenitiesData.findIndex((a) => a.id === amenity.id);
    if (index !== -1) {
      amenitiesData[index] = amenity;
      saveAmenities();
    }
  },
};
