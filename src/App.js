
import { Routes,Route } from "react-router-dom";
import Master from "./components/layout/Master";
import Host from "./components/Host";
import CreateHouse from "./pages/CreateHouse";
import UpRole from "./pages/UpRole";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Master/>}>
          <Route path="host" element={<Host/>}>
            <Route  index element={<CreateHouse/>}></Route>
          </Route>
            <Route path={"user"} element={<UpRole/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
