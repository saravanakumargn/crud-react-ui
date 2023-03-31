// Define an array of sample items
const DUMMY_DATA = [
  { id: 1, name: "Apple", description: "A delicious fruit." },
  { id: 2, name: "Banana", description: "A yellow fruit that monkeys love." },
  {
    id: 3,
    name: "Grape",
    description: "A small fruit that grows in clusters.",
  },
  { id: 4, name: "Orange", description: "A citrus fruit with a tough skin." },
  {
    id: 5,
    name: "Pineapple",
    description: "A tropical fruit with spiky skin and sweet flesh.",
  },
];

// Function to retrieve all items
const getAllItems = async () => {
  // Return a new promise that resolves to the DUMMY_DATA array after a 1-second delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_DATA);
    }, 1000);
  });
};

const getItemById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = DUMMY_DATA.find((item) => item.id === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error("Item not found"));
      }
    }, 1000);
  });
};

// Function to add a new item
const addItem = async (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newId = DUMMY_DATA.length + 1;
      const newItem = { ...item, id: newId };
      DUMMY_DATA.push(newItem);
      resolve(newItem);
    }, 1000);
  });
};

const updateItem = async (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = DUMMY_DATA.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        DUMMY_DATA[index] = item;
        resolve(item);
      } else {
        reject(new Error("Item not found"));
      }
    }, 1000);
  });
};

const deleteItem = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = DUMMY_DATA.findIndex((i) => i.id === id);
      if (index !== -1) {
        DUMMY_DATA.splice(index, 1);
        resolve(id);
      } else {
        reject(new Error("Item not found"));
      }
    }, 1000);
  });
};

export {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};

