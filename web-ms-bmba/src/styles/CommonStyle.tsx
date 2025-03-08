export type Theme = "light" | "dark";

export const themes = {
  light: {
    sidebar: {
      backgroundColor: "#FFFFFF", // White Sidebar
      color: "#37475A", // AWS Sidebar Text
    },
    headerFooterColor: {
      backgroundColor: "#F3F3F3", // Light AWS Header
      color: "#232F3E",
    },
    menu: {
      menuContent: "#F7F8FC",
      icon: "#FF9900", // AWS Orange
      hover: {
        backgroundColor: "#F0C14B", // AWS Yellow Hover
        color: "#232F3E",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#232F3E", // AWS Dark Sidebar
      color: "#EAEDED", // AWS Sidebar Text
    },
    headerFooterColor: {
      backgroundColor: "#131A22", // AWS Dark Header
      color: "#EAEDED",
    },
    menu: {
      menuContent: "#1A2530", // Darker Sidebar Menu
      icon: "#FF9900", // AWS Orange
      hover: {
        backgroundColor: "#FFB74D", // Lighter Orange Hover
        color: "#EAEDED",
      },
      disabled: {
        color: "#4D5D67",
      },
    },
  },
};

export const color = {
  awsOrange: "#FF9900",
  awsYellow: "#F0C14B",
  awsBlueGray: "#232F3E",
  awsDarkBackground: "#131A22",
  brightBlue: "#3498db",
  darkGrayishBlue: "#8b8d94",
  darkRed: "#a90000",
  grayishBlue: "#A4A6B3",
  grayishBlue2: "#9fa2b4",
  grayishBlue3: "#bdc3c7",
  lightBlue: "#3751FF",
  lightGrayishBlue: "#F7F8FC",
  lightGrayishBlue2: "#DFE0EB",
  paleBlue: "#DDE2FF",
  paleBlueTransparent: "rgba(221, 226, 255, 0.08)",
  veryDarkGrayishBlue: "#373a47",
};

export const typography = {
  cardTitle: {
    fontWeight: "bold",
    fontSize: 19,
    lineHeight: "24px",
    letterSpacing: "0.4px",
  },
  smallSubtitle: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.1px",
  },
  link: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: "#0073BB", // ✅ AWS Blue Link Color
    textAlign: "right",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": {
      color: "#00518A", // ✅ Darker AWS Blue on Hover
    },
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0.2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "30px",
    letterSpacing: 0.3,
  },
};













// export type Theme = 'light' | 'dark';

// export const themes = {
//   light: {
//     sidebar: {
//       backgroundColor: '#ffffff',
//       color: '#607489',
//     },
//     headerFooterColor: {
//       backgroundColor: '#417eb8d5',
//       color: '#00203f32',
//     },
//     menu: {
//       menuContent: '#fbfcfd',
//       icon: '#0098e5',
//       hover: {
//         backgroundColor: '#c5e4ff',
//         color: '#44596e',
//       },
//       disabled: {
//         color: '#9fb6cf',
//       },
//     },
//   },
//   dark: {
//     sidebar: {
//       backgroundColor: '#0b2948',
//       color: '#8ba1b7',
//     },
//     headerFooterColor: {
//       backgroundColor: '#00203f32',
//       color: '#8ba1b7',
//     },
//     menu: {
//       menuContent: '#082440',
//       icon: 'white',
//       hover: {
//         backgroundColor: '#00458b',
//         color: '#b6c8d9',
//       },
//       disabled: {
//         color: '#3e5e7e',
//       },
//     },
//   },
// };

// export const color = {
//   brightBlue: '#3498db',
//   darkGrayishBlue: '#8b8d94',
//   darkRed: '#a90000',
//   grayishBlue: '#A4A6B3',
//   grayishBlue2: '#9fa2b4',
//   grayishBlue3: '#bdc3c7',
//   lightBlue: '#3751FF',
//   lightGrayishBlue: '#F7F8FC', 
//   lightGrayishBlue2: '#DFE0EB',
//   paleBlue: '#DDE2FF',
//   paleBlueTransparent: 'rgba(221, 226, 255, 0.08)',
//   veryDarkGrayishBlue: '#373a47'
// };

// export const typography = {
//   cardTitle: {
//       fontWeight: 'bold',
//       fontSize: 19,
//       lineHeight: '24px',
//       letterSpacing: '0.4px'
//   },
//   smallSubtitle: {
//       fontSize: 12,
//       lineHeight: '16px',
//       letterSpacing: '0.1px'
//   },
//   link: {
//       fontWeight: '600',
//       fontSize: 14,
//       lineHeight: '20px',
//       letterSpacing: '0.2px',
//       color: color.lightBlue,
//       textAlign: 'right',
//       cursor: 'pointer',
//       textDecoration: 'underline',
//       '&:hover': {
//           color: color.grayishBlue
//       }
//   },
//   itemTitle: {
//       fontWeight: 600,
//       fontSize: 14,
//       lineHeight: '20px',
//       letterSpacing: 0.2
//   },
//   title: {
//       fontWeight: 'bold',
//       fontSize: 24,
//       lineHeight: '30px',
//       letterSpacing: 0.3
//   }
// };
