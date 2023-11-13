import React from "react";
import './home.css';

function Home(){
    return (
        <div>
            <h2>Possui Cadastro?</h2>
            <a href="login">
                <h4>Faça o Login aqui</h4>
            </a>
            <h2>Ainda não possui Cadastro</h2>
            <a href="register">
                <h4>Faça o Registro aqui</h4>
            </a>
        </div>
    )
}



export default Home;