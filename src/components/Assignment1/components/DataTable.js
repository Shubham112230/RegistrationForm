import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
    setFilteredData(storedData);
  }, []);

  const handleView = (row) => {
    setSelectedRow(row);
    setOpenPopup(true);
  };

  const handleEdit = (row) => {
    navigate("/Assignment1", { state: row });
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedRow(null);
  };

  const handleOpenDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const newData = [...data];
      newData.splice(deleteIndex, 1);
      setData(newData);
      setFilteredData(newData);
      localStorage.setItem("formData", JSON.stringify(newData));
      handleCloseDeleteDialog();
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (row) =>
        row.firstName.toLowerCase().includes(term) ||
        row.middleName.toLowerCase().includes(term) ||
        row.lastName.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">
        Submitted Data
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/Assignment1")}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
      <TextField
        variant="outlined"
        placeholder="Search by First Name, Middle Name, Last Name or Email"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.middleName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleView(row)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenDeleteDialog(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <h1>No data found</h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>View Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <Typography>First Name: {selectedRow.firstName}</Typography>
              <Typography>Middle Name: {selectedRow.middleName}</Typography>
              <Typography>Last Name: {selectedRow.lastName}</Typography>
              <Typography>Email: {selectedRow.email}</Typography>
              <Typography>Contact No.: {selectedRow.contactNo}</Typography>
              <Typography>Gender: {selectedRow.gender}</Typography>
              <Typography>State: {selectedRow.state}</Typography>
              <Typography>Date of Birth: {selectedRow.dob}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DataTable;
