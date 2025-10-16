import { useState, useEffect } from "react";

import { Dialog, MobileStepper, Button } from "@mui/material"; //Importamos componentes de materialUI a utilizar.

const PublicationOffersDialog = ({userData, open, handleClose}) => {

    console.log(userData)

    return(
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
           Componente para la información total de la oferta.
        </Dialog>
    )
}

export default PublicationOffersDialog;