import { Routes, Route } from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import MyHouses from "./pages/MyHouses";
import EditHouse from "./pages/EditHouse";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";





function App() {
  let account = useSelector(state => state.account.account);

  return (
    <>
      <Routes>
        <Route path="" element={<Master />}>
          <Route index element={<Home />}></Route>
        </Route>
        {account !== null && account.role.id === 2 &&
          <Route path="host" element={<Host />}>
            <Route path="create_house" element={<CreateHouse />}></Route>
            <Route index element={<MyHouses />}></Route>
            <Route path="edit_house/:indexHouseEdit" element={<EditHouse />}></Route>
          </Route>
        }
      </Routes>
    </>
  );
}

export default App;
