import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; //Importamos las rutas.

import "./resources/styles/stylesGeneral.css" //Importamos los estilos generales para toda la aplicación

//Hacemos uso de Boostrap 5
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'react-toastify/dist/ReactToastify.css'; //Importamos los estilos de los Toast

import AppRoutes from './App/routes/AppRoutes';

createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
      <AppRoutes />
    </BrowserRouter>
)
