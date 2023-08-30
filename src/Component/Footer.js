import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, deleteTodo } from '../redux/actions';

function Footer() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);

    const handleFilterChange = (filterType) => {
        dispatch(setFilter(filterType));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.isCompleted;
        } else if (filter === 'active') {
            return !todo.isCompleted;
        } else {
            return true;
        }
    });

    const handleDeleteCompleted = () => {
        const completedTodos = todos.filter((todo) => todo.isCompleted);
        completedTodos.forEach((todo) => {
            deleteTodo(todo.id);
        });
    };

    return (
        <div className='footer'>
            <p>item left: {filteredTodos.length}</p> {/* Hiển thị số lượng phần tử */}
            <button onClick={() => handleFilterChange('all')}>All</button>
            <button onClick={() => handleFilterChange('completed')}>Completed</button>
            <button onClick={() => handleFilterChange('active')}>Active</button>
            <button onClick={handleDeleteCompleted}>Clear completed</button>
        </div>
    );
}

export default Footer;