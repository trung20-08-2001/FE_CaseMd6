import { Routes, Route } from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import MyHouses from "./pages/MyHouses";
import EditHouse from "./pages/EditHouse";
import Home from "./pages/Home";
import UpRole from "./pages/UpRole";
import ChangePassword from "./pages/ChangePassword";


function App() {
    let account = JSON.parse(localStorage.getItem("account"));

    return (
        <>
            <Routes>
                <Route path="" element={<Master />}>
                    <Route index element={<Home />}></Route>
                    {account !== null && account.role.id === 2 &&
                        <Route path="host" element={<Host />}>
                            <Route path="create_house" element={<CreateHouse />}></Route>
                            <Route index element={<MyHouses />}></Route>
                            <Route path="edit_house/:indexHouseEdit" element={<EditHouse />}></Route>
                        </Route>
                    }
                    <Route path={"user"} element={<UpRole/>}></Route>
                    <Route path={"changePassword"} element={<ChangePassword></ChangePassword>}></Route>
                </Route>

            </Routes>
        </>
    );
}

export default App;
