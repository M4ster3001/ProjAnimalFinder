import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './styles.css';
import { apiLogin } from '../../services/api';

import Notification from '../../components/partials/Notification';

import { doLogin, doLogout } from '../../services/authHandler';

import logo from '../../images/logoLogin.png'
import { MdPersonAdd } from 'react-icons/md';

const NewUser = () => {

    
    const [ isMobile, setIsMobile ] = useState( window.innerWidth < 480 );
    
    const [ user_name, SetUserName ] = useState('');
    const [ email, SetEmail ] = useState('');
    const [ phone, SetPhone ] = useState('');
    const [ password, SetPassword ] = useState('');
    const [ confirm_password, SetConfPassword ] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [ error, setError ] = useState('');
    const [ open, setOpen ] = useState(false);
    
    const [ formData, setFormData ] = useState({
        user_name,
        email,
        phone,
        password,
        confirm_password
    });

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
            await apiLogin.post( 'users/register', {
                user_name,
                email,
                phone,
                password
            } ).then((response) => {

                doLogin( response.data );
                window.location.href = '/';

            }).catch( (error) => {

                setDisabled( false );

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

        } catch( er ) {
            alert( er );
        }

        setDisabled( false );

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
                <div className="logoNewUser">
                    <img src={ logo } alt="LogoAnimal" />
                </div>

                <div className="NewUserArea">
                    <div className="headerNewUser">
                        <p>Cadastrar Dados</p>
                    </div>

                    <div className="bodyNewUser">
                        <form onSubmit={ handleRegister }>
                            <div className={ isMobile ? "inputAreaLog" : "inputAreaReg" }>
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

                            <div className={ isMobile ? "inputAreaLog" : "inputAreaReg" }>
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

                            <div className={ isMobile ? "inputAreaLog" : "inputAreaReg" }>
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

                            <div className={ isMobile ? "inputAreaLog" : "inputAreaReg" }>
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

                            <div className={ isMobile ? "inputAreaLog" : "inputAreaReg" }>
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
                                <button className="buttonNewUser">
                                    <span id="icon" ><MdPersonAdd /></span>
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );

}

export default NewUser;