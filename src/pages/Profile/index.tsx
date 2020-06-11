import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './styles.css';
import { api } from '../../services/api';

import logo from '../../images/logoLogin.png'

const Profile = () => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [ user_name, SetUserName ] = useState('');
    const [ email, SetEmail ] = useState('');
    const [ phone, SetPhone ] = useState('');
    const [ password, SetPassword ] = useState('');
    const [ confirm_password, SetConfPassword ] = useState('');

    const [ formData, setFormData ] = useState({
        user_name,
        email,
        phone,
        password,
        confirm_password
    });

    useEffect( () => {
        api.get( 'users/profile' ).then( resp => {
            /*console.log( res )
            setFormData( resp.data );*/
        } ).catch( (error) => {

            if ( error.response ) {

              console.log( error.response.data.message );

            } else if ( error.request ) {

                console.log( error.request );

            } else {

                console.log(`Error ${ error.message }`);
            }

        }) 

    }, [] )

    function handleInputChange( e: ChangeEvent<HTMLInputElement> ){

        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id] : value
        });
    }

    async function handleRegister( e: FormEvent ) {

        e.preventDefault();
        setDisabled( true );
        const { user_name, email, phone, password, confirm_password } = formData;

        if( password !== confirm_password ) {
            setError( 'Senhas não iguais!!!' )
            setDisabled( false );
            return
        }
        
        try {
            await api.post( 'users/register', {
                user_name,
                email,
                phone,
                password
            } ).then((response) => {
                    
                window.location.href = '/profile';

            }).catch( (error) => {

                if ( error.response ) {

                  alert( error.response.data.message );

                } else if ( error.request ) {

                    alert( error.request );

                } else {

                    alert(`Error ${ error.message }`);
                }

            })

        } catch( er ) {
            alert( er );
        }

        setDisabled( false );

    }

    return(
        <div className="pageContainer">
            { error &&
                error
            }
            <div className="logoProfile">
                <img src={ logo } alt="LogoAnimal" />
            </div>

            <div className="ProfileArea">
                <div className="headerProfile">
                    <p>Cadastrar Dados</p>
                </div>

                <div className="bodyProfile">
                    <form onSubmit={ handleRegister }>
                        <div className="inputAreaReg">
                            <label htmlFor="name" >Nome</label>
                            <input 
                                type="text" 
                                name="user_name" 
                                id="user_name"
                                minLength={ 4 }  
                                onChange={ handleInputChange }
                                disabled={disabled} 
                                required
                            />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="email" >Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={ handleInputChange }
                                disabled={disabled}
                                required  
                            />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="phone" >Telefone</label>
                            <input 
                                type="text"
                                name="phone" 
                                id="phone"
                                onChange={ handleInputChange }
                                disabled={disabled} 
                                required 
                            />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="password" >Senha</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                minLength={ 6 }
                                onChange={ handleInputChange } 
                                disabled={disabled}
                                required 
                            />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="password" >Confirmar Senha</label>
                            <input 
                                type="password" 
                                name="confirm_password" 
                                id="confirm_password"
                                minLength={ 6 } 
                                onChange={ handleInputChange }
                                disabled={disabled} 
                                required 
                            />
                        </div>

                        <div className="actionsBtn">
                            <button className="buttonProfile">Cadastrar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );

}

export default Profile;