import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import noimage from '../../images/missingImage.png';

import Dropzone from 'react-dropzone'

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import './styles.css';
import { api } from '../../services/api';
import { FaSearch, FaSearchPlus } from 'react-icons/fa';


const NewMissing = () => {

    const { id } = useParams();

    const [ dog_name, SetDogName ] = useState( '' );
    const [ age, SetAge ] = useState( '' );
    const [ info, SetInfo ] = useState( '' );
    const [picture, setPicture] = useState( '' );
    
    const [ disabled, setDisabled ]  = useState( false );

    const [ formData, setFormData ] = useState({
        id: '',
        dog_name: '',
        age: '',
        info: '',
    });
    
    const [ selectedState, setSelectedState ] = useState( '' );
    const [ selectedCity, setSelectedCity ] = useState( '' );

    const [ states, setStates ] = useState([]);
    const [ cities, setCities ] = useState([]);

    const [ uploadFile, setUploadFile ] = useState([]);

    const [ disable, setDisable ] = useState(false);
    const [ error, setError ] = useState('');

    const [file, setFile] = useState('');

    useEffect( () => {

        api.get( `animals/${id}` ).then( resp => {
            console.log( resp.data )
            setSelectedState( resp.data.state )

            SetDogName( resp.data.name );

            setFormData({
                id: resp.data.id,
                dog_name: resp.data.name,
                age: resp.data.age,
                info: resp.data.info,
            });

        } ).catch( (error) => {

            if ( error.response ) {

              console.log( error.response.data.message );

            } else if ( error.request ) {

                console.log( error.request );

            } else {

                console.log(`Error ${ error.message }`);
            }

        }) 

    }, [id] )

    useEffect( () => {

        api.get( 'states' ).then( resp => {

            setStates( resp.data )
        });
    }, []);

    useEffect( () => {

        api.get( `cities/${selectedState}` ).then( resp => {

            console.log(  formData); 
            setCities( resp.data )
        } )
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

        const { dog_name, age, info } = formData;
        const uf = selectedState;
        const city = selectedCity;
        
        const data = { dog_name, age, info, uf, city };

        //data.append( 'file', uploadFile );

        console.log( data ); 
        const req = await api.post( '/animals/register', data )

        alert( req );
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
          return <div>Arraste os arquivos aqui ...</div>
        }
    
        if( isDragReject ) {
          return <div type="error" >Arquivo não suportado</div>
        }
    
        return <div type="success">Solte os arquivos aqui</div>
    
      }

    return(
        <div className="pageContainer">

            <form onSubmit={ handleSubmit } id="form_new_missing">
                <div className="newmissingArea">
                <div className="newmissingHeader">{ id ? 'Atualizar Desaparecido' : 'Novo Desaparecido' }</div>

                    <div className="newmissingImg">
                    <Dropzone accept="image/*" onDropAccepted={handleUpload}>

                        { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <div className="dropzone-input"
                                { ...getRootProps() }
                                isDragActive={ isDragActive }
                                isDragReject={ isDragReject }
                            >
                            <input {...getInputProps()} />
                            { renderDragMessage( isDragActive, isDragReject ) }

                            </div>
                        ) }

                    </Dropzone>
                    </div>

                    <div className="body">
                        <div className="inputAreaReg">
                            <label htmlFor="dog_name" >Nome</label>
                            <input 
                                className="newmissingName" 
                                name="dog_name" 
                                id="dog_name"
                                onChange={handleInputChange}
                                value={ formData.dog_name }
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
                            ></textarea>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="registerButton">
                            <span id="id"><FaSearchPlus style={{ marginRight: 4 }} /></span>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewMissing;