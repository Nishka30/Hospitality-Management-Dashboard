import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchAuditData, generateAuditReport } from '../../services/auditService';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  generateButton: {
    marginTop: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
}));

const NightAudit = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchAuditData(date);
      setAuditData(data);
      setLoading(false);
    };

    getData();
  }, [date]);

  const handleGenerateReport = async () => {
    setLoading(true);
    await generateAuditReport(date);
    setLoading(false);
    alert('Audit report generated successfully!');
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Night Audit
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.generateButton}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Transactions</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditData.map((row) => (
                <TableRow key={row.date}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.transactions}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default NightAudit;
