import React from "react";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';


import logoImg from '../../assets/Frame 1.svg';
export default function Register() {
    return (
       
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" className="logo-icon"/>
                    <h1>Cadastro</h1>
                    {/* <p>Faça seu cadastro bla bla bla</p> */}
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#228180"></FiArrowLeft>
                        Entrar
                    </Link>
                </section>
                <form>
                <input placeholder="Nome"/>
                    <input type="email" placeholder="E-mail"/>
                    
                    <input type="password" placeholder="Senha" />
                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}