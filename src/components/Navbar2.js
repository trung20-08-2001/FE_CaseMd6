import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
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
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../services/accountService';


const Search = styled('div')(({ theme }) => ({
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
            }
            }
        >
            <Link ><MenuItem>My profile</MenuItem></Link>
            {account && account.role.id === 1 &&
                <>
                    <Link to="account_user" onClick={()=>setAnchorEl(null)} ><MenuItem>Account user</MenuItem></Link>
                    <Link to="account_host" onClick={()=>setAnchorEl(null)}><MenuItem>Account host</MenuItem></Link>
                    <Link to={`/edit_profile/${account.id}`} onClick={()=>setAnchorEl(null)}><MenuItem>Edit profile</MenuItem></Link>
                </>
            }
            {account && account.role.id === 2 &&
                <>
                    <Link to="host" onClick={()=>setAnchorEl(null)}><MenuItem>My houses</MenuItem></Link>
                    <Link to={`/edit_profile/${account.id}`} onClick={()=>setAnchorEl(null)}><MenuItem>Edit profile</MenuItem></Link>
                    <Link to={"changePassword"} onClick={()=>setAnchorEl(null)}><MenuItem>Change password</MenuItem></Link>
                </>
            }
            {account && account.role.id === 3 &&
                <>
                    <Link to={`/edit_profile/${account.id}`} onClick={()=>setAnchorEl(null)}><MenuItem>Edit profile</MenuItem></Link>
                    <Link to={"changePassword"} onClick={()=>setAnchorEl(null)}><MenuItem>Change password</MenuItem></Link>
                    <Link to={`/bills_user/${account.id}`}><MenuItem>Transaction history</MenuItem></Link>
                    <Link to={"/user"} onClick={()=>setAnchorEl(null)}><MenuItem>UP Role</MenuItem></Link>
                </>
            }
            <MenuItem onClick={handleMenuClose} >Log out</MenuItem>
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
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={0} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <AccountCircle />
                    </Badge>
                </IconButton>
                <Link to="myaccount"><p>My account</p></Link>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={0} color="error">
                        <AccountCircle />
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            aria-label="open drawer"
                            color={"white"}
                            sx={{ display: { xs: 'block', sm: 'block' } }}
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
                    <Box sx={{ flexGrow: 1 }} />
                    {account ?
                        <>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={0} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={0} color="error">
                                        <NotificationsIcon />
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
                                >
                                    <Avatar alt={account.username} src={account.avatar} />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
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
                                sx={{ display: { xs: 'block', sm: 'block' } }}
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

    );
}
