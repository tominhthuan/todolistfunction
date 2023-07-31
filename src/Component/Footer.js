import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/actions';

function Footer() {
    const dispatch = useDispatch();

    const handleFilterChange = (filterType) => {
        dispatch(setFilter(filterType));
    };

    return (
        <div>
            <button onClick={() => handleFilterChange('all')}>All</button>
            <button onClick={() => handleFilterChange('completed')}>Completed</button>
            <button onClick={() => handleFilterChange('active')}>Active</button>
        </div>
    );
}

export default Footer;
