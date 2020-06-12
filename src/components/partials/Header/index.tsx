import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillNotification } from 'react-icons/ai';
import { RiFolderUserLine } from 'react-icons/ri';
import './styles.css';

import { isLogged, doLogout } from '../../../services/authHandler'; 

const Header: React.FunctionComponent = () => {
    const logged = isLogged();

    const handleLogout = () => {

        doLogout();
        window.location.href = '/';
    }

    return(
        <div className="headerArea">
            <div className="logo">
                <Link to="/" >
                    <span className="logo-1">O</span>
                    <span className="logo-2">A</span>
                    <span className="logo-3">F</span>
                </Link>
            </div>

            <nav className="sidebar">
                <ul>
                    { logged &&
                    <>
                        <li>
                            <Link to="/newmissing" className="button">
                                <span id="id"><AiFillNotification /></span> 
                                <label>Novo caso</label>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="button">
                                <span id="id"><RiFolderUserLine /></span> 
                                <label>Meu perfil</label>
                            </Link>
                        </li>
                        <li>
                            <button className="noButton" onClick={handleLogout}>Sair</button>
                        </li>
                    </>
                    }
                    { !logged &&   
                    <>
                        <li>
                            <Link to="/login" className="" >Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="button" >Cadastrar</Link>
                        </li>
                    </>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;