import React from 'react';
import './styles.css';

import logo from '../../images/logoLogin.png'

const Login = () => {

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
                    <form>
                        <div className="inputAreaLog">
                            <label htmlFor="email" >Email</label>
                            <input type="email" name="email" id="email" value="" />
                        </div>
                        <div className="inputAreaLog">
                            <label htmlFor="password" >Senha</label>
                            <input type="password" name="password" id="password" value="" />
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