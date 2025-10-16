import {useState, useEffect} from "react";
import "./Offers.css"

import { IoIosTrendingUp } from "react-icons/io";

import InputSearch from "../../components/InputSearch/InputSearch";
import PublicationsOffers from "../../modules/Offers/PublicationOffers/PublicationsOffers";

const Offers = () => {


    return(
        <div className="container_general_offers">
           <section className="container_info_offers">
                <div className="offers_exclusive">
                    <IoIosTrendingUp style={{fontSize:"18px", color:"#fff"}}/>
                    Ofertas exclusivas actualizadas
                </div>
                <h1 className="offers_title">Aprovecha tus SwapCoins y consigue más por menos</h1>
                <p className="offers_description">Combina dinero real con SwapCoins y accede a descuentos únicos en productos premium</p>
                <div className="container_filter">
                    <InputSearch/>
                </div>
           </section>
           <section className="container_info_publications">
                <PublicationsOffers/>
           </section>

        </div>
    )
}

export default Offers;