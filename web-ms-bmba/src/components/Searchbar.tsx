import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '0px 2px', ml: '15px', display: 'flex', alignItems: 'center', width: 350, borderRadius: '6px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '14px' }}
        placeholder="Search about product"
        inputProps={{ 'aria-label': 'Search about product' }}
      />
      <IconButton type="button" sx={{ p: '4px'}} aria-label="search">
        <SearchIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    </Paper>
  );
}