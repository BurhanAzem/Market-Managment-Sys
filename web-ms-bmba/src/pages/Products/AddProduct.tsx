import { ReactElement, FC } from "react";
import { Autocomplete, Box, Button, Checkbox, CircularProgress, Divider, Grid, Pagination, PaginationItem, Paper, Stack, TextField, Typography, styled } from "@mui/material";
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
import { AppDispatch, RootState } from "../../redux/store/store";
import { RootActions } from "../../redux/actionCreators/actionResultTypes";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "../../redux/actionCreators/productActions";
import { IProduct } from "../../models/product";
import { IProductsRes } from "../../models/productRes";
import ReplayIcon from '@mui/icons-material/Replay';
import { Check, FontDownload, Height, Settings } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ISupplier } from "../../models/supplier";
import { IShelf } from "../../models/shelf";
import { IDiscount } from "../../models/discount";
import { ICategory } from "../../models/category";
import { parse } from "path";
import AddSupplierModal from "../../modals/AddSupplierModal";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link } from "react-router-dom";
import { getCategories } from "../../redux/actionCreators/categoryActions";
import AddDiscountModal from "../../modals/AddDiscountModal";
import { ActionType, IOpenAddDiscountModal } from "../../redux/actionTypes/discountActionTypes";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

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

  React.useEffect(() => {

    dispatch(getCategories());

    console.log(categories);

  }, []);


  const dispatch = useDispatch<AppDispatch>();
  const categories: ICategory[] | null = useSelector(
    (state: RootState) => state.category.categories);

    const isAddDiscountModalOpen = useSelector((state: RootState) => state.discount.isAddDiscountModalOpen);



  const isLoading: Boolean | null = useSelector(
    (state: RootState) => state.product.loading);

  const theme = useTheme();
  const [suppliers, setSuppliers] = React.useState([]);
  const [shelfs, setShelfs] = React.useState([]);
  const [open, setOpen] = React.useState(true);




  const [product, setProduct] = React.useState<IProduct>({
    supplierId: 0,
    shelfId: 0,
    discountId: 0,
    categoryId: 0,
    name: '',
    description: '',
    images: [],
    barCode: 0,
    currentWholeSalePurchasingPrice: 0,
    currentWholeSalSellingPrice: 0,
    currentRetailPurchasingPrice: 0,
    currentRetailSellingPrice: 0,
    quantityOfProductsPresentedForRetail: 0,
    quantityOfProductsPresentedForWholesale: 0,
    minimumQuantityOfProductsPresentedForRetail: 0,
    minimumQuantityOfProductsPresentedForWholesale: 0,
  });

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };





  const handleImageUpload = (event: { target: { files: any; }; }) => {
    const files = event.target.files;
    // const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));

    // Update the product state with the new images
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images || [], ...files],
    }));

    console.log(product);

  };

  const handleClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };


  const handleOpenModal = () => {
    dispatch<IOpenAddDiscountModal>({ type: ActionType.OPEN_ADD_DISCOUNT_MODAL });
  };

  return (
    <>
      {isAddDiscountModalOpen ? <AddDiscountModal  ></AddDiscountModal> : null}
      {
        isLoading ?
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width='100%' height='200px' >
            <CircularProgress size='20px' color="inherit" />
            {/* <LinearProgress  /> */}
          </Box>
          :
          <Grid container direction='column' height='auto' mb='40'>
            <AddSupplierModal open={false} setOpen={setOpen} />
            <Grid item xs={12} sm={6} md={3} ml='0px' direction='column'>
              <Box sx={{ fontSize: { sm: '9pt', md: '10pt' }, fontWeight: '600', backgroundColor: '#f7f7f7' }}
                display="flex" flexDirection="column" justifyContent="start" alignItems="start" py='12px' px='12px'>
                Product details
              </Box>
              <Grid item container direction='row' xs={12} spacing={0} pb={2} justifyContent='center' py='20px' alignItems='center' sx={{ backgroundColor: 'white' }}>

                <Grid item container direction='row' xs={12} sm={8} md={8} mb='0px' justifyContent='space-around' alignItems='center' sx={{ backgroundColor: 'white' }}>
                  <Grid item container direction='column' xs={12} sm={6} md={4} spacing={1} pb={0} mb='0px' justifyContent='center' alignItems='center' sx={{ backgroundColor: 'white' }}>
                    <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                      <Box sx={{ mx: '6px', my: '5px' }}>
                        <DemoItem sx={{ padding: '0px' }} label="Name">
                          <TextField
                            required
                            id="outlined-basic"
                            // label="Name"
                            variant="outlined"
                            size="small" style={{}}

                            InputLabelProps={{
                              style: {
                                height: '30px',
                                fontSize: '10px',
                              },
                            }}

                            inputProps={{
                              style: {
                                height: '30px',
                                width: '250px',
                                padding: '0 14px',
                              },
                            }} value={product.name} onChange={(event: { target: { value: any; }; }) => setProduct(prevProduct => ({ ...prevProduct, name: event.target.value }))} />

                        </DemoItem>
                      </Box>
                    </Grid>
                    <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                      <Box sx={{ mx: '6px', my: '5px' }}>
                        <DemoItem sx={{ padding: '0px' }} label="BarCode">
                          <TextField
                            required
                            id="outlined-basic"
                            // label="Name"
                            variant="outlined"
                            size="small" style={{}}

                            InputLabelProps={{
                              style: {
                                height: '30px',
                                fontSize: '10px',
                              },
                            }}

                            inputProps={{
                              style: {
                                height: '30px',
                                width: '250px',
                                padding: '0 14px',
                              },
                            }} value={product.currentRetailSellingPrice} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, currentRetailSellingPrice: parseFloat(event.target.value) }))} />

                        </DemoItem>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item container direction='column' xs={12} sm={6} md={4} spacing={1} pb={0} mb='0px' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                    <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                      <Box sx={{ mx: '6px', my: '5px' }}>
                        <DemoItem sx={{ padding: '0px' }} label="Current retail purchasing price">
                          <TextField
                            required
                            id="outlined-basic"
                            // label="Name"
                            variant="outlined"
                            size="small" style={{}}

                            InputLabelProps={{
                              style: {
                                height: '30px',
                                fontSize: '10px',
                              },
                            }}

                            inputProps={{
                              style: {
                                height: '30px',
                                width: '250px',
                                padding: '0 14px',
                              },
                            }} value={product.currentRetailPurchasingPrice} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, currentRetailPurchasingPrice: parseFloat(event.target.value) }))} />

                        </DemoItem>
                      </Box>
                    </Grid>
                    <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                      <Box sx={{ mx: '6px', my: '5px' }}>
                        <DemoItem sx={{ padding: '0px' }} label="Current retail selling price">
                          <TextField
                            required
                            id="outlined-basic"
                            // label="Name"
                            variant="outlined"
                            size="small" style={{}}

                            InputLabelProps={{
                              style: {
                                height: '30px',
                                fontSize: '10px',
                              },
                            }}

                            inputProps={{
                              style: {
                                height: '30px',
                                width: '250px',
                                padding: '0 14px',
                              },
                            }} value={product.barCode} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, barCode: parseFloat(event.target.value) }))} />

                        </DemoItem>
                      </Box>
                    </Grid>
                  </Grid>



                </Grid>

                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Description">
                      <textarea
                        required
                        id="outlined-basic"

                        // label="Name"
                        // variant="outlined"
                        // size="small" 
                        style={{ height: '130px', width: '300px', border: 'solid #adadad 1px', borderRadius: '3px' }}

                        // InputLabelProps={{
                        //   style: {
                        //     height: '120px',
                        //     fontSize: '10px',
                        //   },
                        // }}

                        // inputProps={{
                        //   style: {
                        //     height: '120px',
                        //     width: '280px',
                        //     padding: '0 14px',
                        //   },
                        // }} 
                        value={product.description} onChange={(event) => setProduct(prevProduct => ({ ...prevProduct, description: event.target.value }))} />

                    </DemoItem>
                  </Box>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={12} sm={6} md={3} ml='0px' direction='column'>
              <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" py='12px' px='12px' sx={{ fontSize: { sm: '9pt', md: '10pt' }, fontWeight: '600', backgroundColor: '#f7f7f7', mt: '15px' }}>
                <Box
                  display="flex" flexDirection="column" justifyContent="start" alignItems="start" >
                  Select
                </Box>
              </Box>
              <Grid item container direction='row' xs={12} spacing={1} pb={2} justifyContent='center' sx={{ backgroundColor: 'white' }}>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '20px', display: 'flex' }}>

                    <FormControl sx={{ minWidth: 250, height: '30px' }} size="small">

                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={suppliers}
                        sx={{
                          width: 'auto',
                          height: '30px', // Adjust the height here
                          "& .MuiOutlinedInput-root": {
                            paddingY: "0px!important",
                            marginY: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                          },
                        }}
                        renderInput={(params: any) => <TextField {...params} label="Supplier" />}
                      />

                    </FormControl>
                    <Button fullWidth variant="contained" color="primary" size='small'
                      sx={{
                        minWidth: '25px',
                        backgroundColor: 'primary.main',
                        fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                        borderRadius: '0px',
                        textTransform: 'inherit',
                        height: '28px',
                        ml: '8px',
                        fontWeight: '600',
                        mt: '11.5px',
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
                </Grid>

                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '20px', display: 'flex' }}>

                    <FormControl sx={{ minWidth: 250, height: '30px' }} size="small">

                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <li {...props} key={option.name}>
                            {option.name}
                          </li>
                        )}
                        sx={{
                          width: 'auto',
                          height: '30px',
                          "& .MuiOutlinedInput-root": {
                            paddingY: "0px!important",
                            marginY: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                          },
                        }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                      />

                    </FormControl>
                    <Button fullWidth variant="contained" color="primary" size='small'
                      sx={{
                        minWidth: '25px',
                        backgroundColor: 'primary.main',
                        fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                        borderRadius: '0px',
                        textTransform: 'inherit',
                        height: '28px',
                        ml: '8px',
                        mt: '11.5px',
                        fontWeight: '600',
                        ":hover": { // Styles applied on hover
                          outlineColor: 'primary.main', // Corrected property nam
                          backgroundColor: theme.palette.action.hover, // Change background color on hover
                          // color: 'primary.main' // Change text color on hover
                        }
                      }}
                    // onClick={() => (navigate('addProduct', { replace: false }))}
                    >
                      <AddIcon sx={{ fontSize: { xs: '11pt', sm: '12pt', md: '14pt' } }}></AddIcon>
                    </Button>
                  </Box>
                </Grid>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '20px', display: 'flex' }}>
                    <FormControl sx={{ minWidth: 250, height: '30px' }} size="small">

                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={shelfs}
                        sx={{
                          width: 'auto',
                          height: '30px', // Adjust the height here
                          "& .MuiOutlinedInput-root": {
                            paddingY: "0px!important",
                            marginY: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                          },
                        }}

                        renderInput={(params: any) => <TextField label="Shelf" {...params} sx={{}} />}
                      />

                    </FormControl>
                    <Button fullWidth variant="contained" color="primary" size='small'
                      sx={{
                        minWidth: '25px',
                        backgroundColor: 'primary.main',
                        fontSize: { xs: '7pt', sm: '8pt', md: '9pt' },
                        borderRadius: '0px',
                        textTransform: 'inherit',
                        height: '28px',
                        ml: '8px',
                        fontWeight: '600',
                        mt: '11.5px',
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
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3} ml='0px' direction='column'>
              <Box sx={{ fontSize: { sm: '9pt', md: '10pt' }, fontWeight: '600', backgroundColor: '#f7f7f7', mt: '15px' }}
                display="flex" flexDirection="column" justifyContent="start" alignItems="start" py='12px' px='12px'>
                Price and Quantity
              </Box>
              <Grid item container direction='row' xs={12} spacing={1} pb={2} mb='0px' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Current whole sale selling price">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.currentWholeSalSellingPrice} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, currentRetailSellingPrice: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '5px' }}>


                    <DemoItem sx={{ padding: '0px' }} label="Current whole sale purchasing price">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.currentWholeSalePurchasingPrice} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, currentWholeSalePurchasingPrice: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>

                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Quantity of products presented for retail">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.quantityOfProductsPresentedForRetail} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, quantityOfProductsPresentedForRetail: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mx: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Quantity of products - whole sale">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.quantityOfProductsPresentedForWholesale} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, quantityOfProductsPresentedForWholesale: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>
                <Grid item display="flex" flexDirection="column" justifyContent="start" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mr: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Minimum quantity of products - retail">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.minimumQuantityOfProductsPresentedForRetail} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, minimumQuantityOfProductsPresentedForRetail: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={6} md={4}>
                  <Box sx={{ mr: '6px', my: '5px' }}>
                    <DemoItem sx={{ padding: '0px' }} label="Minimum quantity of products - whole sale">
                      <TextField
                        required
                        id="outlined-basic"
                        // label="Name"
                        variant="outlined"
                        size="small" style={{}}

                        InputLabelProps={{
                          style: {
                            height: '30px',
                            fontSize: '10px',
                          },
                        }}

                        inputProps={{
                          style: {
                            height: '30px',
                            width: '250px',
                            padding: '0 14px',
                          },
                        }} value={product.minimumQuantityOfProductsPresentedForWholesale} onChange={(event: { target: { value: string; }; }) => setProduct(prevProduct => ({ ...prevProduct, minimumQuantityOfProductsPresentedForWholesale: parseFloat(event.target.value) }))} />

                    </DemoItem>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3} ml='0px' direction='column'>
              <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" py='12px' px='12px' sx={{ fontSize: { sm: '9pt', md: '10pt' }, fontWeight: '600', backgroundColor: '#f7f7f7', mt: '15px' }}>
                <Box
                  display="flex" flexDirection="column" justifyContent="start" alignItems="start" >
                  Discount
                </Box>
                <Link style={{ color: '#16b', fontSize: '12px' }} onClick={handleOpenModal}

                  to={""}> {product.discountDto ? 'Update discount' : 'Add discount'} </Link>
              </Box>
              <Grid item container direction='row' xs={12} spacing={1} p={2} justifyContent='center' alignItems='center' sx={{ backgroundColor: 'white', fontSize: '12px' }}>
                <span style={{ marginRight: '20px' }}>start at: {product.discountDto?.startDate ? product.discountDto?.startDate.toString() : '-'} </span>
                <span style={{ marginRight: '20px' }}>end at: {product.discountDto?.startDate ? product.discountDto?.endDate.toString() : '-'} </span>
                <span style={{ marginRight: '0px' }}>amount: {product.discountDto?.startDate ? product.discountDto?.amount.toString() : '-'} </span>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8} md={8} ml='0px' direction='column'>
              <Box sx={{ fontSize: { sm: '9pt', md: '10pt' }, fontWeight: '600', backgroundColor: '#f7f7f7', mt: '15px' }}
                display="flex" flexDirection="column" justifyContent="start" alignItems="start" py='12px' px='12px'>
                Upload images
              </Box>
              <Grid item container direction='row' xs={12} spacing={1} pb={2} mb='20px' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                <Grid item display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={12} sm={8} md={8}>
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box sx={{ padding: '0px' }}>
                      Upload images for product
                    </Box>
                    <Box
                      sx={{
                        mt: '20px',
                        padding: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        transition: 'box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                      onClick={handleClick}
                    >
                      <FileUploadIcon sx={{ width: '50px' }} />
                    </Box>
                    <input
                      type="file"
                      id="file-input"
                      style={{ display: 'none' }}
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Grid container width='400px' spacing={2} sx={{ mt: '20px' }}>
                      {product.images && (
                        <Grid container spacing={2} sx={{ mt: '20px' }}>
                          {product.images.map((image, index) => (
                            <Grid item key={index} xs={8} sm={12} md={12}>
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`uploaded ${index}`}
                                style={{ width: '100%', borderRadius: '10px' }}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={12} sm={8} md={8} pb='20px' display='flex' justifyContent='end' alignItems='start'>

              <Button variant="contained" color="primary" size='small'
                sx={{
                  minWidth: '120px',
                  backgroundColor: 'primary.main',
                  fontSize: { xs: '9pt', sm: '10pt', md: '10pt' },
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
                Save
              </Button>
            </Grid>
          </Grid>
      }
    </>
  );
};


export default AddProduct;
