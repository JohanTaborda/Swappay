import { Route, Routes } from "react-router-dom";
import  Main from "../../modules/layouts/main/Main";
import  Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import MainPanel from "../../modules/layouts/main/MainPanel/MainPanel.jsx";
import ProtectedRouters from "./ProtectedRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/ingresar" element={<Login/>}></Route>
            <Route path="/registro" element={<Register/>}></Route>
            <Route path="/panel" element={
                    <ProtectedRouters>
                        <MainPanel/>
                    </ProtectedRouters>
                }>

            </Route>
            
        </Routes>
    );
}

export default AppRoutes;

