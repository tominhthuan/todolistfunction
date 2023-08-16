import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchTodos } from '../api';
import Todos from './Todos';
import useOnScrollNearBottom from '../customhook/useOnScrollNearBottom';

function TodoList() {
    const filter = useSelector((state) => state.filter);
    const itemsPerScroll = 5;

    const [itemsToShow, setItemsToShow] = useState(itemsPerScroll);
    const [todos, setTodos] = useState([]);

    const containerRef = useOnScrollNearBottom(() => {
        if (itemsToShow < todos.length) {
            setItemsToShow((prevItems) => Math.min(prevItems + itemsPerScroll, todos.length));
        }
    });

    useEffect(() => {
        async function fetchAndSetTodos() {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        }

        fetchAndSetTodos();
    }, []);

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.isCompleted;
        } else if (filter === 'active') {
            return !todo.isCompleted;
        } else {
            return true;
        }
    });

    const currentTodos = filteredTodos.slice(0, itemsToShow);

    return (
        <div ref={containerRef} className='Todolists'>
            {currentTodos.map((item, index) => (
                <Todos key={item.id} item={item} index={index} />
            ))}
        </div>
    );
}

export default TodoList;
