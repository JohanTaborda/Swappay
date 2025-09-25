import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material';
import "./InfoPopup.css"

const InfoPopup = ({ 
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
    
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{'& .MuiDialog-paper': {fontFamily: 'Outfit',borderRadius: 2}}} >
            <DialogTitle sx={{ fontFamily: 'Outfit', fontWeight: 600 }}>
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontFamily: 'Manrope', fontSize: '1rem' }}>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ padding: 2, gap: 1 }}>
                {showCancelButton && (
                    <Button onClick={onClose} sx={{ fontFamily: 'Outfit' }} mvariant="outlined" className='button_cancel_popup' >
                        {cancelText}
                    </Button>
                )}
                <Button onClick={handleConfirm} color={colorConfirm} variant="contained" style={{textTransform:"none"}} sx={{ fontFamily: 'Outfit' }}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoPopup;