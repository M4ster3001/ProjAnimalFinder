import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from '../../services/api'

import './styles.css';

const Cards = () => {


    return(
        <div className="pageContainer">
            <form>
                <div className="cardArea">
                    <div className="cardHeader">Novo Desaparecido</div>

                    <div className="cardImg">
                        <Dropzone accept="image/*" onDropAccepted={ () =>{} } >
                            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                                <div className="dropContainer"
                                    { ...getRootProps() }
                                    isDragActive={ isDragActive }
                                    isDragReject={ isDragReject }
                                >
                                    <input { ...getInputProps() } />
                                    { renderDragMessage( isDragActive, isDragReject ) }
                                </div>
                            )}
                           
                        </Dropzone>
                    </div>

                    <div className="body">
                        <div className="inputAreaReg">
                            <label htmlFor="email" >Nome</label>
                            <input className="cardName" name="dog_name" id="dog_name" />
                        </div>
                        <div className="inputAreaReg">
                            <label htmlFor="email" >Idade</label>
                            <input className="cardAge" name="age" id="age" />
                        </div>
                        <div className="inputAreaReg">
                            <label htmlFor="email" >Estado</label>
                            <select id="state" name="state" ></select>
                        </div>
                        <div className="inputAreaReg">
                            <label htmlFor="email" >Cidade</label>
                            <select id="city" name="city" ></select>
                        </div>
                        <div className="inputAreaLog">
                            <label htmlFor="email" >Informações adicionais</label>
                            <textarea name="info" id="info" ></textarea>
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

export default Cards;