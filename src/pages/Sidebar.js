import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
            <div className='row'>
                <div className="col-2 offcanvas offcanvas-start w-25 " tabIndex={-1} id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
                    <div className="offcanvas-body px-1">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-truncate">
                                    <HomeIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Home</h5>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-truncate">
                                    <AccountCircle />
                                    <h5 className="ms-1 d-none d-sm-inline">My profile</h5>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/myaccount/edit_profile/${account.id}`} className="nav-link text-truncate">
                                    <EditIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Edit profile</h5>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/myaccount/changePassword"} className="nav-link text-truncate">
                                    <ChangeCircleIcon />
                                    <h5 className="ms-1 d-none d-sm-inline">Change password</h5>
                                </Link>
                            </li>
                            {account.role.id === 1 &&
                                <>

                                    <li className="nav-item">
                                        <Link to="/myaccount/account_user" className="nav-link text-truncate">
                                            <PeopleIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Accounts user</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/myaccount/vendors" className="nav-link text-truncate">
                                            <PeopleIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Accounts host</h5>
                                        </Link>
                                    </li>
                                </>
                            }
                            {account && account.role.id === 2 &&
                                <>
                                    <li className="nav-item">
                                        <Link to="/myaccount/host" className="nav-link text-truncate">
                                            <HolidayVillageIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">My houses</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/myaccount/create_house" className="nav-link text-truncate">
                                            <AddBusinessIcon/>
                                            <h5 className="ms-1 d-none d-sm-inline">Create houses</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/myaccount/bills_vendor/${account.id}`} className="nav-link text-truncate">
                                            <HistoryIcon/>
                                            <h5 className="ms-1 d-none d-sm-inline">Renting a House</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/myaccount/income" className="nav-link text-truncate">
                                            <BarChartIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Revenue</h5>
                                        </Link>
                                    </li>
                                </>
                            }
                            {account && account.role.id === 3 &&
                                <>
                                   
                                    <li className="nav-item">
                                        <Link to={`/myaccount/bills_user/${account.id}`} className="nav-link text-truncate">
                                            <HistoryIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Transaction history</h5>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/myaccount/user"} className="nav-link text-truncate">
                                            <BackupIcon />
                                            <h5 className="ms-1 d-none d-sm-inline">Become a host</h5>
                                        </Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
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
                <div className="container-fluid col-10">
                    <div className="container">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidebar
