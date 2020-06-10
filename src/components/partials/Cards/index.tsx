import React from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css';

const Cards: React.FunctionComponent = ( props ) => {

    return(
        <div className="cardArea">
            <div className="cardHeader">Desaparecido</div>
            <div className="cardImg">
                <img src="http://192.168.10.102:3333/uploads/doguinho.jpg" alt="Doguinho" />
            </div>
            <div className="body">
                <p className="cardName">Nome: <b>Doguinho</b></p>
                <p className="cardAge">Idade: 2 anos</p>
                <p className="cardLastPlace">Último local: Lins - SP</p>
                <p className="cardInfo">Ele é muito docil, porém, muito distraido</p>
            </div>
            <div className="footer">
                <button className="contactButton">Encontrei ele</button>
            </div>
        </div>
    )
}

export default Cards;