import React from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();

  const handleFormSubmit = (values) => {
    console.log(values);
    // Replace with actual submission logic
  };

  return (
    <Box m="20px">
      <Header title="ADD NEW STAFF" subtitle="Create a staff profile" />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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

              {/* Staff Access Type */}
              <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 4' }}>
                <InputLabel id="staff-access-label">Staff Access Type</InputLabel>
                <Select
                  labelId="staff-access-label"
                  id="staff-access"
                  value={values.staffAccess}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="staffAccess"
                  error={!!touched.staffAccess && !!errors.staffAccess}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>

              {/* Staff Progress */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Staff Progress (Trained / Still in Progress)"
                name="staffProgress"
                value={values.staffProgress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.staffProgress && !!errors.staffProgress}
                helperText={touched.staffProgress && errors.staffProgress}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Staff
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  contact: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  age: yup.number().required('Required'),
  password: yup.string().required('Required'),
  staffAccess: yup.string().required('Required'),
  staffProgress: yup.string().required('Required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  age: '',
  password: '',
  staffAccess: '',
  staffProgress: '',
};

export default Form;
