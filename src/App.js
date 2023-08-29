
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Navbar></Navbar>
        <Footer></Footer>
      </Routes>
    </>
  );
}

export default App;
