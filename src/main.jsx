import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 

import "./resources/styles/stylesGeneral.css"

//Hacemos uso de Boostrap 5
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Main from './modules/layouts/main/Main';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
)
