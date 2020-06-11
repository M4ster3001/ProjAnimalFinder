import React, { useState, FormEvent } from 'react';
import './styles.css';

import { apiLogin } from '../../services/api';

import logo from '../../images/logoLogin.png'
import { doLogin } from '../../services/authHandler';

const Login = () => {

    const [ email, SetEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ disable, setDisable ] = useState(false);

    async function handlerSubmit( e: FormEvent ){

        e.preventDefault();

        await apiLogin.post( '/login', {
            email,
            password,
        } ).then((response) => {
            
            doLogin( response.data.token )
            window.location.href = '/';

        }).catch( (error) => {

            if ( error.response ) {

              console.log( error.response.data.message );

            } else if ( error.request ) {

                console.log( error.request );

            } else {

                console.log(`Error ${ error.message }`);
            }

        }) 
    }

    return(
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
                            <button className="buttonLogin">Logar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );

}

export default Login;