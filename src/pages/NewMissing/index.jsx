/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import noimage from '../../images/missingImage.png';

import Notification from '../../components/partials/Notification';

import Dropzone from 'react-dropzone'

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import './styles.css';
import { api } from '../../services/api';
import { FaSearch, FaSearchPlus } from 'react-icons/fa';


const NewMissing = () => {

    const { id = '' } = useParams();

    const [ animal_name, SetAnimalName ] = useState( '' );
    const [ age, SetAge ] = useState( '' );
    const [ info, SetInfo ] = useState( '' );
    const [ picture, setPicture ] = useState( '' );
    
    const [ disabled, setDisabled ]  = useState( false );

    const [ formData, setFormData ] = useState({
        id: '',
        animal_name: '',
        age: '',
        info: '',
    });
    
    const [ selectedState, setSelectedState ] = useState( '' );
    const [ selectedCity, setSelectedCity ] = useState( '' );
    const [ loading, setLoading ] = useState(false);  

    const [ states, setStates ] = useState([]);
    const [ cities, setCities ] = useState([]);

    const [ uploadFile, setUploadFile ] = useState([]);

    const [ disable, setDisable ] = useState(false);
    const [ error, setError ] = useState('');
    const [ open, setOpen ] = useState(false);

    const [file, setFile] = useState('');

    useEffect( () => {

        if( id ) {

            api.get( `animals/${id}` ).then( resp => {

                setSelectedState( resp.data.data.state )

                setSelectedCity( resp.data.data.city )
                
                setFile({ preview: resp.data.data.url_image });
                
                setFormData({
                    id: resp.data.data.id,
                    animal_name: resp.data.data.name,
                    age: resp.data.data.age,
                    info: resp.data.data.info,
                });

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
        }

    }, [id] )

    useEffect( () => {

        api.get( 'states' ).then( resp => {

            setStates( resp.data )

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

        });

    }, []);

    useEffect( () => {
        
        
        if( selectedState ) {

            api.get( `cities/${selectedState}` ).then( resp => {

                setCities( resp.data )

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
        }
    }, [selectedState]);

    
    function handleSelectUf( e ) {
        
        e.preventDefault();
        const uf = e.target.value;

        setSelectedState( uf );
    }

    function handleSelectCity( e ) {

        e.preventDefault();
        const city = e.target.value;
    
        setSelectedCity( city );
    }

    function handleInputChange( e ) {

        e.preventDefault();

        const { id, value } = e.target;

        setFormData({
            ...formData, [id]: value
        }) 
    }

    function handleTextChange( e ) {

        e.preventDefault();

        const { id, value } = e.target;

        setFormData({
            ...formData, [id]: value
        }) 
    }

    async function handleSubmit( e ) {

        e.preventDefault();
        setDisable(true);

        let data = new FormData();

        const { animal_name, age, info } = formData;
        const uf = selectedState;
        const city = selectedCity;
        
        data.append( 'name', animal_name );
        data.append( 'age', age );
        data.append( 'info', info );
        data.append( 'uf', uf );
        data.append( 'city', city );

        if( file.name ) {
            data.append( 'file', file.file, file.name );
        }

        await api.post( id ? `/animals/update/${id}` : '/animals/register', data )
        .then( resp => {

            if( resp.data.error ) {
                setOpen( true )
                setError( resp.data.error )

                return;
            }

            window.location.href = id ? '/profile' : '/';
        } )

        setDisable( false );
    }

    const handleUpload = async (files) => {
    
        const fs = await files.map( file => ({
          file,
          id: uniqueId(),
          name: file.name,
          readableSize: filesize( file.size ),
          preview: URL.createObjectURL( file ),
          progress: 0,
          uploaded: false,
          error: false,
          url: null
    
        }) )
        
        setFile( ...fs )
    
    };

    let renderDragMessage = ( isDragActive, isDragReject ) => {

        if( !isDragActive ) {
            return <div className="uploadMessage">Arraste a image ou clique aqui ...</div>
        }

        if( isDragReject ) {
            return <div  className="uploadMessage alert" >Arquivo não suportado</div>
        }

        return <div  className="uploadMessage success">Solte a image</div>

    }

    useEffect(() => () => {

        URL.revokeObjectURL(file.preview);
    }, [file]);

    useEffect( () =>{

        setTimeout( () =>{ setError( '' ); setOpen( false ) }, 2000 );

    }, [ error ] )

    return(
        <>
            { error &&
                <Notification severity="error" open={open} message={error}/>           
            }

            <div className="pageContainer">

                <form onSubmit={ handleSubmit } id="form_new_missing">
                    <div className="newmissingArea">
                    <div className="newmissingHeader">{ id ? 'Atualizar Desaparecido' : 'Novo Desaparecido' }</div>

                        <div className="newmissingImg">
                        <Dropzone 
                            accept="image/*" 
                            onDropAccepted={handleUpload}
                            minSize={0}
                            maxSize={524288}
                            disabled={disabled}
                        >

                            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                <div className="dropzone-input"
                                    
                                    { ...getRootProps() }
                                    isDragActive={ isDragActive }
                                    isDragReject={ isDragReject }
                                    
                                >
                                <input {...getInputProps()} />
                                { renderDragMessage( isDragActive, isDragReject ) }
                                {   file.preview &&
                                    <img 
                                        src={ file.preview }
                                    />  
                                }
                                </div>
                            ) }

                        </Dropzone>
                        </div>

                        <div className="body">
                            <div className="inputAreaReg">
                                <label htmlFor="animal_name" >Nome</label>
                                <input 
                                    className="newmissingName" 
                                    name="animal_name" 
                                    id="animal_name"
                                    onChange={handleInputChange}
                                    value={ formData.animal_name }
                                    disabled={disabled}
                                    required 
                                />
                            </div>
                            <div className="inputAreaReg">
                                <label htmlFor="age" >Idade</label>
                                <input 
                                    className="newmissingAge" 
                                    placeholder="2 anos ou 2 meses"
                                    name="age" 
                                    id="age"
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                    value={ formData.age } 
                                />
                            </div>
                            <div className="inputAreaReg">
                                <label htmlFor="state" >Estado</label>
                                <select 
                                    id="state" 
                                    name="state" 
                                    onChange={handleSelectUf}
                                    value={ selectedState }
                                    disabled={disabled} 
                                    required
                                >
                                    <option value="">Selecione um estado</option>
                                    {
                                        states.map( ( state, key ) => 
                                            <option key={key}>{ state.uf }</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="inputAreaReg">
                                <label htmlFor="city" >Cidade</label>
                                <select 
                                    id="city" 
                                    name="city" 
                                    onChange={handleSelectCity} 
                                    value={ selectedCity }
                                    disabled={disabled}
                                    required
                                >
                                    <option value="">Selecione uma cidade</option>
                                    { selectedState &&
                                        cities.map( ( city, key ) => 
                                            <option key={key}>{ city.name }</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="inputAreaLog">
                                <label htmlFor="info" >Informações adicionais</label>
                                <textarea 
                                    name="info" 
                                    id="info"
                                    onChange={handleTextChange}
                                    value={ formData.info }
                                    disabled={disabled} 
                                ></textarea>
                            </div>
                        </div>
                        <div className="footer">
                            <button className="registerButton">
                                <span id="id">
                                    <FaSearchPlus style={{ marginRight: 4 }} />
                                </span>
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewMissing;