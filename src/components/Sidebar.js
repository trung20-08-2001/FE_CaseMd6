import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate} from 'react-router-dom'
import { login } from '../services/accountService'
import { useDispatch } from 'react-redux'
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HomeIcon from '@mui/icons-material/Home';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PeopleIcon from '@mui/icons-material/People';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import BackupIcon from '@mui/icons-material/Backup';

function Sidebar() {

    const account = useSelector(state => state.account.account)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('account');
        dispatch(login(null))
        navigate('/')
    }

    return (
        <>

            <div className='row' >
                <div className="col-3 offcanvas offcanvas-start w-25" style={{backgroundColor:"#F5F5F5", maxWidth:"20%", padding:"0px",boxShadow: "2px 0px 2px rgba(0, 0, 0, 0.2)"}} tabIndex={-1} id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
                    <div className="offcanvas-body" style={{padding:"0px"}}>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu" style={{padding:"0px",maxHeight:"650", textIndent: "30px",overflowY: "auto"}}>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link text-truncate">
                                    <HomeIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Home</h5>
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink to={`/myaccount/profile/${account.id}`} className="nav-link text-truncate">
                                    <AccountCircle />
                                    <h5 className="ms-1 d-none d-sm-inline">My profile</h5>
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink to={`/myaccount/edit_profile/${account.id}`} className="nav-link text-truncate">
                                    <EditIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Edit profile</h5>
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink to={"/myaccount/changePassword"} className="nav-link text-truncate">
                                    <ChangeCircleIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Change password</h5>
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                        <NavLink to={`/myaccount/bills_user/${account.id}`} className="nav-link text-truncate">
                                            <HistoryIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Transaction history</h5>
                                        </NavLink>
                                    </li>
                            {account.role.id === 1 &&
                                <>

                                    <li className="nav-item">
                                        <NavLink to="/myaccount/account_user" className="nav-link text-truncate">
                                            <PeopleIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Accounts user</h5>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item" >
                                        <NavLink to="/myaccount/vendors" className="nav-link text-truncate">
                                            <PeopleIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Accounts host</h5>
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {account && account.role.id === 2 &&
                                <>
                                    <li className="nav-item" >
                                        <NavLink to="/myaccount/host" className="nav-link text-truncate">
                                            <HolidayVillageIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">My houses</h5>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item" >
                                        <NavLink to="/myaccount/create_house" className="nav-link text-truncate">
                                            <AddBusinessIcon/>
                                            <h5 className="ms-1 d-none d-sm-inline">Create houses</h5>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item" >
                                        <NavLink to={`/myaccount/bills_vendor/${account.id}`} className="nav-link text-truncate">
                                            <HistoryIcon/>
                                            <h5 className="ms-1 d-none d-sm-inline">Renting a house</h5>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item" >
                                        <NavLink to="/myaccount/income" className="nav-link text-truncate">
                                            <BarChartIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Revenue</h5>
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {account && account.role.id === 3 &&
                                <>
                                    <li className="nav-item" >
                                        <NavLink to={"/myaccount/user"} className="nav-link text-truncate">
                                            <BackupIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Become a host</h5>
                                        </NavLink>
                                    </li>
                                </>
                            }
                            <li className="nav-item" style={{textIndent: "15px", cursor:"pointer"}}>
                                <a className="nav-link text-truncate"
                                    onClick={handleLogout}
                                >
                                    <i className="fs-20 bi-box-arrow-left" />
                                    <h5 className="ms-1 d-none d-sm-inline">Log out</h5>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="container-fluid col-9">
                    <div className="container">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidebar
