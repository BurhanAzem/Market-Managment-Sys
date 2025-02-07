import { FC, ReactElement, ReactNode } from "react";
import { Box, Card } from "@mui/material";

interface ContentProps {
    children: ReactNode;
}

export const Content: FC<ContentProps> = ({ children }): ReactElement => {
  var mnuHeaderHeight = document.getElementById("sidebarMnuHeader")?.clientHeight
  var footerHeight = document.getElementById("footer")?.clientHeight
  const height: string = 
    'calc(100% - ' 
    + (mnuHeaderHeight? mnuHeaderHeight : 0 + (footerHeight? footerHeight : 0)).toString() 
    + ')'
  return (
    <Box
        sx={{
            minHeight: height,
            maxWidth: "100vw",
            flexGrow: 1,
            overflowX: 'auto',
            // display: "flex",
            justifyContent: "center",
            width:{xs:'100%', sm:'95%', md:'93%', lg:'93%', xl:'93%'}, 
            // height:{xs:'100%', sm:'95%', md:'93%', lg:'93%', xl:'93%'}, 
            mt:'40px',
            mx:'auto', 
            // backgroundColor: 'white'
        }}
    >
      {/* <Card
        sx={{
          display:'flex',
          justifyContent:'center',
          my:'0',
          mx:'auto', 
          height:'100%', 
          width:{xs:'100%', sm:'90%', md:'90%', lg:'90%', xl:'90%'}, 
          boxShadow:15,
          // "10px 10px 10px #b6d4f9",
          // backgroundColor:'#e8f1fc',
        }}
      > */}
        {children}
      {/* </Card> */}
    </Box>
  )
}

export default Content;