import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { NavLink } from "react-router-dom";



const navList = [
    {
        navIcon: <InboxIcon />,
        navText: "Dashboard",
        navLink: "admin",
    },
    {
        navIcon: <InboxIcon />,
        navText: "Patient Management",
        navLink: "admin",
    }
]

const drawer = (
    <div>
        <Toolbar />
        <Divider />
        <List>
            {navList.map((item) => (
                <ListItem key={item.navText} disablePadding>
                    <ListItemButton component={NavLink} to={`/${item.navLink}`}>
                        <ListItemIcon>
                            {item.navIcon}
                        </ListItemIcon>
                        <ListItemText primary={item.navText} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </div>
);

const SideNav = ({ drawerWidth, handleDrawerToggle, mobileOpen }) => {
    return (
        <Box
            component="nav"
            sx={{  width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                //   container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: 'primary.main', },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: 'primary.main', },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default SideNav