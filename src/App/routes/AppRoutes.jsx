import { Route, Routes } from "react-router-dom";
import Dashboard from "../../modules/layouts/main/Dashboard/Dashboard.jsx"
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import MainPanel from "../../modules/layouts/main/MainPanel/MainPanel.jsx";
import ProtectedRouters from "./ProtectedRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/ingresar" element={
                <>
                    <Dashboard/>
                    <Login />
                </>}>   
            </Route>
            <Route path="/registro" element={
                <>
                    <Dashboard/>
                    <Register />
                </>}>   
            </Route>
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

