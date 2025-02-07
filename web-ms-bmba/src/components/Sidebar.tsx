import {
  FC,
  ReactElement
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar
} from "react-pro-sidebar";
import {
  MenuOutlined,
  HomeOutlined,
  InfoOutlined,
  RestaurantMenuOutlined,
  SecurityOutlined,
  FoodBankOutlined,
  SearchOutlined,
  RecommendOutlined,
  Settings,
  ProductionQuantityLimitsOutlined,
  Category,
  ShopOutlined,
  ShoppingCart,
  Groups,
  Engineering,
  Inventory,
  Inventory2,
  Inventory2Outlined,
  Paid,
  Summarize,
} from "@mui/icons-material";
import {
  BadgeMark,
  Box,
  Typography,
  useTheme
} from "@mui/material";
import { SidebarFooter } from "./SidebarFooter";
import { Badge } from "./Badge";
import {
  useSidebar,
  useSidebarSelectedMenuTitleContext,
  useTemplateThemeModeContext,
} from "../hooks";
import { TemplateThemeModeContextType } from "../context";
import Group from "../pages/security/authorization/group";


const SideBar: FC = (): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { collapsed } = useProSidebar();
  const {
    toggle,
    menuItemStyles,
  } = useSidebar();
  const { setMenuTitle } = useSidebarSelectedMenuTitleContext();
  const { isDark } = useTemplateThemeModeContext() as TemplateThemeModeContextType;

  const menuItemMouseUpHandler = (mnuTitle: string) => {
    setMenuTitle(mnuTitle)
  }
  return (
    <Sidebar
      rtl={false}
      breakPoint="sm"
      width="180px"
      collapsedWidth="80px"

      transitionDuration={800}
      style={{ height: "100vh" }}
      backgroundColor={'white'}
      rootStyles={{
        color: isDark ? theme.palette.primary.dark : theme.palette.primary.light
        // color: color, isDark ? theme.palette.success.dark : theme.palette.success.light
      }}
    >
      <Menu >
        <MenuItem
          id="sidebarMnuHeader"
          style={{
            textAlign: "center",
            height: 40,
            marginTop: 0,
            backgroundColor: 'white',
            // backgroundColor: isDark ? theme.palette.info.dark : theme.palette.info.light
          }}
          icon={<MenuOutlined sx={{
            color: isDark ? theme.palette.primary.dark : theme.palette.primary.light
            , width: 16
          }} />}
          onClick={() => {
            toggle();
          }}
        >
          {" "}

          
        </MenuItem>
      </Menu>
      {/* <div style={{ flex: 1, marginBottom: '32px' }}> style={{ marginBottom: '24px', marginTop: '16px' }}*/}
      <Box sx={{ p: '0 24px', mb: '8px', mt: '8px' }}>
        <Typography
          variant="body2"
          fontWeight={600}
          style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
        >
          General
        </Typography>
      </Box>
      {/* component="Link" href="/" */}
      <Menu menuItemStyles={menuItemStyles} >
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<HomeOutlined style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Home
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Category style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('products'))}
          onMouseUp={() => menuItemMouseUpHandler('Products')}
        >
          Products
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<ShoppingCart style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          SalesOperations
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Groups style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Customers
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Engineering style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Employees
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Inventory2Outlined style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Suppliers
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Paid style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Debits
        </MenuItem>
        <MenuItem
          style={{ fontSize: '12px' }}
          icon={<Summarize style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />}
          onClick={() => (navigate('/', { replace: true }))}
          onMouseUp={() => menuItemMouseUpHandler('Home')}
        >
          Reports
        </MenuItem>
        {/* <SubMenu icon={<ProductionQuantityLimitsOutlined style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />} label="Products">
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('baseinfo/company', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Company')}>Company</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('baseinfo/department', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Department')}>Department</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('baseinfo/employee', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Employee')}>Employee</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('baseinfo/jobPosition', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('JobPosition')}>JobPosition</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('baseinfo/Project', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Project')}>Project</MenuItem>
        </SubMenu>
        <SubMenu icon={<RestaurantMenuOutlined style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />} label="Restaurant">
          <MenuItem
            style={{ fontSize: '12px' , backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light}}
            onClick={() => navigate('restaurant/meal', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Meal')}>Meal</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light }}
            onClick={() => navigate('restaurant/mealssettingmonthly', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Meals Setting Monthly')}>Meals Setting Monthly</MenuItem>
          <MenuItem
            style={{ fontSize: '12px', backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.light}}
            onClick={() => navigate('restaurant/mealsselectioncurrentmonth', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Select Current Month Meals')}>Select Current Month Meals</MenuItem>
          <MenuItem onClick={() => navigate('restaurant/mealsselectionnextmonth', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Select Next Month Meals')}>Select Next Month Meals</MenuItem>
        </SubMenu>
        <SubMenu icon={<SecurityOutlined style={{ width: '18px', color: isDark ? theme.palette.primary.dark : theme.palette.primary.light }} />} label="Security">
          <MenuItem onClick={() => navigate('security/user', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Users')}>Users</MenuItem>
          <MenuItem onClick={() => navigate('security/group', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Groups')}>Groups</MenuItem>
          <MenuItem onClick={() => navigate('security/permission', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Permissions')}>Permissions</MenuItem>
          <MenuItem onClick={() => navigate('security/grouppermission', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('Group Permissions')}>Group Permissions</MenuItem>
          <MenuItem onClick={() => navigate('security/usergroup', { replace: true })}
            onMouseUp={() => menuItemMouseUpHandler('User and Group')}>User and Group</MenuItem>
        </SubMenu>

        <Box sx={{ py: '0', px: '24px', mb: '8px', mt: '32px' }}>
          <Typography
            variant="body2"
            fontWeight={600}
            style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
          >
            Extra
          </Typography>
        </Box>

        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem icon={<FoodBankOutlined style={{ width: '18px' }} />} suffix={<Badge variant="success">New</Badge>}>
            New Courses
          </MenuItem>
          <SubMenu icon={<SearchOutlined style={{ width: '18px' }} />} label="User Survey">
            <MenuItem>January</MenuItem>
            <MenuItem>February</MenuItem>
            <MenuItem>March</MenuItem>
          </SubMenu>
          <MenuItem disabled icon={<RecommendOutlined style={{ width: '18px' }} />}>
            Examples
          </MenuItem>
        </Menu>
        <MenuItem
          icon={<Settings />}
          onClick={() => navigate('/config', { replace: true })}
          onMouseUp={() => menuItemMouseUpHandler('Template Configuration')}
        >
          Template Config
        </MenuItem> */}
      </Menu>
      {/* <SidebarFooter collapsed={collapsed}/> */}
    </Sidebar>
  )
}

export default SideBar;