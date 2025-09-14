import { Navigate } from "react-router-dom";

const isVerified = () => {
    //Espacio para trabajar la validación del token
    return true;
}

const protectedRouters = ({children}) => {
 
    return isVerified() ? children : <Navigate to={"/ingresar"} replace/>
}

export default protectedRouters;