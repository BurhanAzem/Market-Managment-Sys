import { ReactElement, FC } from "react";
import { Box, Button, Checkbox, CircularProgress, Divider, Grid, Pagination, PaginationItem, Paper, Stack, TextField, Typography, styled } from "@mui/material";
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
import SearchBar from "../../components/SearchBar";
import { RootState } from "../../redux/store/store";
import { RootActions } from "../../redux/actionCreators/actionResultTypes";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actionCreators/productActions";
import { IProduct } from "../../models/product";
import { IProductsRes } from "../../models/productRes";
import ReplayIcon from '@mui/icons-material/Replay';
import { Check, FontDownload, Height, Settings } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const textFieldStyle = {
  width: "250px",
  height: '28px',
  border: 'solid 1px gray',
  borderRadius: '4px'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: '500',
};





const AddProduct: FC = (): ReactElement => {

  const dispatch: ThunkDispatch<RootState, void, RootActions> = useDispatch();
  // const productsRes: IProductsRes | null = useSelector(
  //   (state: RootState) => state.product.productsRes);

  const products: IProduct[] | null = useSelector(
    (state: RootState) => state.product.products);

  const currPageNumber: number = useSelector(
    (state: RootState) => state.product.pageNumber);

  const totalPages: number = useSelector(
    (state: RootState) => state.product.totalPages);

  const isLoading: Boolean | null = useSelector(
    (state: RootState) => state.product.loading);

  const theme = useTheme();
  const [productName, setProductName] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [supplierName, setSupplierName] = React.useState("");
  const [selfCode, setSelfCode] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);

  const [checkedRows, setCheckedRows] = React.useState<number[]>([]);
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const RowToCheckedList = (row: any) => {
    setCheckedRows(prevCheckedRows => {
      // Check if the row's barCode is already present in checkedRows
      const isChecked = prevCheckedRows.includes(row.barCode);

      // Toggle the checked status for the row by adding or removing its barCode
      if (isChecked) {
        // Remove the barCode from checkedRows
        return prevCheckedRows.filter(code => code !== row.barCode);
      } else {
        // Add the barCode to checkedRows
        return [...prevCheckedRows, row.barCode];
      }
    });
  };

  const allRowsToCheckedList = () => {
    setCheckedRows(prevCheckedRows => {
      // Check if the row's barCode is already present in checkedRows
      const isChecked = prevCheckedRows.includes(products[0].barCode);

      // Toggle the checked status for the row by adding or removing its barCode
      if (isChecked) {
        // Remove the barCode from checkedRows
        return prevCheckedRows.filter(
          code => ![...products.map(prod => prod.barCode)].includes(code)
        );
      } else {
        // Add the barCode to checkedRows
        return [...prevCheckedRows, ...products.map(prod => prod.barCode)];
      }
    });
  };


  const query = {
    productName,
    categoryName,
    selfCode,
    supplierName,
    pageNumber,
    pageSize,
  };

  React.useEffect(() => {
    // Dispatch the action with the query object
    dispatch(getProducts(query));

    console.log(products);

  }, [dispatch, productName,
    categoryName,
    selfCode,
    supplierName,
    pageNumber,
    pageSize]); // Include dispatch and query in the dependency array

  // const addItemToCheckedProducts = (product: IProduct) => {
  //   setCheckedProducts(prevCheckedProducts => [...prevCheckedProducts, product]);
  // }


  return (
    <Grid container direction='column' height='auto' width='100%' mt='10px'>
      <Grid item xs={12} sm={6} md={6} ml='0px'
        display='flex' justifyContent='center' flexDirection='column' alignItems='center' height='auto'>
        <Box sx={{ fontSize: { xs: '7pt', sm: '8pt', md: '9pt' }, fontWeight: '600', width: '100%', backgroundColor: '#f7f7f7', mt: '15px' }}
          display="flex" flexDirection="column" justifyContent="start" alignItems="start" width="100%" py='12px' px='12px'>
          Product details
        </Box>
        <Box display='flex' justifyContent='space-around' flexDirection='row' alignItems='center' sx={{ mx: '6px', my: '0px', backgroundColor: 'white', width: '100%' }}>
          <Box sx={{ mx: '6px', my: '0px' }}>
            <Stack>
              <label style={labelStyle}>Product name</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>
          <Box sx={{ mx: '6px', my: '20px' }}>
            <Stack>
              <label style={labelStyle}>BarCode</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>
          <Box sx={{ mx: '6px', my: '20px' }}>
            <Stack>
              <label style={labelStyle}>Description</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>
        </Box>
      </Grid>


      <Grid item xs={12} sm={6} md={6} ml='0px'
        display='flex' justifyContent='center' flexDirection='column' alignItems='center' height='auto'>
        <Box sx={{ fontSize: { xs: '7pt', sm: '8pt', md: '9pt' }, fontWeight: '600', width: '100%', backgroundColor: '#f7f7f7', mt: '15px' }}
          display="flex" flexDirection="column" justifyContent="start" alignItems="start" width="100%" py='12px' px='12px'>
          Price
        </Box>
        <Box display='flex' justifyContent='space-around' flexDirection='row' alignItems='center' sx={{ mx: '6px', my: '0px', backgroundColor: 'white', width: '100%' }}>
          <Box sx={{ mx: '6px', my: '20px' }}>
            <Stack>
              <label style={labelStyle}>currentWholeSalePurchasingPrice</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>

          {/* </Box> */}
          <Box sx={{ mx: '6px', my: '20px' }}>
            <Stack>
              <label style={labelStyle}>currentWholeSalSellingPrice</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>
          <Box sx={{ mx: '6px', my: '20px' }}>
            <Stack>
              <label style={labelStyle}>currentRetailPurchasingPrice</label>
              <input type="text" style={textFieldStyle} value={productName} />
            </Stack>
          </Box>
        </Box>
      </Grid>



      <Grid item xs={12} sm={6} md={6} ml='0px'
        display='flex' justifyContent='center' flexDirection='column' alignItems='center' height='auto'>
        <Box sx={{ fontSize: { xs: '7pt', sm: '8pt', md: '9pt' }, fontWeight: '600', width: '100%', backgroundColor: '#f7f7f7', mt: '15px' }}
          display="flex" flexDirection="column" justifyContent="start" alignItems="start" width="100%" py='12px' px='12px'>
          Select
        </Box>
        <Box display='flex' justifyContent='space-around' flexDirection='row' alignItems='center' sx={{ mx: '6px', my: '0px', backgroundColor: 'white', width: '100%' }}>
          <Box sx={{ mb: '20px', display: 'flex' }}>
            {/* <Stack> */}
            {/* <label style={labelStyle}>Supplier</label> */}
            <FormControl sx={{ minWidth: 250, height: '0px', borderRadius: '2px' }} size="small">
              <InputLabel sx={{ fontSize: '14px' }} id="demo-select-small-label">Supplier</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" color="primary" size='small'
              sx={{
                minWidth: '25px',
                backgroundColor: 'primary.main',
                fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                borderRadius: '1px',
                textTransform: 'inherit',
                height: '28px',
                ml: '8px',
                fontWeight: '600',
                ":hover": { // Styles applied on hover
                  outlineColor: 'primary.main', // Corrected property nam
                  backgroundColor: theme.palette.action.hover, // Change background color on hover
                  // color: 'primary.main' // Change text color on hover
                }
              }}
            // onClick={() => (navigate('addProduct', { replace: false }))}

            >
              <AddIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' }, }}></AddIcon>

            </Button>          </Box>
          <Box sx={{ mx: '6px', my: '20px', display: 'flex' }}>

            <FormControl sx={{ minWidth: 250, height: '30px' }} size="small">
              <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" color="primary" size='small'
              sx={{
                minWidth: '25px',
                backgroundColor: 'primary.main',
                fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                borderRadius: '1px',
                textTransform: 'inherit',
                height: '28px',
                ml: '8px',
                fontWeight: '600',
                ":hover": { // Styles applied on hover
                  outlineColor: 'primary.main', // Corrected property nam
                  backgroundColor: theme.palette.action.hover, // Change background color on hover
                  // color: 'primary.main' // Change text color on hover
                }
              }}
            // onClick={() => (navigate('addProduct', { replace: false }))}

            >
              <AddIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' }, }}></AddIcon>

            </Button>
            {/* </Stack> */}
          </Box>
          <Box sx={{ mx: '6px', my: '20px', display: 'flex' }}>
            {/* <Stack> */}
            {/* <label style={labelStyle}>Supplier</label> */}
            <FormControl sx={{ minWidth: 250, height: '30px' }} size="small">
              <InputLabel id="demo-select-small-label">Shelf</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button fullWidth variant="contained" color="primary" size='small'
              sx={{
                minWidth: '25px',
                backgroundColor: 'primary.main',
                fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                borderRadius: '1px',
                textTransform: 'inherit',
                height: '28px',
                ml: '8px',
                fontWeight: '600',
                ":hover": { // Styles applied on hover
                  outlineColor: 'primary.main', // Corrected property nam
                  backgroundColor: theme.palette.action.hover, // Change background color on hover
                  // color: 'primary.main' // Change text color on hover
                }
              }}
            // onClick={() => (navigate('addProduct', { replace: false }))}

            >
              <AddIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' }, }}></AddIcon>

            </Button>
          </Box>
        </Box>
      </Grid>




      <Box sx={{ mx: '6px', my: '20px' }}>
        <Stack>
          <label style={labelStyle}>currentRetailSellingPrice</label>
          <input type="text" style={textFieldStyle} value={productName} />
        </Stack>
      </Box>

      <Grid item xs={12} sm={6} md={3}
        display='flex' justifyContent='start' flexDirection='column' alignItems='start' height='auto'>


        <Box sx={{ mx: '6px', my: '20px' }}>
          <Stack>
            <label style={labelStyle}>quantityOfProductsPresentedForRetail</label>
            <input type="text" style={textFieldStyle} value={productName} />
          </Stack>

        </Box>
        <Box sx={{ mx: '6px', my: '20px' }}>
          <Stack>
            <label style={labelStyle}>quantityOfProductsPresentedForWholesale</label>
            <input type="text" style={textFieldStyle} value={productName} />
          </Stack>


        </Box>
        <Box sx={{ mx: '6px', my: '20px' }}>
          <Stack>
            <label style={labelStyle}>minimumQuantityOfProductsPresentedForRetail</label>
            <input type="text" style={textFieldStyle} value={productName} />
          </Stack>

        </Box>
        <Box sx={{ mx: '6px', my: '20px' }}>
          <Stack>
            <label style={labelStyle}>minimumQuantityOfProductsPresentedForWholesale</label>
            <input type="text" style={textFieldStyle} value={productName} />
          </Stack>


        </Box>
      </Grid>
    </Grid >


  );
};


export default AddProduct;