import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Snackbar,
} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import CloseIcon from "@mui/icons-material/Close";

import Container from "@mui/material/Container";
import { Delete, Edit } from "@mui/icons-material";
import useCRUD from "./hooks/useCRUD";
import AddEditModal from "./components/AddEditModal";
import { useState } from "react";
import ContentContainer from "./components/container/ContentContainer";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";

const App = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const {
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
  } = useCRUD();

  const onDeleteClick = (id) => {
    const itemToDelete = items.find((item) => item.id === id);
    setCurrentItem(itemToDelete);
    setShowDeleteConfirmation(true);
  };

  const onCloseDeleteDialog = () => {
    setShowDeleteConfirmation(false);
  };
  const onDelete = () => {
    setShowDeleteConfirmation(false);
    handleDeleteClick();
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRUD UI
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <ContentContainer
            isLoading={isLoading}
            onAddClick={handleAddClick}
            title="Items"
          >
          <Typography variant="body2" component="div" textAlign={'right'}>
            {items.length} items found
          </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id} {item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(item.id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDeleteClick(item.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ContentContainer>
        </Box>
        <AddEditModal
          open={modalOpen}
          handleSave={handleSaveClick}
          itemToEdit={currentItem}
          handleClose={() => setModalOpen(false)}
        />
        <Snackbar
          open={showSnackbar}
          autoHideDuration={4000}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
        <DeleteConfirmationDialog
          open={showDeleteConfirmation}
          handleClose={onCloseDeleteDialog}
          handleDelete={onDelete}
        />
      </Container>
    </>
  );
};

export default App;
