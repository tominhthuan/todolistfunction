import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todos from './Todos';
import useOnScrollNearBottom from '../customhook/useOnScrollNearBottom';
import { loadTodosRequest } from '../redux/actions';


function TodoList() {
    const filter = useSelector((state) => state.filter);
    const itemsPerScroll = 5;

    const [itemsToShow, setItemsToShow] = useState(itemsPerScroll);
    const todos = useSelector(state => state.todos);

    const dispatch = useDispatch();

    debugger; //(5)
    const containerRef = useOnScrollNearBottom(() => {
        if (itemsToShow < todos.length) {
            setItemsToShow((prevItems) => Math.min(prevItems + itemsPerScroll, todos.length));
        }
    });

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

    debugger;//(7)
    useEffect(() => {
        dispatch(loadTodosRequest())
    }, [dispatch]);

    return (
        <div ref={containerRef} className='Todolists'>
            {currentTodos.map((item, index) => (
                <Todos
                    key={item.id}
                    item={item}
                    index={index}
                />
            ))}
        </div>
    );
}

export default TodoList;
