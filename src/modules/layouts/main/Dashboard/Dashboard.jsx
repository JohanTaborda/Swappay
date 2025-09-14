import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { FaShoppingCart, FaExchangeAlt, FaGraduationCap } from "react-icons/fa";
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
                        <h1>Vende, Intercambia, Aprende</h1>
                        <p>
                            La plataforma donde puedes vender productos,
                            hacer intercambios útiles y aprender nuevas habilidades.
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
                                    <FaShoppingCart/>
                                </div>
                                <h3>Vender</h3>
                                <p>Publica tus productos de forma sencilla y llega a más personas.</p>
                            </div>
                            <div className="cardFeature">
                                <div className="iconWrapper">
                                    <FaExchangeAlt />
                                </div>
                                <h3>Intercambiar</h3>
                                <p>Intercambia lo que no usas por algo que sí necesites.</p>
                            </div>
                            <div className="cardFeature">
                                <div className="iconWrapper">
                                    <FaGraduationCap />
                                </div>
                                <h3>Aprender</h3>
                                <p>Accede a cursos, talleres y tutoriales compartidos por la comunidad.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="dashboardFooter">
                    <div className="containerFooter">
                        <div>
                            <h3>Swappay</h3>
                            <p>
                                La plataforma donde vender, intercambiar y aprender se vuelve una experiencia única.
                            </p>
                        </div>
                        <div>
                            <h3>Enlaces Rápidos</h3>
                            <a href="#">Cómo Vender</a>
                            <a href="#">Guía de Intercambios</a>
                            <a href="#">Cursos Populares</a>
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