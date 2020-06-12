import React, { useState, FormEvent, useEffect } from 'react';
import './styles.css';

import Notification from '../../components/partials/Notification';

import { apiLogin } from '../../services/api';

import logo from '../../images/logoLogin.png'
import { doLogin } from '../../services/authHandler';
import { FiLogIn } from 'react-icons/fi';

const Login = () => {

    const [ email, SetEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ disable, setDisable ] = useState(false);

    const [ error, setError ] = useState('');
    const [ open, setOpen ] = useState(false);

    async function handlerSubmit( e: FormEvent ){

        e.preventDefault();
        setDisable( true );

        await apiLogin.post( '/login', {
            email,
            password,
        } ).then((response) => {

            if( response.data.error ) {
                setError( response.data.error )
                setOpen( true );

                return;
            }

            doLogin( response.data.token )
            window.location.href = '/';

            setDisable( false );

        }).catch( (error) => {

            setDisable( false );

            if ( error.response ) {

                if ( error.response.data.error ) {
                    setError( error.response.data.error )
                    setOpen( true );

                    return;
                }

                if( error.response.data.errors ) {
                    let lst = '';

                    for( let i = 0; i < error.response.data.errors.length; i++ ) {
                        lst += ` Campo errado: ${error.response.data.errors[i].param}/ Mensagem: ${error.response.data.errors[i].msg}`
                    }

                    setError( lst )

                    return;               
                }

            } else if ( error.request ) {

                setError( error.request );
                setOpen( true );

                return;
            } else {

                setError( error.message );
                setOpen( true );

                return;
            }
        }) 
    }

    useEffect( () =>{

        setTimeout( () =>{ setError( '' ); setOpen( false ) }, 4000 );

    }, [ error ] )

    return(
        <>
            { error &&
                <Notification severity="error" open={open} message={error}/>           
            }
            <div className="pageContainer">
                <div className="logoLogin">
                    <img src={ logo } alt="LogoAnimal" />
                </div>

                <div className="loginArea">
                    <div className="headerLogin">
                        <p>Acessar conta</p>
                    </div>

                    <div className="bodyLogin">
                        <form onSubmit={ handlerSubmit }>
                            <div className="inputAreaLog">
                                <label htmlFor="email" >Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    onChange={( e ) => { SetEmail( e.target.value ) }}
                                    required
                                    disabled={disable}
                                />
                            </div>
                            <div className="inputAreaLog">
                                <label htmlFor="password" >Senha</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    minLength={ 6 }  
                                    onChange={( e ) => { setPassword( e.target.value ) }}
                                    required
                                    disabled={disable}
                                />
                            </div>

                            <div className="actionsBtn">
                                <button className="buttonLogin">
                                    <span id="icon" ><FiLogIn /></span>
                                    Logar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );

}

export default Login;