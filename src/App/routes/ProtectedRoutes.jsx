import { Navigate } from "react-router-dom";


const isVerified = () => {
    //Espacio para trabajar la validación del token
    return true;
}

const protectedRouters = ({component}) => {
 
    return  isVerified() ? component : <Navigate to={"/ingresar"} replace/>
}

export default protectedRouters;