import React from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css';

interface Animal {
    id: number;
    name: string;
    age: string;
    info: string;
    city: string;
    state: string;
    url_image: string;
}

const Cards: React.FunctionComponent<Animal> = ( props ) => {
    console.log( props );
    return(
        <div className="cardArea">
            <div className="cardHeader">Desaparecido</div>
            <div className="cardImg">
                <img src="http://192.168.10.102:3333/uploads/doguinho.jpg" alt="Doguinho" />
            </div>
            <div className="body">
                <p className="cardName">Nome: <b>{ props.name }</b></p>
                <p className="cardAge">Idade: { props.age }</p>
                <p className="cardLastPlace">Último local: { props.city } - { props.state }</p>
                <p className="cardInfo">{ props.info }</p>
            </div>
            <div className="footer">
                <button className="contactButton">Encontrei ele</button>
            </div>
        </div>
    )
}

export default Cards;