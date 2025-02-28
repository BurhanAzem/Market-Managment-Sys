import React, { useState, useCallback, useEffect } from "react";
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
  CircularProgress,
  Checkbox,
  TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store/hooks";
import { loginAuth } from "../../../redux/features/authSlice";
import { RootState } from "../../../redux/store/store";
import { size } from "lodash";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize navigation

  const isAuthenticated = useSelector((state: RootState) => state.auth.authToken != "");
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [cardId, setCardId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLoginIdentifierMethod, setSelectedLoginIdentifierMethod] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    dispatch(loginAuth({ cardId, email, phoneNumber, password }));
    console.log("Login Dispatch Called")
  };

  // Redirect to home if login is successful
  useEffect(() => {
    if (isAuthenticated) {
      console.log("ye sssss");
      
      navigate("/"); // Change "/home" to your desired route
    }
  }, [isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <Box mt={30} display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          display="block"
          m="auto"
          px={3}
          pt={3}
          width={400}
          border={1}
          borderRadius={4}
          boxShadow={12}
        >
          <Box
            flexGrow={1}
            display="flex"
            py={2}
            px={3}
            justifyContent="space-between"
            sx={{ backgroundColor: "inherit" }} // ✅ Correct way to style Box
          >

            <Typography variant="h6">Login</Typography>
            <Link href="/auth/signup" sx={{ fontSize: "10pt", textDecoration: "none", mt: 1 }}>
              Don't have an account?
            </Link>
          </Box>
          {selectedLoginIdentifierMethod === "" ? (
            <Box>


              <Box px={3} mb={3}>
                <Box fontSize={13} textAlign={"center"} py={0}>
                  Choose a suitable login method!
                </Box>
                <Box py={2}>
                  <Button variant="contained" fullWidth onClick={() => setSelectedLoginIdentifierMethod("email")}>Email</Button>
                </Box>
                <Box py={2}>
                  <Button variant="contained" fullWidth onClick={() => setSelectedLoginIdentifierMethod("cardId")}>Card ID</Button>
                </Box>
                <Box py={2}>
                  <Button variant="contained" fullWidth onClick={() => setSelectedLoginIdentifierMethod("phone")}>Phone Number</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box px={3} mb={3}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel htmlFor="outlined-input-login">
                    {selectedLoginIdentifierMethod === "email"
                      ? "Email Address"
                      : selectedLoginIdentifierMethod === "cardId"
                        ? "Card ID"
                        : selectedLoginIdentifierMethod === "phone"
                          ? "Phone Number"
                          : "Unknown"}
                  </InputLabel>

                  <OutlinedInput
                    id="outlined-input-login" // ✅ Match with InputLabel's htmlFor
                    type="text"
                    value={
                      selectedLoginIdentifierMethod === "email"
                        ? email
                        : selectedLoginIdentifierMethod === "cardId"
                          ? cardId
                          : selectedLoginIdentifierMethod === "phone"
                            ? phoneNumber
                            : ""
                    }
                    onChange={(e) => {
                      if (selectedLoginIdentifierMethod === "email") {
                        setEmail(e.target.value);
                      } else if (selectedLoginIdentifierMethod === "cardId") {
                        setCardId(e.target.value);
                      } else if (selectedLoginIdentifierMethod === "phone") {
                        setPhoneNumber(e.target.value);
                      }
                    }}
                    label={
                      selectedLoginIdentifierMethod === "email"
                        ? "Email Address"
                        : selectedLoginIdentifierMethod === "cardId"
                          ? "Card ID"
                          : selectedLoginIdentifierMethod === "phone"
                            ? "Phone Number"
                            : "Unknown"
                    } 
                  />
                </FormControl>


                <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
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

                <Box display="flex" justifyContent="space-between" pt={1}>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Keep me signed in"
                  />
                  <Link href="/auth/forgetpassword" sx={{ mt: 1, fontSize: "10pt", textDecoration: "none" }}>
                    Forgot Password?
                  </Link>
                </Box>

                <Box py={2}>
                  <Button onClick={handleLogin} fullWidth variant="contained" color="primary">
                    Login
                  </Button>
                </Box>

                <Divider sx={{ pb: 1, fontSize: "8pt" }}>Powered by Burhan Azem</Divider>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default SignIn;
