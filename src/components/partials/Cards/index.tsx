/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FiTrash, FiEdit } from 'react-icons/fi'
import MuiAlert from '@material-ui/lab/Alert';
import { FaSearchLocation, FaLess } from 'react-icons/fa'
import Cookies from 'js-cookie';

import './styles.css';

import missingImage from '../../../images/missingImage.png';
import { api } from '../../../services/api';
import { Snackbar } from '@material-ui/core';

interface contactuser{
    contact_user: ContactUser;
}

interface ContactUser extends contactuser{
    name: string;
    phone: number;
    email: string;
}

interface animal extends contactuser{
    animal: Animal;
}

interface Animal extends animal{
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

    const [error, setError] = useState('');
    const [ open, setOpen ] = useState(false);

    function handleDeleteCase( id: number ) {

        api.delete( `animals/delete/${id}` )
        .then((response) => {

            if( response.data.error ) {
                console.log( response.data.error )

                return;
            }

            window.location.href = '/profile';

        }).catch( (err) => {

            if ( err.response ) {

                setError(err.response.data.message);
                setOpen(true);

            } else if ( err.request ) {

                setError(err.request);
                setOpen(true);

            } else {

                setError(err.message);
                setOpen(true);
                
            }
            return;

        })
    }

    function handleFindHim( id: number ) {

        if( !Cookies.get( 'token' ) ) {
            window.location.href = '/login'
        }

        api.put( `animals/found/${id}` )
        .then((response) => {

            if( response.data.error ) {

                setError(response.data.error);
                setOpen(true);

                return;
            }

            window.location.href = '/';

        }).catch( (err) => {

            if ( err.response ) {

                setError(err.response.data.message);
                setOpen(true);

            } else if ( err.request ) {

                setError(err.request);
                setOpen(true);

            } else {

                setError(err.message);
                setOpen(true);
                
            }
            return;

        })
    }


    return(
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                open={open}
                onClose={ ()=> { setOpen(false) } }
            >
                <MuiAlert elevation={6} variant="filled" severity="error">{ error }</MuiAlert>
            </Snackbar>
            <div className={ props.styles === 'left' ? 'cardArea Left' : 'cardArea' }>
                <div className={ props.animal.status ? 'cardHeader cardHeaderFound' : 'cardHeader' }>
                    { props.animal.status ? 'Encontrado' : 'Desaparecido' }
                </div>
                <div className="cardImg">
                    <img src={ props.animal.url_image } />
                </div>
                <div className="body">
                    <p className="cardName">NOME: <b>{ props.animal.name }</b></p>
                    { 
                        props.contact_user ?
                        <p className="cardAge">
                            <b>Contato: </b>
                            <p>{ props.contact_user.name && props.contact_user.name }</p>
                            <p>{ props.contact_user.phone && props.contact_user.phone }</p>
                            <p>{ props.contact_user.email && props.contact_user.email }</p>
                        </p>
                        :
                        <p className="cardAge">IDADE: { props.animal.age }</p>
                    }

                    <p className="cardLastPlace">ÚLTIMO LOCAL: { props.animal.city } - { props.animal.state }</p>
                    { !props.contact_user.name && 
                        <p className="cardInfo">
                            INFORMAÇÕES
                            <p>{ props.animal.info }</p>
                        </p> 
                    }
                </div>
                <div className="footer">
                    { 
                        props.styles === 'left' ? 
                            <>
                                <Link to={`/editanimal/${props.animal.id}`} className="altButton">
                                    <span id="icon"><FiEdit size={ 14 }/></span> 
                                    Editar
                                </Link> 
                                <button className="deleteButton" onClick={()=> { handleDeleteCase(props.animal.id) }}>
                                    <span id="icon"><FiTrash  size={ 14 }/></span> 
                                    Excluir
                                </button>
                            </> 
                        : 
                            <button className="contactButton" onClick={()=>{ handleFindHim(props.animal.id) }}>
                                <span id="icon"><FaSearchLocation size={ 14 }/></span>
                                Encontrei ele
                                </button> 
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Cards;