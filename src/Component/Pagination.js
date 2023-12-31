import React from 'react';
import { useSelector } from 'react-redux';

export default function Pagination({ setCurrentPage }) {
    const todos = useSelector((state) => state.todos);
    const todosPerPage = 3;
    const totalPages = Math.ceil(todos.length / todosPerPage);


    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <button key={i} onClick={() => setCurrentPage(i)}>
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            {pageNumbers}
        </div>
    );
}