import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    // Handle form submission logic here
  };

  // Validation schema using yup
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    mobile: yup
      .string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be exactly 10 digits"
      )
      .required("Required"),
    checkinDate: yup.date().required("Required"),
    checkoutDate: yup.date().required("Required"),
    roomNumber: yup.string().required("Required"),
    mode: yup.string().required("Required"),
    idType: yup.string().required("Required"),
    idValidationStatus: yup.string().required("Required"),
    checkinStatus: yup.string().required("Required"),
    roomAlloted: yup.string().required("Required"),
    omsCheckin: yup.date().required("Required"),
    omsCheckout: yup.date().required("Required"),
    idNumber: yup.string().required("Required"),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    checkinDate: "",
    checkoutDate: "",
    roomNumber: "",
    mode: "",
    idType: "",
    idValidationStatus: "",
    checkinStatus: "",
    roomAlloted: "",
    omsCheckin: "",
    omsCheckout: "",
    idNumber: "",
  };

  return (
    <Box m="20px">
      <Header title="NEW CUSTOMER CHECK-IN" subtitle="Enter Customer Details" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobile}
                name="mobile"
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Check-in Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkinDate}
                name="checkinDate"
                error={!!touched.checkinDate && !!errors.checkinDate}
                helperText={touched.checkinDate && errors.checkinDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Checkout Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkoutDate}
                name="checkoutDate"
                error={!!touched.checkoutDate && !!errors.checkoutDate}
                helperText={touched.checkoutDate && errors.checkoutDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomNumber}
                name="roomNumber"
                error={!!touched.roomNumber && !!errors.roomNumber}
                helperText={touched.roomNumber && errors.roomNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Mode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mode}
                name="mode"
                error={!!touched.mode && !!errors.mode}
                helperText={touched.mode && errors.mode}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 4" }}
              >
                <option value="">Select Mode</option>
                <option value="QR">QR</option>
                <option value="Web">Web</option>
                <option value="Direct">Direct</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idType}
                name="idType"
                error={!!touched.idType && !!errors.idType}
                helperText={touched.idType && errors.idType}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idNumber}
                name="idNumber"
                error={!!touched.idNumber && !!errors.idNumber}
                helperText={touched.idNumber && errors.idNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="ID Validation Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idValidationStatus}
                name="idValidationStatus"
                error={!!touched.idValidationStatus && !!errors.idValidationStatus}
                helperText={touched.idValidationStatus && errors.idValidationStatus}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 4" }}
              >
                <option value="">Select Validation Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                select
                label="Checkin Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkinStatus}
                name="checkinStatus"
                error={!!touched.checkinStatus && !!errors.checkinStatus}
                helperText={touched.checkinStatus && errors.checkinStatus}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 4" }}
              >
                <option value="">Select Checkin Status</option>
                <option value="Check-in Link Clicked">Check-in Link Clicked</option>
                <option value="Form submitted">Form submitted</option>
                <option value="Ready for Check-in">Ready for Check-in</option>
                <option value="PMS Checked-in">PMS Checked-in</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Room Alloted"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomAlloted}
                name="roomAlloted"
                error={!!touched.roomAlloted && !!errors.roomAlloted}
                helperText={touched.roomAlloted && errors.roomAlloted}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="OMS Check-in"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.omsCheckin}
                name="omsCheckin"
                error={!!touched.omsCheckin && !!errors.omsCheckin}
                helperText={touched.omsCheckin && errors.omsCheckin}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="OMS Checkout"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.omsCheckout}
                name="omsCheckout"
                error={!!touched.omsCheckout && !!errors.omsCheckout}
                helperText={touched.omsCheckout && errors.omsCheckout}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Customer
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
