import {Routes, Route} from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import MyHouses from "./pages/MyHouses";
import EditHouse from "./pages/EditHouse";
import EditProfile from "./components/EditProfile";
import ShowVendor from "./components/admin/ShowVendor";



function App() {
    let account = JSON.parse(localStorage.getItem("account"));

    return (
        <>
            <Routes>
                <Route path="" element={<Master/>}>
                    {account !== null && account.role.id === 2 &&
                        <Route path="host" element={<Host/>}>
                            <Route index element={<CreateHouse/>}></Route>
                            <Route path="my_houses" element={<MyHouses/>}></Route>
                            <Route path="edit_house" element={<EditHouse/>}></Route>
                            <Route path={'/:id'} element={<EditProfile/>}></Route>
                            <Route path={'/admin/vendors'} element={<ShowVendor/>}></Route>
                        </Route>
                    }
                </Route>
            </Routes>
        </>
    );
}

export default App;
