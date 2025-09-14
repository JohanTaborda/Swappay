import {useState, useEffect} from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import MainData from "./components/MainData/MainData";

const MainPanel = () =>{

    return(
        <div>
            <MainHeader/>
            <MainData/>
        </div>
    )
}

export default MainPanel;