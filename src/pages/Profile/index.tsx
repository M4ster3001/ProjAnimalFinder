import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { ToastProvider } from 'react-toast-notifications';
import './styles.css';
import { api } from '../../services/api';

import Cards from '../../components/partials/Cards';

const Profile = () => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

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

              console.log( error.response.data.message );

            } else if ( error.request ) {

                console.log( error.request );

            } else {

                console.log(`Error ${ error.message }`);
            }

        }) 

    }, [] )

    useEffect( () => {
        api.get( `animals/user/${id}` ).then( ( resp ) => {
            
            setAnimals( resp.data.lstAnimals )
        });

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
            setDisabled( false );

            return
        }

        if( password !== confirm_password ) {

            setError( 'Senhas não iguais!!!' )
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

                    return;
                }

                window.location.href = '/profile';

            }).catch( (error) => {

                if ( error.response ) {

                    setError( error.response.data.message );

                } else if ( error.request ) {

                    setError( error.request );

                } else {

                    setError( error.message );
                    
                }
                return;

            })

        } catch( er ) {

            setError( er );
        }

        setDisabled( false );

    }

    return(
        <div className="pageContainer">
            { error &&
                <div className="error-message">{ error }</div>
            }

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
    );

}

export default Profile;