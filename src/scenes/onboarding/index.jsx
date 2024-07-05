import React, { useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const { id } = useParams(); // Get staff ID from URL params
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/staff/${id}`, values);
        alert('Staff profile updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/staff', values);
        alert('Staff profile saved successfully');
      }
      navigate('/usermanage');
    } catch (error) {
      console.error('Error saving staff profile:', error);
      alert('Error saving staff profile');
    }
  };

  const fetchStaffData = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
        const staff = response.data;
        setInitialValues(staff);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [id]);

  const [initialValues, setInitialValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    age: '',
    password: '',
    staffAccess: '',
    staffProgress: '',
  });

  return (
    <Box m="20px">
      <Header title={id ? "EDIT STAFF" : "ADD NEW STAFF"} subtitle={id ? "Edit staff profile" : "Create a staff profile"} />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
              <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
                <InputLabel>Access Level</InputLabel>
                <Select
                  name="staffAccess"
                  value={values.staffAccess}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.staffAccess && !!errors.staffAccess}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Staff">Staff</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
                <InputLabel>Progress</InputLabel>
                <Select
                  name="staffProgress"
                  value={values.staffProgress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.staffProgress && !!errors.staffProgress}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Onboarded">Onboarded</MenuItem>
                  <MenuItem value="In Training">In Training</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                {id ? 'Update Staff' : 'Add Staff'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  contact: yup.string().required('Required'),
  age: yup.number().required('Required').positive().integer(),
  password: yup.string().required('Required'),
  staffAccess: yup.string().required('Required'),
  staffProgress: yup.string().required('Required'),
});

export default Form;
