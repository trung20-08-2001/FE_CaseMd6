
import { Routes, Route } from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import MyHouses from "./pages/MyHouses";
import EditHouse from "./pages/EditHouse";
import Home from "./pages/Home";
import SidebarAdmin from "./components/SidebarAdmin";
import ListUser from "./components/ListUser";
import Page404 from "./pages/404";
import UpRole from "./pages/UpRole";
import { useSelector } from "react-redux";
import ChangePassword from "./pages/ChangePassword";
import HouseDetail from "./pages/HouseDetail";


function App() {
  let account = useSelector(state=>state.account.account);

  return (
    <>
      <Routes>
        <Route path="" element={<Master />}>
          <Route index element={<Home />}></Route>
          {account !== null && account.role.id === 1 &&
            <Route path="admin" element={<SidebarAdmin />}>
              <Route index element={<ListUser />} />
            </Route>
          }
          {account !== null && account.role.id === 2 &&
            <Route path="host" element={<Host />}>
              <Route path="create_house" element={<CreateHouse />}></Route>
              <Route index element={<MyHouses />}></Route>
              <Route path="edit_house/:indexHouseEdit" element={<EditHouse />}></Route>
            </Route>
          }
          <Route path={"user"} element={<UpRole/>}></Route>
            <Route path={"changePassword"} element={<ChangePassword></ChangePassword>}></Route>
            <Route path={"houseDetail/:index"} element={<HouseDetail></HouseDetail>}></Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
