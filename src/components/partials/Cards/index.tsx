/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css';

import missingImage from '../../../images/missingImage.png';

interface Animal {
    id: number;
    name: string;
    age: string;
    info: string;
    city: string;
    state: string;
    status?: boolean;
    url_image: string;
    styles?:string;
}

const Cards: React.FunctionComponent<Animal> = ( props ) => {

    return(
        <div className={ props.styles === 'left' ? 'cardArea Left' : 'cardArea' }>
            <div className="cardHeader">{ props.status === true ? 'Encontrado' : 'Desaparecido' }</div>
            <div className="cardImg">
                <img src={ props.url_image } />
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