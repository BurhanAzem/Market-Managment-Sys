import React, { ReactElement, FC, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Link,
  Typography,
  Button,
  Divider,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import {
  Visibility,
  VisibilityOff,
  Google,
  Twitter,
  Facebook
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useTemplateThemeModeContext } from "../../../hooks";
import { TemplateThemeModeContextType } from "../../../context";
import { RootState } from '../../../redux/store/store';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../../redux/actionTypes/authActionTypes";
import { LoginAuthStart } from "../../../redux/actionCreators/authActions";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import { RootActions } from "../../../redux/actionCreators/actionResultTypes";

const SignIn: FC = (): ReactElement => {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.authToken !== ''
  )
  const isLoading: boolean = useSelector(
    (state: RootState) => state.auth.loading
  )
  const dispatch: ThunkDispatch<RootState, void, RootActions> = useDispatch();

  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [cardId, setCardId] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const handleLogin = () => {
    dispatch(LoginAuthStart(cardId, password));
  }

  return (
    <>
      {
        isLoading ?
          <Box mt={30}>
            <CircularProgress color="inherit" />
            {/* <LinearProgress  /> */}
          </Box>
          :
          <Box
            display='block'
            m='auto'
            px={3}
            pt={3}
            width={400}
            border={1}
            borderRadius={4}
            boxShadow={12}
          // sx={{backgroundColor:'#f7d2b9'}}
          >
            {/* f7ddcd f0d6c5 edd0bc f7d5bf */}
            <Box
              flexGrow={1}
              display="flex"
              py={2}
              px={3}
              sx={{
                justifyContent: "space-between",
                backgroundColor: "inherit"
              }}
            >
              <Typography variant="h6">Login</Typography>
              <Link href='/auth/signup' sx={{ fontSize: { xs: '9pt', sm: '9pt', md: '10pt' }, textDecoration: 'none', mt: 1 }}>Don't have an account?</Link>
            </Box>
            <Box display='block' px={3} mb={3}>
              <FormControl fullWidth variant="outlined" size='small' sx={{ fontSize: { xs: '9pt', sm: '9pt', md: '10pt' } }}>
                <InputLabel htmlFor="outlined-input-email" sx={{ fontSize: { xs: '9pt', sm: '10pt', md: '11pt' } }}>Email address</InputLabel>
                <OutlinedInput
                  id="outlined-input-email"
                  type='text'
                  aria-describedby="my-helper-text"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                />
                <FormHelperText id="my-helper-text" >We'll never share your email.</FormHelperText>
              </FormControl>

              <FormControl fullWidth variant="outlined" size='small' sx={{ fontSize: { xs: '9pt', sm: '9pt', md: '10pt' } }}>
                <InputLabel htmlFor="outlined-adornment-password" sx={{ fontSize: { xs: '9pt', sm: '10pt', md: '11pt' } }}>Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Box
                display="flex"
                justifyContent="space-around"
                pt={1}
                flexGrow={1}
                sx={{ backgroundColor: "inherit" }}
              >
                <FormControlLabel
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '9pt', sm: '9pt', md: '10pt' } } }}
                  control={<Checkbox size='small' />}
                  label={'Keep me sign in'}
                />
                <Link href='/auth/forgetpassword' sx={{ mt: 1, fontSize: { xs: '9pt', sm: '9pt', md: '10pt' }, textDecoration: 'none', fontColor: 'black' }}>Forget Password?</Link>
              </Box>
              <Box display='block' justifyContent='center' py={2} >
                <Button onClick={() => { handleLogin() }} fullWidth variant="contained" color="primary" size='small' sx={{ fontSize: { xs: '9pt', sm: '9pt', md: '10pt' } }}>Login</Button>
              </Box>
              <Divider sx={{ pb: 1, fontSize: { xs: '9pt', sm: '10pt', md: '8pt' } }}>Powerd by Burhan Azem</Divider>
              {/* <Box 
          display='flex'
          justifyContent='center'
          color= {isDark ? theme.palette.info.dark : theme.palette.info.light}
          fontSize={10}
        >
          Powerd by Burhan Azem
        </Box> */}
            </Box>
          </Box>
      }

    </>
  );
};

export default SignIn;