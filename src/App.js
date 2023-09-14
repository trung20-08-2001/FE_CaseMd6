import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Income from "./components/Revenue";
import ListUser from "./components/admin/ListUser";
import Master from "./components/layout/Master";
import Page404 from "./pages/404";
import ChangePassword from "./pages/ChangePassword";
import HouseDetail from "./pages/HouseDetail";
import CreateHouse from "./pages/CreateHouse";
import EditHouse from "./pages/EditHouse";
import Home from "./pages/Home";
import MyHouses from "./pages/MyHouses";
import UpRole2 from "./pages/UpRole2";
import Login from "./pages/login_register/Login";
import Register from "./pages/login_register/Register";
import SideBar from "./pages/Sidebar";
import VendorDetail from "./components/admin/VendorDetail";
import ShowVendor from "./components/admin/ShowVendor";
import EditProfile from "./components/EditProfile";
import UpRoleUserToVendor from "./components/admin/UpRoleUserToVendor";
import UserTransactionHistory from "./components/UserTransactionHistory";
import VendorTransactionHistory from "./components/VendorTransactionHistory";
import SeeReviews from "./pages/SeeReviews";
import SearchHouse from "./pages/SearchHouse";
import DataDisplay from "./pages/DataDisplay";

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
                                        <Route path="see_reviews/:idHouse" element={<SeeReviews/>}></Route>
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
                                        <Route path='bills_vendor/:id' element={<VendorTransactionHistory/>}></Route>
                                        <Route path="see_reviews/:idHouse" element={<SeeReviews/>}></Route>

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

                   <Route path={"houseDetail/:idHouse"} element={<HouseDetail></HouseDetail>}></Route>
                   <Route path={"searchHouse"} element={<SearchHouse></SearchHouse>}></Route>
                   <Route path={"loadData"} element={<DataDisplay></DataDisplay>}></Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default App;
