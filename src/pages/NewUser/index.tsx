import React from 'react';
import './styles.css';

import logo from '../../images/logoLogin.png'

const NewUser = () => {

    return(
        <div className="pageContainer">
            <div className="logoNewUser">
                <img src={ logo } alt="LogoAnimal" />
            </div>

            <div className="NewUserArea">
                <div className="headerNewUser">
                    <p>Cadastrar Dados</p>
                </div>

                <div className="bodyNewUser">
                    <form>
                        <div className="inputAreaReg">
                            <label htmlFor="name" >Nome</label>
                            <input type="text" name="user_name" id="user_name" value="" />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="email" >Email</label>
                            <input type="email" name="email" id="email" value="" />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="phone" >Telefone</label>
                            <input type="text" name="phone" id="phone" value="" />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="password" >Senha</label>
                            <input type="password" name="password" id="password" value="" />
                        </div>

                        <div className="inputAreaReg">
                            <label htmlFor="password" >Confirmar Senha</label>
                            <input type="password" name="password" id="password" value="" />
                        </div>

                        <div className="actionsBtn">
                            <button className="buttonNewUser">Cadastrar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );

}

export default NewUser;