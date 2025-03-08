import React, { ReactElement, FC, useState } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Checkbox,
  TextField,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useTemplateThemeModeContext } from "../../../hooks";
import { TemplateThemeModeContextType } from "../../../context";
// import { signUpAuth } from '../../../redux/features/authSlice'; // Example
import { useAppDispatch } from "../../../redux/store/hooks";
import { IUser } from "../../../models/user"; // Ensure this path is correct
import { registerAuth } from "../../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp: FC = (): ReactElement => {

  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // State for IUser fields
  const [cardId, setCardId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userRole, setUserRole] = useState<string>(""); // stored as string
  const [password, setPassword] = useState<string>("");
  const [identifierIsRequiredMessage, setIdentifierIsRequiredMessage] = useState<string>("");
  const navigate = useNavigate(); // Initialize navigation


  const theme = useTheme();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const handleSignUp = () => {
    if (email === "" && cardId === "" && phoneNumber === "") {
      setIdentifierIsRequiredMessage("You should enter at least one of the following fields: Card ID, Email, or Phone Number");
    } else {
      if (userName == "" || password == "" || userRole == "") { setIdentifierIsRequiredMessage("Fill the required fieleds"); }
      else {
        dispatch(registerAuth({ cardId, userName, email, phoneNumber, userRole, password }));
        console.log("registerAuth Dispatch Called");
        if (!error)
          navigate('/');
      }

    }
  };


  // Example: dispatch a signup action
  // dispatch(signUpAuth({ ...newUser, password }));

  return (
    <>
      {isLoading ? (
        <Box mt={30} display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"}>
          {identifierIsRequiredMessage && (

            <Box display="block"
              m="auto"
              px={3}
              py={2}
              width={400}
            ><Alert severity="warning">{identifierIsRequiredMessage}</Alert></Box>
          )}
          {error && (

            <Box display="block"
              m="auto"
              px={3}
              py={2}
              width={400}
            ><Alert severity="error">{error}</Alert></Box>
          )}
          <Box
            display="block"
            m="auto"
            px={3}
            pt={3}
            width={400}
            border={0.2}
            borderRadius={4}
            boxShadow={6}
          >
            <Box
              flexGrow={1}
              display="flex"
              py={2}
              px={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="h6">Sign Up</Typography>
              <Link
                href="/"
                sx={{
                  fontSize: { xs: "9pt", sm: "9pt", md: "10pt" },
                  textDecoration: "none",
                  mt: 1
                }}
              >
                I already have an account
              </Link>
            </Box>

            {/* ─────────────────────────────────────────────
              User Details Fields (Card ID, Username, Email, Phone)
              ───────────────────────────────────────────── */}
            <Box px={3} mb={3}>
              <TextField
                fullWidth
                // required
                variant="outlined"
                size="small"
                label="Card ID"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                sx={{ mb: 2.5 }}
              />

              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label="User Name"
                aria-autocomplete="none"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ mb: 2.5 }}
              />

              <TextField
                fullWidth
                // required
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                // required
                variant="outlined"
                size="small"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ mb: 2.5 }}
              />
              {/* <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label="Birth Date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  mb: 2.5,
                }}
              /> */}

              <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
                <InputLabel id="demo-select-small-label">User Role</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={userRole}
                  label="User Role"
                  onChange={(e) => setUserRole(e.target.value)} // Fixed onChange function
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
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
                  ),
                }}
              />
            </Box>

            {/* ─────────────────────────────────────────────
              Birth Date & Password
              ───────────────────────────────────────────── */}
            {/* <Box px={3} mb={3}> */}

            {/* </Box> */}

            {/* ─────────────────────────────────────────────
              Keep Me Signed In Checkbox & Forgot Password
              ───────────────────────────────────────────── */}
            <Box display="block" px={3} mb={3}>
              {/* ─────────────────────────────────────────────
                Submit Button
                ───────────────────────────────────────────── */}
              <Box display="block" justifyContent="center" py={2}>
                <Button
                  onClick={handleSignUp}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit
                </Button>
              </Box>

              <Divider sx={{ pb: 1 }}>Powered by Burhan Azem</Divider>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );

};
export default SignUp;
