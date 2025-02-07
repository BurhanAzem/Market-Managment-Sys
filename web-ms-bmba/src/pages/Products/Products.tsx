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
// import SearchBar from "../../components/SearchBar";
import { RootState } from "../../redux/store/store";
import { RootActions } from "../../redux/actionCreators/actionResultTypes";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actionCreators/productActions";
import { IProduct } from "../../models/product";
import { IProductsRes } from "../../models/productRes";
import ReplayIcon from '@mui/icons-material/Replay';
import { Check, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Searchbar";
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

const cellThStyle = {
  fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
  fontWeight: '600',
  padding: '0px'
};

const cellBodyStyle = {
  fontSize: { xs: '6pt', sm: '7pt', md: '8pt' },
  fontWeight: '500',
  padding: '0px'
};


const Products: FC = (): ReactElement => {

  const navigate = useNavigate();
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

    <Box sx={{ flexGrow: 1, border: 'solid 1px #d9d8d8', backgroundColor: '#f7f7f7', pt: '15px' }} >
      <Grid container spacing={2} py='0px' pl='16px' >
        <Box display="flex" flexDirection="column" justifyContent="start" alignItems="center" width="100%" py='12px' px='12px'>
          <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width="100%">
            <Box>
              Products
            </Box>
            <Box display='flex'>
              <Button fullWidth variant="contained" color="primary"
                sx={{
                  minWidth: '10px',
                  backgroundColor: 'common.white',
                  fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                  borderRadius: '1px',
                  border: 'solid 1px',
                  textTransform: 'inherit',
                  height: '28px',
                  ml: '5px',
                  fontWeight: '600',
                  ":hover": { // Styles applied on hover
                    outlineColor: 'primary.main', // Corrected property nam
                    backgroundColor: theme.palette.action.hover, // Change background color on hover
                    // color: 'primary.main' // Change text color on hover
                  }
                }}
              >
                <ReplayIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' }, }}></ReplayIcon>
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size='small'
                disabled={Object.keys(checkedRows).length === 0} // disable the button when no rows are checked
                sx={{
                  minWidth: '80px',
                  backgroundColor: Object.keys(checkedRows).length !== 0 ? 'common.white' : '#eef0f2', // use gray color when no rows are checked
                  fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                  borderRadius: '1px',
                  border: 'solid 1px',
                  textTransform: 'inherit',
                  height: '28px',
                  fontWeight: '600',
                  ml: '8px',
                  ":hover": {
                    outlineColor: 'primary.main',
                    backgroundColor: Object.keys(checkedRows).length !== 0 ? theme.palette.action.hover : '#eef0f2', // change hover color accordingly
                  }
                }}
              >
                Delete
              </Button>


              <Button fullWidth variant="contained" color="primary" size='small'
                sx={{
                  minWidth: '120px',
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
                onClick={() => (navigate('addProduct', { replace: false }))}

              >
                <AddIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' }, }}></AddIcon>
                New product
              </Button>
            </Box>
          </Box>
          <Box display='flex' justifyContent='space-between' mt='20px' width="100%">
            <Box>
              <SearchBar searchPlaceholder="Search about product" productName={productName} setProductName={setProductName} />
            </Box>
            <Box display='flex' flexDirection='row'>
              {/* <Typography>Page: {pageNumber}</Typography> */}
              <Pagination
                count={totalPages}
                page={pageNumber}
                onChange={(event, value) => {
                  setPageNumber(value);
                  dispatch(getProducts({ ...query, pageNumber: value }));
                }}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    style={{ backgroundColor: 'transparent', fontWeight: '600' }}
                  />
                )}
              />
              <Settings sx={{
                m: 'auto',
                pl: '4px',
                // color: isDark ? theme.palette.success.dark : theme.palette.success.light,
                width: 15, height: 15, cursor: 'pointer'
              }} />
            </Box>
          </Box>
        </Box>


        <TableContainer component={Paper} >
          {
            isLoading ?
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width='100%' height='200px' >
                <CircularProgress size='20px' color="inherit"  />
                {/* <LinearProgress  /> */}
              </Box>
              :
              <Table sx={{ minWidth: 650, color: 'black', width: '100%' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': {
                            width: '16px',
                            height: '16px',
                          },
                        }}
                        onChange={() => allRowsToCheckedList()}
                      />
                    </TableCell>
                    <TableCell sx={cellThStyle}>Name</TableCell>
                    <TableCell sx={cellThStyle} align="right">BarCode</TableCell>
                    <TableCell sx={cellThStyle} align="right">Category Name</TableCell>
                    <TableCell sx={cellThStyle} align="right">QuantityOfProductsPresentedForRetail</TableCell>
                    <TableCell sx={cellThStyle} align="right">QuantityOfProductsPresentedForWholesale</TableCell>
                    <TableCell sx={cellThStyle} align="right">CurrentRetailSellingPrice</TableCell>                    </TableRow>
                </TableHead>
                <TableBody>
                  {/* {productsRes!.products && productsRes!.products.map((row) => ( */}
                  {products && products.map((row) => (
                    <TableRow
                      key={row.barCode}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                    >
                      <TableCell component="th" scope="row">
                        <Checkbox sx={{
                          '& .MuiSvgIcon-root': {
                            width: '16px',
                            height: '16px',
                            padding: '0px'
                          },
                        }}
                          // value={ checkedRows[row.barCode] }
                          checked={!!checkedRows.includes(row.barCode)}
                          onChange={() => RowToCheckedList(row)}
                        />
                      </TableCell>
                      <TableCell sx={cellBodyStyle} component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell sx={cellBodyStyle} align="right">{row.barCode}</TableCell>
                      <TableCell sx={cellBodyStyle} align="right">{row.categoryDto ? row.categoryDto.name : ""}</TableCell>
                      <TableCell sx={cellBodyStyle} align="right">{row.quantityOfProductsPresentedForRetail}</TableCell>
                      <TableCell sx={cellBodyStyle} align="right">{row.quantityOfProductsPresentedForWholesale}</TableCell>
                      <TableCell sx={cellBodyStyle} align="right">{row.currentRetailSellingPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          }

        </TableContainer>

      </Grid>
    </Box>


  );
};


export default Products;