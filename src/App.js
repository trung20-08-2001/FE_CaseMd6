import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import EditProfile from "./components/EditProfile";
import {Route, Routes} from "react-router-dom";
import ListVendor from "./components/admin/ListVendor";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path={'/:id'} element={<EditProfile/>}></Route>
                <Route path={'/admin/vendors'} element={<ListVendor/>}></Route>
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default App;
