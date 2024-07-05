import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
  const [staffData, setStaffData] = useState([]);

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
      navigate(`/onboarding/${selectionModel[0]}`);
    } else {
      alert("Please select one staff member to edit.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
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
              staffAccess === "admin"
                ? colors.greenAccent[600]
                : staffAccess === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {staffAccess === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {staffAccess === "manager" && <SecurityOutlinedIcon />}
            {staffAccess === "user" && <LockOpenOutlinedIcon />}
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
      <Box display="flex" justifyContent="space-between" my="20px">
        <Button variant="contained" color="primary" onClick={handleAddNewStaff}>
          Add New Staff
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteStaff}>
          Delete Staff
        </Button>
        <Button variant="contained" color="primary" onClick={handleEditStaff}>
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
    </Box>
  );
};

export default Team;
