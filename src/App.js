import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import EditProfile from "./components/EditProfile";
import {Route, Routes} from "react-router-dom";
import ShowVendor from "./components/admin/ShowVendor";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path={'/:id'} element={<EditProfile/>}></Route>
                <Route path={'/admin/vendors'} element={<ShowVendor/>}></Route>
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default App;
