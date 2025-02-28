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
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useTemplateThemeModeContext } from "../../../hooks";
import { TemplateThemeModeContextType } from "../../../context";
// import { signUpAuth } from '../../../redux/features/authSlice'; // Example
import { useAppDispatch } from "../../../redux/store/hooks";
import { IUser } from "../../../models/user"; // Ensure this path is correct

const SignUp: FC = (): ReactElement => {
  const isLoading = false; // Replace with Redux state if needed
  const dispatch = useAppDispatch();

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
  const [birthDate, setBirthDate] = useState<string>(""); // stored as string
  const [password, setPassword] = useState<string>("");
  const [identifierIsRequiredMessage, setIdentifierIsRequiredMessage] = useState<string>("");


  const theme = useTheme();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const handleSignUp = () => {
    if (email == "" && cardId == "" && phoneNumber == "")
      setIdentifierIsRequiredMessage("You should enter at least one of the following values: cardId, email, or phoneNumber")
    else {
      const newUser: Partial<IUser> = {
        cardId,
        userName,
        email,
        phoneNumber,
        birthDate,
      };

      console.log("Signing up user:", newUser);

    }


    // Example: dispatch a signup action
    // dispatch(signUpAuth({ ...newUser, password }));
  };

  return (
    <>
      {isLoading ? (
        <Box mt={30} display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"}>
          {identifierIsRequiredMessage && (
            <Alert severity="warning">{identifierIsRequiredMessage}</Alert>
          )}
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
                required
                variant="outlined"
                size="small"
                label="Card ID"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                sx={{ mb: 2 }}
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
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                required
                variant="outlined"
                size="small"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>

            {/* ─────────────────────────────────────────────
              Birth Date & Password
              ───────────────────────────────────────────── */}
            <Box px={3} mb={3}>
              <TextField
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
                  mb: 2,
                  "& .MuiInputBase-root": { height: "35px" }, // Reduce height
                  "& .MuiOutlinedInput-input": { py: "6px" }, // Adjust padding
                  fontSize: "0.875rem"
                }}
              />

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
              Keep Me Signed In Checkbox & Forgot Password
              ───────────────────────────────────────────── */}
            <Box display="block" px={3} mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                pt={1}
                flexGrow={1}
              >
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Keep me signed in"
                />
                <Link
                  href="/auth/forgetpassword"
                  sx={{ mt: 1, textDecoration: "none" }}
                >
                  Forget Password?
                </Link>
              </Box>

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
