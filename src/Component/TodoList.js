import React from 'react';
import { useSelector } from 'react-redux';
import Todos from './Todos';
import useOnScrollNearBottom from '../customhook/useOnScrollNearBottom';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);
    const totalTodos = todos.length;
    const itemsPerScroll = 5;

    const [itemsToShow, setItemsToShow] = React.useState(itemsPerScroll);

    const containerRef = useOnScrollNearBottom(() => {
        debugger;
        if (itemsToShow < totalTodos) {
            setItemsToShow((prevItems) => Math.min(prevItems + itemsPerScroll, totalTodos));
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

    return (
        <div ref={containerRef} className='Todolists'>
            {currentTodos.map((item, index) => (
                <Todos key={item.id} item={item} index={index} />
            ))}
        </div>
    );
}

export default TodoList;
