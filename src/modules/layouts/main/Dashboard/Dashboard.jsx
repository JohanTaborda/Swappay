import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { FaShoppingCart, FaExchangeAlt, FaGraduationCap } from "react-icons/fa";
import { FaGift } from "react-icons/fa"
import { FaCoins } from "react-icons/fa";
import logoSwappay from "../../../../resources/images/Designer.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className="dashboard">
                <header className="dashboardHeader">
                    <nav className="containerHeader">
                        <div href="#" className="logo">
                            <img src={logoSwappay} alt="Logo Swappay" className="logo-img" />
                            <span className="title_panel_info">Swappay</span>
                        </div>
                        <button className="btnLogin" onClick={() => navigate("/ingresar")}>Login</button>
                    </nav>
                </header>

                <section className="dashboardHero">
                    <div className="containerHero">
                        <h1>Promociones e Intercambios</h1>
                        <p>
                            Una plataforma donde puedes aprovechar promociones especiales 
                            y dar una nueva vida a tus productos mediante el intercambio.
                        </p>
                        <div className="buttonsHero">
                            <a onClick={() => navigate("/ingresar")} style={{cursor:"pointer"}} className="btnStart"> Empezar</a>
                            <a href="#" className="btnGuide"> Ver Cómo Funciona</a>
                        </div>
                    </div>
                </section>

                <section className="dashboardFeatures">
                    <div className="containerFeatures">
                        <h2>Lo que puedes hacer en Swappay</h2>
                        <div className="gridFeatures">
                            <div className="cardFeature">
                                <div className="iconWrapper">
                                    <FaGift />
                                </div>
                                <h3>Promociones</h3>
                                <p>Explora promociones y beneficios especiales en algunos productos.</p>
                            </div>
                            <div className="cardFeature">
                                <div className="iconWrapper">
                                    <FaExchangeAlt />
                                </div>
                                <h3>Intercambiar</h3>
                                <p>Cambia artículos que ya no usas por productos o servicios que sí te interesen.</p>
                            </div>
                            <div className="cardFeature">
                                <div className="iconWrapper">
                                    <FaCoins />
                                </div>
                                <h3>Monedas</h3>
                                <p>Acumula monedas con ciertas acciones y canjéalas por beneficios exclusivos.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="dashboardFooter">
                    <div className="containerFooter">
                        <div>
                            <h3>Swappay</h3>
                            <p>
                                Una plataforma para aprovechar ofertas, intercambiar productos y darles una segunda vida, 
                                convirtiendo cada acción en una experiencia única.
                            </p>
                        </div>
                        <div>
                            <h3>Enlaces Rápidos</h3>
                            <a href="#">Guía de Moneda</a>
                            <a href="#">Guía de Intercambios</a>
                            <a href="#">Centro de Ayuda</a>
                        </div>
                    </div>
                    <div className="bottomFooter">
                        <p>&copy; 2025 Swappay. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>

        </div>
    )
}

export default Dashboard;