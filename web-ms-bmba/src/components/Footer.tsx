import { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useTemplateThemeModeContext } from "../hooks";
import { TemplateThemeModeContextType } from "../context";

export const Footer: FC = (): ReactElement => {
  const theme = useTheme()
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;
  return (
    <Box
      id="footer"
      sx={{
        width: "100%",
        height: "%8",
        backgroundColor: isDark ? theme.palette.info.main : theme.palette.info.main,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12} m={1}>
            <Typography 
            color={ isDark ? theme.palette.success.dark : theme.palette.success.light} 
            variant="subtitle2">
              {`Supermarket Managment System ${new Date().getFullYear()} Powerd By --`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
