import {Routes, Route} from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import MyHouses from "./pages/MyHouses";
import EditHouse from "./pages/EditHouse";
import Home from "./pages/Home";
import SidebarAdmin from "./components/SidebarAdmin";
import ListUser from "./components/ListUser";
import Page404 from "./pages/404";
import {useSelector} from "react-redux";
import ChangePassword from "./pages/ChangePassword";

import UpRole2 from "./pages/UpRole2";
import VendorDetail from "./components/admin/VendorDetail";
import ShowVendor from "./components/admin/ShowVendor";
import EditProfile from "./components/EditProfile";
import UpRoleUserToVendor from "./components/admin/UpRoleUserToVendor";

function App() {
    let account = useSelector(state => state.account.account);

    return (
        <>
            <Routes>
                <Route path="" element={<Master/>}>
                    <Route index element={<Home/>}></Route>
                    {account !== null && account.role.id === 1 &&
                        <Route path="admin" element={<SidebarAdmin/>}>
                            <Route path={'vendors'} element={<ShowVendor/>}></Route>
                            <Route path={'vendor/detail/:id'} element={<VendorDetail/>}></Route>
                            <Route path={'vendor/upRole/:id'} element={<UpRoleUserToVendor/>}></Route>
                            <Route index element={<ListUser/>}/>
                        </Route>
                    }
                    {account !== null && account.role.id === 2 &&
                        <Route path="host" element={<Host/>}>
                            <Route path="create_house" element={<CreateHouse/>}></Route>
                            <Route index element={<MyHouses/>}></Route>
                            <Route path="edit_house/:indexHouseEdit" element={<EditHouse/>}></Route>
                        </Route>
                    }
                    {account !== null && account.role.id === 3 &&
                        <Route path={"user"} element={<UpRole2/>}></Route>
                    }
                    <Route path={'/edit_profile/:id'} element={<EditProfile/>}></Route>
                    <Route path={"changePassword"} element={<ChangePassword></ChangePassword>}></Route>
                </Route>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </>
    );
}

export default App;
