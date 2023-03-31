import { useState, useEffect } from "react";
import {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../connect/api";

const useCRUD = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getAllItems();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddClick = () => {
    setCurrentItem({ id: null, name: "", description: "" });
    setModalOpen(true);
  };

  const handleSaveClick = async (item) => {
    try {
      setIsLoading(true);
      if (item.id) {
        const updatedItem = await updateItem(item);
        const updatedItems = items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
        setItems(updatedItems);
      } else {
        await addItem(item);
      }
      setModalOpen(false);
      setIsLoading(false);
      setSnackbarMessage("Item added successfully.");
      setShowSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const item = await getItemById(id);
      setCurrentItem(item);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async () => {
    if (currentItem && currentItem.id) {
      try {
        setIsLoading(true);
        await deleteItem(currentItem.id);
        const updatedItems = items.filter((item) => item.id !== currentItem.id);
        setItems(updatedItems);
        setIsLoading(false);
        setSnackbarMessage("Item deleted successfully.");
        setShowSnackbar(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return {
    items,
    isLoading,
    showSnackbar,
    snackbarMessage,
    modalOpen,
    currentItem,
    handleSnackbarClose,
    setModalOpen,
    setCurrentItem,
    handleAddClick,
    handleSaveClick,
    handleEditClick,
    handleDeleteClick,
  };
};

export default useCRUD;
