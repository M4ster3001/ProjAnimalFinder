import React, { useEffect, useState } from 'react';

import Cards from '../../components/partials/Cards'

import './styles.css';
import { api } from '../../services/api';

const Home = () => {

    const [ animals, setAnimals ] = useState([]);
    
    useEffect( () => {
        api.get( `animals` ).then( ( resp ) => {
            
            setAnimals( resp.data )
        });

    }, [] )

    return(
        <div className="pageContainer">
            { animals.map( ( animal, key ) =>            
                <Cards key={ key } { ...animal } />       
            )}
        </div>
    );
}

export default Home;