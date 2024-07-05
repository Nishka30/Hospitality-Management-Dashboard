import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for edit dialog
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null); // State to hold selected staff member for editing

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff');
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleAddNewStaff = () => {
    navigate('/onboarding');
  };

  const handleDeleteStaff = () => {
    if (selectionModel.length === 0) {
      alert("Please select staff members to delete.");
      return;
    }
    setOpenDeleteDialog(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      await Promise.all(
        selectionModel.map(id => axios.delete(`http://localhost:5000/api/staff/${id}`))
      );
      setStaffData(staffData.filter(staff => !selectionModel.includes(staff._id)));
      setSelectionModel([]);
      setOpenDeleteDialog(false);
      alert("Staff profiles deleted successfully");
    } catch (error) {
      console.error('Error deleting staff profile:', error);
      alert('Error deleting staff profile');
    }
  };

  const handleEditStaff = () => {
    if (selectionModel.length === 1) {
      const selectedStaffMember = staffData.find(staff => staff._id === selectionModel[0]);
      setSelectedStaff(selectedStaffMember);
      setOpenEditDialog(true);
    } else {
      alert("Please select one staff member to edit.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedStaff = await axios.put(`http://localhost:5000/api/staff/${selectedStaff._id}`, selectedStaff);
      // Update staffData with updated staff
      setStaffData(staffData.map(staff => (staff._id === updatedStaff.data._id ? updatedStaff.data : staff)));
      setOpenEditDialog(false);
      alert("Staff profile updated successfully");
    } catch (error) {
      console.error('Error updating staff profile:', error);
      alert('Error updating staff profile');
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const columns = [
    { field: "idNumber", headerName: "ID" },
    { field: "idType", headerName: "ID Type" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    { field: "staffProgress", headerName: "Staff Progress" },
    {
      field: "staffAccess",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { staffAccess } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              staffAccess === "Admin"
                ? colors.greenAccent[600]
                : staffAccess === "Manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {staffAccess === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {staffAccess === "Manager" && <SecurityOutlinedIcon />}
            {staffAccess === "Staff" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {staffAccess}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box display="inline" margin="10px" my="20px">
      <Button variant="contained" color="primary" onClick={handleAddNewStaff} sx={{ marginRight: '10px' }}>
    Add New Staff
  </Button>
  <Button variant="contained" color="secondary" onClick={handleDeleteStaff} sx={{ margin: '0 10px' }}>
    Delete Staff
  </Button>
  <Button variant="contained" color="primary" onClick={handleEditStaff} sx={{ marginLeft: '10px' }}>
    Edit Staff
  </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={staffData.map((staff) => ({ id: staff._id, ...staff }))}
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
        />
      </Box>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected staff members?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Staff Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
      >
        <DialogTitle>Edit Staff</DialogTitle>
        <DialogContent>
          {selectedStaff && (
            <>
              <TextField
                label="First Name"
                fullWidth
                value={selectedStaff.firstName}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, firstName: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Last Name"
                fullWidth
                value={selectedStaff.lastName}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, lastName: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Age"
                fullWidth
                type="number"
                value={selectedStaff.age}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, age: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Contact Number"
                fullWidth
                value={selectedStaff.contact}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, contact: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Email"
                fullWidth
                value={selectedStaff.email}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, email: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Access Level"
                fullWidth
                value={selectedStaff.staffAccess}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, staffAccess: e.target.value })}
                margin="normal"
              />
              <TextField
                label="ID Type"
                fullWidth
                value={selectedStaff.idType}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, idType: e.target.value })}
                margin="normal"
              />
              <TextField
                label="ID Number"
                fullWidth
                value={selectedStaff.idNumber}
                onChange={(e) =>                setSelectedStaff({ ...selectedStaff, idNumber: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Password"
                fullWidth
                value={selectedStaff.password}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, password: e.target.value })}
                margin="normal"
              />
              <TextField
                label="Staff Progress"
                fullWidth
                value={selectedStaff.staffProgress}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, staffProgress: e.target.value })}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;

