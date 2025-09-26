import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material'; //Importamos componentes de MaterialUI a utilizar.
import "./InfoPopup.css"

const InfoPopup = ({  //Recibimos mediante props todas estas propiedades que contienen algunos valores que en caso de no recibir nada, los tendra por defecto.
    open, 
    onClose, 
    title = "Confirmación", 
    message, 
    showCancelButton = true,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    colorConfirm
}) => {
    
    const handleConfirm = () => { //Función que se llama cuando se la da clic al botón de confirmación
        if (onConfirm) { 
            onConfirm(); //Llamamos la función interna que se recibe por props, para hacer las funciones necesarios en el componente dónde se llama.
        }
        onClose();
    };

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{'& .MuiDialog-paper': {fontFamily: 'Outfit',borderRadius: 2}}} >
            <DialogTitle sx={{ fontFamily: 'Outfit', fontWeight: 600 }}>
                {title} {/*Titulo importante de la ventana emergente, según el caso.*/}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontFamily: 'Manrope', fontSize: '1rem' }}>
                    {message} {/*Mensaje informativo de lo que pasa si se le da clic al botón de aceptar.*/}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ padding: 2, gap: 1 }}>
                {showCancelButton && ( //Mostramos el botón de cancelar.
                    <Button onClick={onClose} sx={{ fontFamily: 'Outfit' }} mvariant="outlined" className='button_cancel_popup' >
                        {cancelText} {/*Botón de cancelar.*/}
                    </Button>
                )}
                <Button onClick={handleConfirm} color={colorConfirm} variant="contained" style={{textTransform:"none"}} sx={{ fontFamily: 'Outfit' }}>
                    {confirmText} {/*Botón para aceptar.*/}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoPopup;