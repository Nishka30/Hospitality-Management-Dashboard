import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    table: {
        minWidth: 650,
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const NightAudit = () => {
