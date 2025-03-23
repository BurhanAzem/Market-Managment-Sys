import { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  SvgIcon,
  useTheme,
} from "@mui/material";
import { Menu, Settings } from "@mui/icons-material";
import { Bell } from "../assets"; // Custom Bell icon
import { useProSidebar } from "react-pro-sidebar";
import {
  useSidebar,
  useSidebarSelectedMenuTitleContext,
  useTemplateThemeModeContext,
} from "../hooks";
import { TemplateThemeModeContextType } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux_old/actionTypes/authActionTypes";
import burhan_logo from "../assets/icons/Burhanlogo.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store/store";
import { useAppDispatch } from "../redux/store/hooks";
import { logoutAuth } from "../redux/features/authSlice";

const Navbar: FC = (): ReactElement => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.authToken !== ""
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const theme = useTheme();
  const { broken } = useProSidebar();
  const { toggle } = useSidebar();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    localStorage.setItem("user", "");
    navigate("/");
    dispatch(logoutAuth());
  };

  return (

    <Box
      component="header"
      sx={{
        width: "100%",
        backgroundColor: theme.palette.info.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        py: 1,
      }}
    >
      {/* LEFT: Logo and (Menu if broken) */}
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={burhan_logo}
          alt="logo"
          onClick={() => navigate("/")}
          sx={{
            width: "85px",
            cursor: "pointer",
          }}
        />
        {broken && (
          <IconButton
            onClick={toggle}
            sx={{
              color: theme.palette.common.white,
              ml: 1,
            }}
          >
            <Menu />
          </IconButton>
        )}
      </Box>

      {/* RIGHT: Icons & User Menu */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Settings Icon */}
        <IconButton
          onClick={() => navigate("/config")}
          sx={{
            color: theme.palette.common.white,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          <Settings />
        </IconButton>

        {/* Notifications Dropdown */}
        <Select
          sx={{
            color: theme.palette.common.white,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "& .MuiSvgIcon-root": { color: theme.palette.common.white },
          }}
          displayEmpty
          renderValue={() => (
            <Box display="flex" alignItems="center" gap={1}>
              <SvgIcon>
                <Bell />
              </SvgIcon>
            </Box>
          )}
        >
          <MenuItem>Notification #1</MenuItem>
          <MenuItem>Notification #2</MenuItem>
        </Select>

        {/* User Dropdown */}
        <Select
          sx={{
            color: theme.palette.common.white,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "& .MuiSvgIcon-root": { color: theme.palette.common.white },
          }}
          displayEmpty
          renderValue={() => (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={14} fontWeight={500}>
                {user ? user.firstName : "Guest"}
              </Typography>
            </Box>
          )}
        >
          <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ color: theme.palette.error.main }}
          >
            {t("logout-button")}
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Navbar;
