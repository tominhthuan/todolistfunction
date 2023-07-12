import React from 'react';

function Footer({ setFilter }) {



    const handleFilterChange = (filterType) => {
        setFilter(filterType);
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
