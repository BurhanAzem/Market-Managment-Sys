import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const SearchBar: React.FC<{ 
  searchPlaceholder: string; 
  productName: string; 
  setProductName: (newValue: string) => void; 
}> = ({ searchPlaceholder, productName, setProductName }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '0px 2px', display: 'flex', alignItems: 'center', width: 350, borderRadius: '2px', border: 'solid 0.5px gray' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '12px' }}
        placeholder={searchPlaceholder}
        inputProps={{ 'aria-label': searchPlaceholder }}
        value={productName}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '4px' }} aria-label="search">
        <SearchIcon sx={{ fontSize: '18px' }} />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;