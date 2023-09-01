import { AppBar, Avatar, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getRequest, currentBranch as currentBranchSlice } from "../../../redux/modules/branch/slice";

const Header = ({ drawerWidth, handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let { userData } = useSelector(state => state.auth);
  let { loading, getRes, currentBranch } = useSelector(state => state.branch);

  useEffect(() => {
    if (!currentBranch) {
      dispatch(getRequest());
    }
  }, [dispatch, currentBranch])

  useEffect(() => {
    if (getRes?.success && !currentBranch && location.pathname !== "/admin/settings/branches") {
      navigate("/admin/settings/branches")
    }
  }, [getRes, currentBranch, location, navigate, loading])

  const ChangeBranch = (e) => {
    dispatch(currentBranchSlice(e.target.value))
  }
  return (
    <AppBar color="secondary" position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction="row" spacing={2} >
          <Typography variant="h6" noWrap component="div" >
            Responsive drawer
          </Typography>
          <Box>
            <FormControl>
              <InputLabel id="demo-multiple-name-label">Branch</InputLabel>
              <Select value={currentBranch || ""} defaultValue={currentBranch || ""} label="Select an Option" onChange={ChangeBranch} >
                {getRes?.data?.map((elem) => <MenuItem key={elem._id} value={elem._id}>{elem.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Tooltip title={userData.name}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={userData.name} />
            </IconButton>
          </Tooltip>
        </Stack>

      </Toolbar>
    </AppBar>
  )
}
export default Header;