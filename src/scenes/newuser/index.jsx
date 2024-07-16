import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/customers`, values)
      .then((response) => {
        alert("Customer profile saved successfully");
      })
      .catch((error) => {
        alert("Error saving customer profile: " + error.message);
      });
  };

  // Validation schema using yup
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Required"),
    checkinDate: yup.date().required("Required"),
    checkoutDate: yup.date().required("Required"),
    roomNumber: yup.string().required("Required"),
    roomType: yup.string().required("Required"),
    checkinTime: yup.string().required("Required"),
    checkoutTime: yup.string().required("Required"),
    mode: yup.string().required("Required"),
    idType: yup.string().required("Required"),
    idValidationStatus: yup.string().required("Required"),
    checkinStatus: yup.string().required("Required"),
    roomAlloted: yup.string().required("Required"),
    omsCheckin: yup.date().required("Required"),
    omsCheckout: yup.date().required("Required"),
    idNumber: yup.string().required("Required"),
    totalGuests: yup
      .number()
      .min(1, "At least 1 guest is required")
      .required("Required"),
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
    roomType: "",
    checkinTime: "",
    checkoutTime: "",
    mode: "",
    idType: "",
    idValidationStatus: "",
    checkinStatus: "",
    roomAlloted: "",
    omsCheckin: "",
    omsCheckout: "",
    idNumber: "",
    totalGuests: "",
  };

  // Simulated room data based on room types
  const roomData = {
    Standard: Array.from({ length: 15 }, (_, i) => (i + 101).toString()),
    Deluxe: Array.from({ length: 15 }, (_, i) => (i + 116).toString()),
    Superior: Array.from({ length: 10 }, (_, i) => (i + 131).toString()),
  };

  return (
    <Box m="20px">
      <Header
        title="NEW CUSTOMER CHECK-IN"
        subtitle="Enter Customer Details"
      />

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
          setFieldValue, // To dynamically update form values
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
                select
                label="Room Type"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("roomNumber", ""); // Reset room number when room type changes
                }}
                value={values.roomType}
                name="roomType"
                error={!!touched.roomType && !!errors.roomType}
                helperText={touched.roomType && errors.roomType}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                <option value="">Select Room Type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Superior">Superior</option>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                select
                label="Room Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomNumber}
                name="roomNumber"
                error={!!touched.roomNumber && !!errors.roomNumber}
                helperText={touched.roomNumber && errors.roomNumber}
                disabled={!values.roomType} // Disable until room type is selected
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                <option value="">Select Room Number</option>
                {roomData[values.roomType]?.map((roomNumber) => (
                  <option key={roomNumber} value={roomNumber}>
                    {roomNumber}
                  </option>
                ))}
              </TextField>

              {/* Other form fields */}
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
                sx={{ gridColumn: "span 3" }}
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
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Check-in Time"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkinTime}
                name="checkinTime"
                error={!!touched.checkinTime && !!errors.checkinTime}
                helperText={touched.checkinTime && errors.checkinTime}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Checkout Time"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkoutTime}
                name="checkoutTime"
                error={!!touched.checkoutTime && !!errors.checkoutTime}
                helperText={touched.checkoutTime && errors.checkoutTime}
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 2" }}
              >
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                select
                label="Check-in Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkinStatus}
                name="checkinStatus"
                error={!!touched.checkinStatus && !!errors.checkinStatus}
                helperText={touched.checkinStatus && errors.checkinStatus}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                <option value="">Select Check-in Status</option>
                <option value="reserved">Reserved</option>
                <option value="checkin pending">Check-in Pending</option>
                <option value="checkin complete">Check-in Complete</option>
                <option value="checkout">Checkout</option>
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
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
              >
                <option value="">Select ID Validation Status</option>
                <option value="Valid">Valid</option>
                <option value="Invalid">Invalid</option>
              </TextField>
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
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                select
                label="Room Alloted"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomAlloted}
                name="roomAlloted"
                error={!!touched.roomAlloted && !!errors.roomAlloted}
                helperText={touched.roomAlloted && errors.roomAlloted}
                SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                <option value="">Select Room Alloted</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Total Guests"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalGuests}
                name="totalGuests"
                error={!!touched.totalGuests && !!errors.totalGuests}
                helperText={touched.totalGuests && errors.totalGuests}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="PMS Check-in"
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
                label="PMS Checkout"
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
              <Button type="submit" color="primary" variant="contained">
                Save Customer Profile
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
