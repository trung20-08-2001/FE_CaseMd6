import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Host from "./components/Host";
import Income from "./components/Revenue";
import ListUser from "./components/admin/ListUser";
import SidebarAdmin from "./components/SidebarAdmin";
import UserTransactionHistory from "./components/UserTransactionHistory";
import ShowVendor from "./components/admin/ShowVendor";
import UpRoleUserToVendor from "./components/admin/UpRoleUserToVendor";
import VendorDetail from "./components/admin/VendorDetail";
import Master from "./components/layout/Master";
import Page404 from "./pages/404";
import ChangePassword from "./pages/ChangePassword";
import CreateHouse from "./pages/CreateHouse";
import EditHouse from "./pages/EditHouse";
import Home from "./pages/Home";
import MyHouses from "./pages/MyHouses";
import UpRole2 from "./pages/UpRole2";
import Login from "./pages/login_register/Login";
import Register from "./pages/login_register/Register";
import SideBar from "./pages/Sidebar";

function App() {
    let account = useSelector(state => state.account.account);

    return (
        <>
            <Routes>
                <Route path="" element={<Master />}>
                    <Route index element={<Home />}></Route>
                    {account &&
                        <>
                            <Route path="myaccount" element={<SideBar />}>
                                <Route path={"changePassword"} element={<ChangePassword></ChangePassword>}></Route>
                                <Route path={'edit_profile/:id'} element={<EditProfile />}></Route>
                                {account.role.id === 1 &&
                                    <>
                                        <Route path={'vendors'} element={<ShowVendor />}></Route>
                                        <Route path={'vendor/detail/:id'} element={<VendorDetail />}></Route>
                                        <Route path={'vendor/upRole/:id'} element={<UpRoleUserToVendor />}></Route>
                                        <Route path="account_user" element={<ListUser />} />
                                    </>
                                }
                                {account.role.id === 2 &&
                                    <>
                                        <Route path="create_house" element={<CreateHouse />}></Route>
                                        <Route path="host" element={<MyHouses />}></Route>
                                        <Route path="edit_house/:indexHouseEdit" element={<EditHouse />}></Route>
                                        <Route path="income" element={<Income />}></Route>
                                        <Route path="create_house" element={<CreateHouse />}></Route>
                                        <Route path="edit_house/:indexHouseEdit" element={<EditHouse />}></Route>
                                    </>
                                }
                                {account.role.id === 3 &&
                                    <>
                                        <Route path={"user"} element={<UpRole2 />}></Route>
                                        <Route path={'bills_user/:id'} element={<UserTransactionHistory />}></Route>
                                    </>
                                }
                            </Route>
                        </>
                    } 
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default App;
