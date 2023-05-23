import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPagination } from '../../redux/actions';
import "./Paginado.css"

const Paginado = () => {
    const { itemsPerPage, currentPage } = useSelector(
    (state) => state.pagination
    );
    const dispatch = useDispatch();

    const handlePageClick = (page) => {
    dispatch(setPagination(itemsPerPage, page));
    };

    const goToPrevPage = (currentPage) => {
        if(currentPage !== 1){
            dispatch(setPagination(itemsPerPage, currentPage -1))
        }
    } 

    const goToNextPage = (currentPage) => {
        if(currentPage < totalPages){
            dispatch(setPagination(itemsPerPage, currentPage + 1))
        }
    }

    const totalItems = useSelector((state) => state.videogames.length);
    const totalPages = Math.ceil(totalItems / itemsPerPage);  

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
    }

    return (
        <div className="containerPaginado">
            <button onClick={() => goToPrevPage(currentPage)} disabled={currentPage === 1}>Anterior</button>
            {pageNumbers.map((number) => (
            <div
                key={number}
                style={{ display: 'inline', margin: '10px' }}
                onClick={() => handlePageClick(number)}
            >
                
                <button className={
                    currentPage === number 
                    ? 'paginado-active' 
                    : 'paginado'}
                >{number}</button>
                
            </div>
            ))}
            <button onClick={() => goToNextPage(currentPage)} disabled={currentPage === totalPages}>Siguiente </button>
        </div>
    );
};

export default Paginado;
