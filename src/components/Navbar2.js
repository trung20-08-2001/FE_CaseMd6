import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {login} from '../services/accountService';
import EditIcon from '@mui/icons-material/Edit';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PeopleIcon from '@mui/icons-material/People';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import BackupIcon from '@mui/icons-material/Backup';
import WebSocketConfig from "../config/configWebsocket";
import Notification from "../components/Notification"
import HomeIcon from "@mui/icons-material/Home";
import {Houseboat, HouseOutlined, LoginOutlined, LoginRounded} from "@mui/icons-material";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const account = useSelector(state => state.account.account)
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (account !== null) {
            WebSocketConfig.connect(account)
        }
        return () => {
            WebSocketConfig.disconnect();
        };
    }, []);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.target);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        if (account) {
            localStorage.removeItem('account');
            dispatch(login(JSON.parse(localStorage.getItem("account"))))
            navigate('/')
        }
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.target);
    };

    const menuId = 'primary-search-account-menu';
    const menuAdmin = [
        <Link to="myaccount/account_user" onClick={() => setAnchorEl(null)}><MenuItem>Accounts user</MenuItem></Link>,
        <Link to="myaccount/vendors" onClick={() => setAnchorEl(null)}><MenuItem>Accounts host</MenuItem></Link>,
        <Link to={`myaccount/edit_profile/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>Edit
            profile</MenuItem></Link>
    ]
    const menuHost = [
        <Link to={`myaccount/edit_profile/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>Edit
            profile</MenuItem></Link>,
        <Link to={"myaccount/changePassword"} onClick={() => setAnchorEl(null)}><MenuItem>Change
            password</MenuItem></Link>,
        <Link to="myaccount/host" onClick={() => setAnchorEl(null)}><MenuItem>My houses</MenuItem></Link>,
        <Link to="myaccount/create_house" onClick={() => setAnchorEl(null)}><MenuItem>Create houses</MenuItem></Link>,
        <Link to={`myaccount/bills_vendor/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>Renting a
            House</MenuItem></Link>,
        <Link to="myaccount/income" onClick={() => setAnchorEl(null)}><MenuItem>Revenue</MenuItem></Link>

    ]
    const menuUser = [
        <Link to={`myaccount/edit_profile/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>Edit
            profile</MenuItem></Link>,
        <Link to={"myaccount/changePassword"} onClick={() => setAnchorEl(null)}><MenuItem>Change
            password</MenuItem></Link>,
        <Link to={`myaccount/bills_user/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>Transaction
            history</MenuItem></Link>,
        <Link to={"myaccount/user"} onClick={() => setAnchorEl(null)}><MenuItem>UP Role</MenuItem></Link>
    ]

    const menuMobile = [
        <Link to={"myaccount/chat"} onClick={() => setMobileMoreAnchorEl(null)}>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="black">
                    <Badge badgeContent={0} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Chat</p>
            </MenuItem>
        </Link>,
        <MenuItem>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
            >
                <Badge badgeContent={0} color="error">
                    <NotificationsIcon/>

                </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>,
        <Link to={`/profile/${account?.id}`}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <AccountCircle/>
                    </Badge>
                </IconButton>
                <p>My profile</p>
            </MenuItem>
        </Link>,
        <Link to={`/myaccount/edit_profile/${account?.id}`}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <EditIcon/>
                    </Badge>
                </IconButton>
                <p>Edit profile</p>
            </MenuItem>
        </Link>,
        <Link to={"/myaccount/changePassword"}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <ChangeCircleIcon/>
                    </Badge>
                </IconButton>
                <p>Change password</p>
            </MenuItem>
        </Link>
    ]

    const menuMobileAdmin = [
        <Link to="/myaccount/account_user">
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <PeopleIcon/>
                    </Badge>
                </IconButton>
                <p>Accounts user</p>
            </MenuItem>
        </Link>,
        <Link to="/myaccount/vendors">
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <PeopleIcon/>
                    </Badge>
                </IconButton>
                <p>Accounts host</p>
            </MenuItem>
        </Link>
    ]


    const menuMobileHost = [
        <Link to="/myaccount/host">
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <HolidayVillageIcon/>
                    </Badge>
                </IconButton>
                <p>My houses</p>
            </MenuItem>
        </Link>,
        <Link to="/myaccount/create_house">
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <AddBusinessIcon/>
                    </Badge>
                </IconButton>
                <p>Create houses</p>
            </MenuItem>
        </Link>,
        <Link to={`/myaccount/bills_vendor/${account?.id}`}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <HistoryIcon/>
                    </Badge>
                </IconButton>
                <p>Renting a House</p>
            </MenuItem>
        </Link>,
        <Link to="/myaccount/income">
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <BarChartIcon/>
                    </Badge>
                </IconButton>
                <p>Revenue</p>
            </MenuItem>
        </Link>
    ]

    const menuMobileUser = [
        <Link to={`/myaccount/bills_user/${account?.id}`}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <HistoryIcon/>
                    </Badge>
                </IconButton>
                <p>Transaction history</p>
            </MenuItem>
        </Link>,
        <Link to={"/myaccount/user"}>
            <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <BackupIcon/>
                    </Badge>
                </IconButton>
                <p>Become a host</p>
            </MenuItem>
        </Link>
    ]
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={() => {
                setAnchorEl(null);
                handleMobileMenuClose();
            }}
        >
            <Link to={`/myaccount/profile/${account?.id}`} onClick={() => setAnchorEl(null)}><MenuItem>My profile</MenuItem></Link>
            {account?.role?.id === 1 && menuAdmin.map(item => item)}
            {account?.role?.id === 2 && menuHost.map(item => item)}
            {account?.role?.id === 3 && menuUser.map(item => item)}
            <Link to="myaccount/chat" onClick={() => setAnchorEl(null)}><MenuItem>Chat</MenuItem></Link>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {menuMobile.map(item => item)}
            {account?.role?.id === 1 && menuMobileAdmin.map(item => item)}
            {account?.role?.id === 2 && menuMobileHost.map(item => item)}
            {account?.role?.id === 3 && menuMobileUser.map(item => item)}
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <i className="fs-20 bi-box-arrow-left"/>
                    </Badge>
                </IconButton>
                <p onClick={handleMenuClose}>Log out</p>
            </MenuItem>

            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>My account</p>
            </MenuItem> */}
        </Menu>
    );

    return (
        <>
            <Box sx={{flexGrow: 1}} style={{zIndex:"99999"}}>
                <AppBar position="static" style={{backgroundColor: "#1e7e34", height:"100px", paddingTop:"20px"}}>
                    <Toolbar style={{paddingLeft:"70px", paddingRight:"70px"}}>
                        <Link to="">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                aria-label="open drawer"
                                color={"white"}
                                sx={{display: {xs: 'block', sm: 'block'}}}
                                style={{fontWeight:"bold"}}
                            >
                                BOOKING HOUSE
                            </Typography>
                        </Link>
                        {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            type='text'
                            placeholder="Address..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    */}
                        <Box sx={{flexGrow: 1}}/>
                        {account ?
                            <>
                                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                    <IconButton size="large" aria-label="show 4 new mails" color="black">
                                        <Link to={"/searchHouse"}><Badge badgeContent={0} color="error">
                                            <SearchIcon style={{color: "white"}}/>
                                        </Badge> </Link>
                                    </IconButton>
                                    <IconButton size="large" aria-label="show 4 new mails" color="black">
                                        <Link to="myaccount/chat">
                                            <Badge badgeContent={0} color="error">
                                                <MailIcon style={{color: "white"}}/>
                                            </Badge>
                                        </Link>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="black"
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <NotificationsIcon style={{color: "white"}}/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        style={{backgroundColor: "#1c7430", boxShadow: "0px 0px 4px #ffc107", borderRadius:"15px"}}
                                    >
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                            aria-label="open drawer"
                                            color={"white"}
                                            sx={{display: {xs: 'block', sm: 'block'}}}
                                            style={{fontSize: "15px",color: "#ffc107"}}
                                        >
                                            {account.fullName != null ? account.fullName : account.username}
                                        </Typography>
                                        <Avatar alt={account.username} src={account.avatar}/>
                                    </IconButton>
                                </Box>
                                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="black"
                                    >
                                        <MoreIcon/>
                                    </IconButton>
                                </Box>
                            </>
                            :
                            <Link to="login">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    aria-label="open drawer"
                                    color={"white"}
                                    sx={{display: {xs: 'block', sm: 'block'}}}
                                >
                                    LOGIN
                                </Typography>
                            </Link>
                        }
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <Notification></Notification>
        </>
    );
}
