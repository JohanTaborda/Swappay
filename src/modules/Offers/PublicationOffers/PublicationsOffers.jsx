import { useState, useEffect } from "react";
import "./PublicationsOffers.css"

import data from "./PublicationOffers.json"

import PublicationOffersDialog from "../PublicationOffersDialog/PublicationOffersDialog";

const PublicationsOffers = () => {

    const[dataUser, setDataUser] = useState();
    const[open, setOpen] = useState(false);

    const handleOpen = (userData) => {
        setDataUser(userData);
        setOpen(true);
    }

    const handleClose = () => { //Cierra el Popup
        setOpen(false); // Cierra el popup
        setDataUser(null); // Limpia el producto seleccionado
    };

    return(
        <div className="container_general_publications_offers">
            <section className="title_filter_info_offers">
                <h1>{data.length} ofertas disponibles</h1>
                <select name="" id=""></select>
            </section>
            <section className="section_grid_offers">
                {data.map((value, index) => (
                    <div key={index} className="container_product_offers">
                        <div className="tag_offer limited">{value.category}</div>
                        <img src={value.img} alt="imagenProducto" />
                        
                        <h5 className="product_name">{value.title}</h5>
                        
                        <div className="container_price_offers">
                            <span className="price_offers">${value.priceDiscount}</span>
                            <span className="price_original">${value.priceOriginal}</span>
                        </div>
                        
                        <span className="price_swapcoins">+ {value.priceSwapcoins} SwapCoins</span>

                        <a className="button_more_info" onClick={() => handleOpen(value)}>Ver más información</a>
                        <button className="button_redeem">Canjear ahora</button>
                    </div>
                ))}
            </section>

            {/* Popup con más detalles */}
            {open && (
                <PublicationOffersDialog userData={dataUser} open={open} handleClose={handleClose}/>
            )}
        </div>
    )
}

export default PublicationsOffers;