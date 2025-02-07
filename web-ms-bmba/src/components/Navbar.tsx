import { FC, ReactElement } from "react";
import { useTranslation } from 'react-i18next';
import {
  Container,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  SvgIcon,
  Avatar,
  useTheme,
  Button
} from "@mui/material";
import { Menu, Search, Settings, } from "@mui/icons-material";
import { Bell } from "../assets";
import { useProSidebar } from "react-pro-sidebar";
import {
  useSidebar,
  useSidebarSelectedMenuTitleContext,
  useTemplateThemeModeContext,
} from "../hooks";
import { TemplateThemeModeContextType } from "../context";
import { RootState } from '../redux/store/store';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux/actionTypes/authActionTypes";
import { IUser } from "../models/user";
import { color } from "../styles/CommonStyle";
import burhan_logo from "../assets/icons/Burhanlogo.png"
import { useNavigate } from "react-router-dom";

const Navbar: FC = (): ReactElement => {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.authToken !== ''
  )
  const user = useSelector(
    (state: RootState) => state.auth.user
  )
  const theme = useTheme()
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  const { menuTitle } = useSidebarSelectedMenuTitleContext();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const handleLogout = () => {
    console.log("Logout ...");
    localStorage.setItem('authToken', '');

    localStorage.setItem('user', '');
    navigate('/');
    dispatch({ type: ActionType.LOGOUT_AUTH_SUCCESS });
    // You can dispatch additional actions or perform other operations here if needed
  };


  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', py: 0, my: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography >
            <img
              onClick={() => navigate('/')}
              style={{ width: '80px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              src={burhan_logo}
              alt='avatar'
            />
          </Typography>


          {/* <Typography
            sx={{
              textAlign: "center", fontWeight: "bold", marginRight: '20px',
              color: isDark ? theme.palette.success.dark : theme.palette.success.light, fontSize: '14px', display: 'flex', justifyContent: 'left'
            }}

          >
            burhan<span style={{ color: theme.palette.primary.main }}> market</span>
          </Typography> */}

          {/* <Typography
            fontSize={12}
            color={isDark ? theme.palette.success.dark : theme.palette.success.light}
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            {menuTitle}
          </Typography> */}
          {broken && (
            <IconButton
              onClick={toggle}
              sx={{
                color: isDark ? theme.palette.success.dark : theme.palette.success.light,
                mt: "8px"
              }}
            >
              <Menu />
            </IconButton>)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mr: 3 }}>

          <Box onClick={() => navigate('/config')} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Settings sx={{
              m: 'auto',
              color: isDark ? theme.palette.success.dark : theme.palette.success.light,
              width: 15, height: 15, cursor: 'pointer'
            }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', py: 0, my: 0 }}>
            <Select
              sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, maxHeight: '100%', py: 0, my: 0 }}
              displayEmpty
              renderValue={(value) => {
                return (
                  <Box sx={{ display: "flex", gap: 1, py: 0, my: 0, pt: 0.6 }}>
                    <>
                      <SvgIcon style={{
                        color: isDark ? theme.palette.success.dark : theme.palette.success.light,
                        width: 20, height: 20, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0
                      }}>
                        <Bell />
                      </SvgIcon>
                      {value}
                    </>
                  </Box>
                );
              }}
            >
              <MenuItem>Notification #1</MenuItem>
              <MenuItem>Notification #2</MenuItem>
              <MenuItem>Notification #3</MenuItem>
              <MenuItem>Notification #4</MenuItem>
            </Select>
            <Divider orientation="vertical" flexItem sx={{ height: 5, py: 0, my: 0 }} />
            <Select
              id='navbarSelect'
              sx={{
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                maxHeight: '100%',
                mx: 0.5,
                py: 0,
                my: 0,
                pt: 0.8,
                color: 'white',
              }}
              displayEmpty
              renderValue={(value) => {
                return (
                  <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: 1, py: 0, my: 0 }}>
                    <>
                      <Typography
                        mx='auto'
                        fontSize={12}
                        my={0}
                        py={0}
                        color={isDark ? theme.palette.success.dark : theme.palette.success.light}
                      >
                        {user && user.userName}
                      </Typography>
                      {value}
                    </>
                  </Box>
                );
              }}
            >

              <MenuItem>Settings</MenuItem>
              <MenuItem>
                <Box onClick={() => { handleLogout() }} display='block' justifyContent='center' alignItems='center' pt={2.25} >
                  {t("logout-button")}
                </Box>
              </MenuItem>
            </Select>
          </Box>
          {/* <Box >
            {!isAuthenticated ?
              <Box display='block' justifyContent='center' py={2} >
                <Button fullWidth variant="contained" color="primary" size='small'
                  sx={{
                    fontSize: { xs: '9pt', sm: '6pt', md: '8pt' }
                    , borderRadius: '11px'
                  }}>Login</Button>
              </Box>
              :
              <Box onClick={() => { handleLogout() }} display='block' justifyContent='center' alignItems='center' pt={2.25} >
                <Button fullWidth variant="contained" color="primary" size='small'
                  sx={{
                    backgroundColor: 'primary.main',
                    fontSize: { xs: '9pt', sm: '7pt', md: '8pt' },
                    borderRadius: '2px',
                    textTransform: 'inherit',
                    height: '22px',
                    fontWeight: '600',
                    ":hover": { // Styles applied on hover
                      outlineColor: 'primary.main', // Corrected property nam
                      backgroundColor: 'primary.dark', // Change background color on hover
                      color: 'primary.main' // Change text color on hover
                    }
                  }}
                >{t("logout-button")}</Button>
              </Box>
            }
          </Box> */}
        </Box>

      </Toolbar>
    </Container >
  );
};

export default Navbar;


