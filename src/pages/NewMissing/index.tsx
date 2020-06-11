import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps, ILayoutProps, IFileWithMeta, StatusValue, IUploadParams } from 'react-dropzone-uploader';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import './styles.css';
import { api } from '../../services/api';

interface State {
    uf: string;
}

interface City {
    name: string;
}

interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream;
    text(): Promise<string>;
}

declare var Blob: {
    prototype: Blob;
    new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

interface Image {
    originalname: string;
    preview: Blob; 
    mimetype: string; 
    readableSize: number;
}

const NewMissing = () => {
    
    const [ formData, setFormData ] = useState({
        dog_name: '',
        age: 0,
        info: '',
    });
    
    const [ selectedState, setSelectedState ] = useState('');
    const [ selectedCity, setSelectedCity ] = useState('');

    const [ states, setStates ] = useState<State[]>([]);
    const [ cities, setCities ] = useState<City[]>([]);

    const [ uploadFile, setUploadFile ] = useState([]);

    const [ disable, setDisable ] = useState(false);
    const [ error, setError ] = useState('');

    useEffect( () => {

        api.get( 'states' ).then( resp => {
            console.log( resp.data );
            setStates( resp.data )
        });
    }, []);

    useEffect( () => {

        api.get( `cities/${selectedState}` ).then( resp => {

            setCities( resp.data )
        } )
    }, [selectedState]);
/*
    const handleChangeStatus: IDropzoneProps['onSubmit'] = (files, allFiles) => {

        console.log(files.map(f => f.meta))
        console.log(allFiles)
        allFiles.forEach(f => f.remove())

    }
*/

    const handleChangeStatus = (meta:IFileWithMeta, status:StatusValue) => {
        console.log( status )
        console.log( meta )
    }

    const getUploadParams: IDropzoneProps['getUploadParams'] = () => (
        {
             url: 'http://localhost:3333/animals/register' 
        }  
    )

    
    function handleSelectUf( e: ChangeEvent<HTMLSelectElement> ) {
        
        e.preventDefault();
        const uf = e.target.value;

        setSelectedState( uf );
    }

    function handleSelectCity( e: ChangeEvent<HTMLSelectElement> ) {

        e.preventDefault();
        const city = e.target.value;

        setSelectedCity( city );
    }

    function handleInputChange( e: ChangeEvent<HTMLInputElement> ) {

        e.preventDefault();

        const { id, value } = e.target;

        setFormData({
            ...formData, [id]: value
        }) 
    }

    function handleTextChange( e: ChangeEvent<HTMLTextAreaElement> ) {

        e.preventDefault();

        const { id, value } = e.target;

        setFormData({
            ...formData, [id]: value
        }) 
    }

    async function handleSubmit( e: FormEvent ) {

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

    return(
        <div className="pageContainer">

            <form onSubmit={ handleSubmit } id="form_new_missing">
                <div className="newmissingArea">
                    <div className="newmissingHeader">Novo Desaparecido</div>

                    <div className="newmissingImg">
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*"
                            multiple={false}
                            maxFiles={1}
                            inputContent="Arraste a imagem aqui"
                            styles={{
                                dropzoneActive: { borderColor: '#78e5d5' },
                                dropzoneReject: { borderColor: '#e57878' }
                            }}
                        />
                    </div>

                    <div className="body">
                        <div className="inputAreaReg">
                            <label htmlFor="dog_name" >Nome</label>
                            <input 
                                className="newmissingName" 
                                name="dog_name" 
                                id="dog_name"
                                onChange={handleInputChange}
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
                            />
                        </div>
                        <div className="inputAreaReg">
                            <label htmlFor="state" >Estado</label>
                            <select 
                                id="state" 
                                name="state" 
                                onChange={handleSelectUf} 
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
                            ></textarea>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="registerButton">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewMissing;