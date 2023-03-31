import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function AddEditModal({
  open,
  handleClose,
  handleSave,
  itemToEdit,
}) {
  const [name, setName] = useState(itemToEdit ? itemToEdit.name : "");
  const [description, setDescription] = useState(
    itemToEdit ? itemToEdit.description : ""
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setName(itemToEdit ? itemToEdit.name : "");
    setDescription(itemToEdit ? itemToEdit.description : "");
  }, [itemToEdit]);

  useEffect(() => {
    setError(false);
  }, [open]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setError(true);
      return;
    }
    setError(false);
    const item = { name, description };
    if (itemToEdit) {
      item.id = itemToEdit.id;
    }
    handleSave(item);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{itemToEdit ? "Edit" : "Add"} Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            margin="normal"
            value={name}
            error={error}
            helperText={error ? "Name is required" : " "}
            onChange={handleNameChange}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={handleDescriptionChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit} variant="contained">
          {itemToEdit ? "Save Changes" : "Add Item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
