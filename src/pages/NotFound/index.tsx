import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import notfound from '../../images/404.gif';

export default function NotFound () {
  return (
    <div className="pageContainer">
      <div className="notfound-body body">
        <img src={ notfound } alt="Not Found" />
      </div>
    </div>

  );
}
