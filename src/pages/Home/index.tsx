import React, { useEffect, useState } from 'react';

import Cards from '../../components/partials/Cards'
import { TablePagination }  from '@material-ui/core';

import './styles.css';
import { api } from '../../services/api';

const Home = () => {

    const [ animals, setAnimals ] = useState([]);
    const [ totalAnimals, setTotalAnimais ] = useState( 0 );
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState( 5 );
    
    useEffect( () => {
        api.get( `animals`, { 
            params: {
                'limit': rowsPerPage,
                'page': page
            } 
        }).then( ( resp ) => {

            setAnimals( resp.data.lstAnimals )
            setTotalAnimais( resp.data.qtdeAnimals[0].qtde )
        });

    }, [ page, rowsPerPage ] )

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {

        setRowsPerPage( parseInt( event.target.value, 10) );
        setPage(0);
    };

    return(
        <>
            <div className="pageContainer">
                
                { animals.map( ( animal, key ) =>            
                    <Cards key={ key } { ...animal } />       
                )}

            </div>
            <div className="pageContainer">
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={10}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </>
    );
}

export default Home;