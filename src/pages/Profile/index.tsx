import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { ToastProvider } from 'react-toast-notifications';
import './styles.css';
import { api } from '../../services/api';

import Notification from '../../components/partials/Notification';

import Cards from '../../components/partials/Cards';

const Profile = () => {

    const [disabled, setDisabled] = useState(false);
    const [ error, setError ] = useState('');
    const [ open, setOpen ] = useState(false);

    const [ id, setId ] = useState('');
    const [ user_name, SetUserName ] = useState('');
    const [ email, SetEmail ] = useState('');
    const [ phone, SetPhone ] = useState('');
    const [ old_password, SetOldPassword ] = useState('');
    const [ password, SetPassword ] = useState('');
    const [ confirm_password, SetConfPassword ] = useState('');

    const [ animals, setAnimals ] = useState([]);

    const [ formData, setFormData ] = useState({
        id,
        user_name,
        email,
        phone,
        old_password,
        password,
        confirm_password
    });

    useEffect( () => {
        api.get( 'users/profile' ).then( resp => {
            
            setFormData(
                {
                    id: resp.data.id,
                    user_name: resp.data.name,
                    email: resp.data.email,
                    phone: resp.data.phone,
                    old_password: '',
                    password: '',
                    confirm_password: '',
                }
            );

            setId( resp.data.id );

        } ).catch( (error) => {

            if ( error.response ) {

            setOpen(true);
            setError(error.response.data.message);

            } else if ( error.request ) {

                setOpen(true);
                setError(`Error ${ error.request }`);

            } else {

                setOpen(true);
                setError(`Error ${ error.message }`);
            }

        })

    }, [] )

    useEffect( () => {

        if( id ) {

            api.get( `animals/user/${id}` ).then( ( resp ) => {
                
                setAnimals( resp.data.lstAnimals )
            });

        }

    }, [id] )

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
        setError( '' );

        const { id, user_name, email, phone, old_password, password, confirm_password } = formData;

        if( password && !old_password ) {
            
            setError( 'É necessário colocar a senha antiga' )
            setOpen( true )
            setDisabled( false );

            return
        }

        if( password !== confirm_password ) {

            setError( 'Senhas não iguais!!!' )
            setOpen( true )
            setDisabled( false );

            return
        }
        
        try {
            await api.put( `users/update/${id}`, {
                user_name,
                email,
                phone,
                old_password,
                password
            } ).then((response) => {

                if( response.data.error ) {
                    setError( response.data.error )
                    setOpen( true );

                    return;
                }

                window.location.href = '/profile';

            }).catch( (error) => {

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

            setError( 'Ocorreu um erro, tente novamente' );
            setOpen( true );
        }

        setDisabled( false );

    }

    useEffect( () =>{

        setTimeout( () =>{ setError( '' ); setOpen( false ) }, 2000 );

    }, [ error ] )

    return(
        <>
            { error &&
                <Notification severity="error" open={open} message={error}/>           
            }

            <div className="pageContainer">

                <div className="ProfileArea">
                    <div className="headerProfile">
                        <p>Dados</p>
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
                                    value={ formData.user_name }
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
                                    value={ formData.email }
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
                                    value={ formData.phone } 
                                    required 
                                />
                            </div>

                            <div className="inputAreaReg">
                                <label htmlFor="password" >Senha antiga</label>
                                <input 
                                    type="password" 
                                    name="old_password" 
                                    id="old_password" 
                                    minLength={ 6 }
                                    onChange={ handleInputChange } 
                                    disabled={disabled}                                
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
                                />
                            </div>

                            <div className="actionsBtn">
                                <button className="buttonProfile">
                                    <span id="icon"><MdPersonAdd size={ 16 }/></span>
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className="registerAnimals">
                    { animals.map( ( animal, key ) =>            
                        <Cards key={ key } styles={ 'left' } { ...animal } />          
                    )}
                </div>
            </div>
        </>
    );

}

export default Profile;