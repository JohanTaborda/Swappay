import {useState, useEffect} from "react";

import Dashboard from "./Dashboard/Dashboard";
import MainPanel from "./MainPanel/MainPanel";

const Main = () =>{

    const [visDashboard, setVisDashboard] = useState(true);

    return(
        <>
            {visDashboard ? (
                <Dashboard setChangeComponent={setVisDashboard} />
            ) : (
                <MainPanel/>
            )}
        </>
    )
}

export default Main;