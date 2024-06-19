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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import { getData ,deleteData} from "../../../Services/services";
import moment from 'moment';
const DataTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [refresh,setRefresh] = useState(false);

  // useEffect(() => {
  //   // const storedData = JSON.parse(localStorage.getItem("formData")) || [];
  //   const x = getData()
  //   x.then(res=>{setFilteredData(res?.data)
  //        setData(x?.data)})
  //       // setData(storedData);
  //       // setFilteredData(storedData);
  // }, []);

  useEffect(() => {
    const fetchData = async () =>{
      const res = await getData();
      setFilteredData(res?.data);
      setData(res?.data);
    };
    fetchData();
  }, [refresh]);


  const handleView = (row) => {
    setSelectedRow(row);
    setOpenPopup(true);
  };

  const handleEdit = (row) => {
    navigate("/Assignment1", { state: row });
    console.log(row);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedRow(null);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteIndex(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  // const handleDelete = () => {
  //   console.log(deleteIndex);
  //   if (deleteIndex !== null) {
  //     const indexToDelete = data.findIndex((item) => item.ID == deleteIndex);
  //     console.log(indexToDelete, "indexToDelete");

  //     if (indexToDelete !== -1) {
  //       const newData = data.filter((item, index) => index !== indexToDelete);
  //       setData(newData);
  //       setFilteredData(newData);
  //       localStorage.setItem("formData", JSON.stringify(newData));
  //       handleCloseDeleteDialog();
  //     }
  //   }
  // };

  const handleDelete = async () => {
    if (deleteIndex !== null) {
      console.log(deleteIndex);
      try {
        
        await deleteData(deleteIndex);
  
        // Filter out the deleted item from the local state
        // const newData = data.filter((item) => item._id !== deleteIndex);
        // setData(newData);
        // setFilteredData(newData);
        setRefresh(!refresh);
  
        // Close the delete dialog
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting data:", error);
        // Handle error if needed (e.g., show a notification)
      }
    }
  };
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (row) =>
        // row.firstName?.toLowerCase().includes(term) ||
        // row.middleName?.toLowerCase().includes(term) ||
        // row.lastName?.toLowerCase().includes(term) ||
        // row.email?.toLowerCase().includes(term)
          row.First?.toLowerCase().includes(term) ||
          row.Middle?.toLowerCase().includes(term) ||
          row.Last?.toLowerCase().includes(term) ||
          row.Email?.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };
 
  const columnKeyMap = {
    firstName: "First",
    middleName: "Middle",
    lastName: "Last",
    email: "Email",
    contactNo: "Contact",
    gender: "Gender",
    state: "State",
    dob: "Date",
  }; 

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    const dataKey = columnKeyMap[sortConfig.key] || sortConfig.key;
    if (dataKey === "Date") {
      const dateA = moment(a.Date, "YYYY-MM-DD").toDate();
      const dateB = moment(b.Date, "YYYY-MM-DD").toDate();
      if (dateA < dateB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    } 
    else {
      if (a[dataKey] < b[dataKey]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[dataKey] > b[dataKey]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

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
              {[
                "firstName",
                "middleName",
                "lastName",
                "email",
                "contactNo",
                "gender",
                "state",
                "dob",
              ].map((column) => (
                <TableCell key={column} onClick={() => handleSort(column)}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortConfig.key === column &&
                    (sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    ))}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.middleName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.dob}</TableCell> */}
                  <TableCell>{row.First}</TableCell>
                  <TableCell>{row.Middle}</TableCell>
                  <TableCell>{row.Last}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                  <TableCell>{row.Contact}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.State}</TableCell>
                  <TableCell>{moment(row.Date).format("DD-MM-YYYY")}</TableCell>
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
                      onClick={() => handleOpenDeleteDialog(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="h6" color="error">
                    No data found
                  </Typography>
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
              {/* <Typography>First Name: {selectedRow.firstName}</Typography>
              <Typography>Middle Name: {selectedRow.middleName}</Typography>
              <Typography>Last Name: {selectedRow.lastName}</Typography>
              <Typography>Email: {selectedRow.email}</Typography>
              <Typography>Contact No.: {selectedRow.contactNo}</Typography>
              <Typography>Gender: {selectedRow.gender}</Typography>
              <Typography>State: {selectedRow.state}</Typography>
              <Typography>Date of Birth: {selectedRow.dob}</Typography> */}
              <Typography>First Name: {selectedRow.First}</Typography>
              <Typography>Middle Name: {selectedRow.Middle}</Typography>
              <Typography>Last Name: {selectedRow.Last}</Typography>
              <Typography>Email: {selectedRow.Email}</Typography>
              <Typography>Contact No.: {selectedRow.Contact}</Typography>
              <Typography>Gender: {selectedRow.Gender}</Typography>
              <Typography>State: {selectedRow.State}</Typography>
              <Typography>Date of Birth: {moment(selectedRow.Date).format("DD-MM-YYYY")}</Typography>
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
