import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

export default function NotFound () {
  return (
    <div className="container">
      <div className="container-notfound-body">
        <h1>Página não encontrada</h1>
        <Link to="/" exact="true">Página Inicial</Link>
      </div>
    </div>

  )
}
