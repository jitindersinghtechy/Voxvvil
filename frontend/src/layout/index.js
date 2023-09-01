import { useEffect, useState } from "react";
import { logoutRequest } from "../redux/modules/auth/authSlice";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Box, Stack, Toolbar } from "@mui/material";
import SideNav from "../pages/adminDashboard/component/sideNav";
import Header from "../pages/adminDashboard/component/header";


const drawerWidth = 240;
export default function Layout({ layoutName, proctedRoute = false }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoggedIn, userData } = useSelector((state) => state.auth);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  


    useEffect(() => {
        if (proctedRoute) {
            if (isLoggedIn) {
                const currentTime = new Date().getTime() / 1000;
                const timeUntilExpiration = Math.floor(userData.exp - currentTime);
                if (timeUntilExpiration <= 0) {
                    dispatch(logoutRequest());
                } else {
                    let tokenExpiryTimer = setTimeout(() => {
                        toast("Session time expired please login again");
                        dispatch(logoutRequest());
                    }, timeUntilExpiration * 1000);
                    return () => {
                        clearTimeout(tokenExpiryTimer);
                    };
                }
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, proctedRoute, isLoggedIn, userData]);

    if (proctedRoute && !isLoggedIn) {
        return <Navigate to="login" />
    }

    if (layoutName === "admin") {
        // if (layoutName !== userData.role) { return <Navigate to={userData.role} /> }
        return (
            <>
                <Box sx={{ display: 'flex' }}>
                <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
                <SideNav drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    <Outlet />

                </Box>
                </Box>
            </>
        )
    }

    if (layoutName === "auth") {
        return (
            <>
                <Stack sx={{ height: "100vh" }} justifyContent="center">
                    <Outlet />
                </Stack>
            </>
        )
    }
    return (
        <Outlet />
    );
}