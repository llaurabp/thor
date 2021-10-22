import React, { useState, useEffect  } from "react";
import { Link , useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';
import './styles.css';
import heroesImg from '../../assets/sharpei.png';
import logoImg from '../../assets/Frame 1.svg';
import logoImg2 from '../../assets/Frame 1 (1).svg';
import api from '../../services/api.js';
import { useAuth } from "../../hooks/auth";
const token = localStorage.getItem('@Zeus:token');
function initialState() {
    return {
        email: "",
        senha: "",
    }
}


export default function Logon() {
    const [values, setValues] = useState(initialState)
    const [image, setImage] = useState(logoImg);
    const { signIn } = useAuth();
    const history = useHistory();

    useEffect(() => {
        console.log(values)
    }, [values])

    function darkmode() {
        var someElement = document.getElementById("root");

        if (someElement.className == "light") {
            someElement.className = "";
            someElement.className += "dark";
            setImage(logoImg2)
            // document.getElementById('logotest').src={logoImg};
        }
        else if (someElement.className == "dark") {
            someElement.className = "light";
            setImage(logoImg)
            // document.getElementById('logotest').src={logoImg2};
        }
    }

    const validateCheckin = async (e) => {
        e.preventDefault();
        const data = values;

        await signIn({
            email: data.email,
            senha: data.senha,
        }
       
        )
        if (token) history.push('/secondpage');

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={image} className="new-logo" id="logotest" alt="Logo" />

                <form onSubmit={validateCheckin} >
                    <div className="input">
                        <input placeholder="E-mail" type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }} />
                        <input placeholder="Senha" type="password" onChange={(e) => { setValues({ ...values, senha: e.target.value }) }} />
                    </div>
                    {/* onClick={validateCheckin} */}

                    <button className="button" id="init" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#008080"></FiLogIn>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <div className="darkdiv">
                <div className="darkk">
                    <button className="darkmode-button" onClick={darkmode}> <MdDarkMode size={16} color="#fff"></MdDarkMode></button>
                </div>
                <img src={heroesImg} className="thor" alt="sharpei-img" />
            </div>

        </div>

    );

}
