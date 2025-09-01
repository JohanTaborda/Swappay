import {useState, useEffect} from "react";

import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

const Auth = ({setChangeComponent}) => {

    const [visLogin, setVisLogin] = useState(true);

    return(
        <>
            {visLogin ? (
                <Login setChangeComponent={setChangeComponent} setVisLogin={setVisLogin}/>
            ) : (
                <Register/>
            )}
        </>
    )
}

export default Auth;