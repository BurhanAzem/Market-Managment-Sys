import { ReactElement, FC } from "react";
import { Box, Button, Grid, Paper, TextField, Typography, styled } from "@mui/material";
import MediaCard from "../home/MediaCard";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@mui/material";
import CustomizedInputBase from "../../components/Searchbar";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode !== 'dark' ? 'whitesmoke' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

const Products: FC = (): ReactElement => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, p: 2 }} >
      <Grid container spacing={2} >
        {/* <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'meal1'} description={'best dishes of restaurant'} imgUrl={''} />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'meal2'} description={'best dishes of restaurant'} imgUrl={'meal2'} />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'meal3'} description={'best dishes of restaurant'} imgUrl={'meal3'} />
        </Grid>
        <Grid item xs={10} sm={6} md={6} lg={3}>
          <MediaCard title={'meal4'} description={'best dishes of restaurant'} imgUrl={'meal4'} />
        </Grid> */}

        <Box display="flex" justifyContent="start" alignItems="center" height="60px" width="100%">
          <CustomizedInputBase />

          <Box display='block' justifyContent='center' alignItems='center' pl={2.25} >
            <Button fullWidth variant="contained" color="primary" size='small'
              sx={{
                backgroundColor: 'primary.main',
                fontSize: { xs: '10pt', sm: '7pt', md: '9pt' },
                borderRadius: '6px',
                textTransform: 'inherit',
                height: '22px',
                fontWeight: '600',
                ":hover": { // Styles applied on hover
                  outlineColor: 'primary.main', // Corrected property nam
                  backgroundColor: theme.palette.action.hover, // Change background color on hover
                  // color: 'primary.main' // Change text color on hover
                }
              }}
            >
              <AddIcon sx={{ fontSize: "16px" }}></AddIcon> Add new product
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};

export default Products;