import React, { useEffect } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Global } from '../../helper/Global';
import axios from 'axios';
import { setUpLists } from '../../helper/SetUpLists';
import Swal from 'sweetalert2';

export const ListsPreview = ({ lists, setLists, buscado, setAllLists }) => {
    
    const baseUrl = Global.baseUrl;
    const URILists = `${baseUrl}lists/`;
    
    useEffect( () => {
    
        buscar();
    
    }, [buscado]);
    
    async function buscar() {
    
        if ( buscado === '' ) {
    
            setUpLists( setLists, setAllLists );
    
        } else {
    
            axios.get( `${URILists}buscar/${buscado}` )
                .then( res => {
    
                    setLists( res.data );
    
                });
    
        }
    
    };
    
    return (
     <div>
        {lists.length !== 0
          ? lists.map( ( list, index ) => (
             <Link to={'/list/' + list.id}
                key = {index}>
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-50 justify-content-between">
                    <i class="fa-solid fa-list"></i>
                    <div className="px-2">
                    
                        <h4 className="mb-1 ttexte"> &nbsp; {list.nombre}</h4>
                      
                    </div>
                  </div>
                </div>
             </Link>
          ))
          : <div>{Swal.showLoading()}</div>
        }
     </div>
      );
    
    };
