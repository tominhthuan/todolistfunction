import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Todos from './Todos';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);

    const itemsPerScroll = 5;
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const container = containerRef.current;
        const scrollY = container.scrollTop;
        const containerHeight = container.clientHeight;
        const contentHeight = container.scrollHeight;
        const bottom = scrollY + containerHeight >= contentHeight;
        if (bottom) {
            setItemsToShow((prevItems) => prevItems + itemsPerScroll);
        }
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

    const [itemsToShow, setItemsToShow] = React.useState(itemsPerScroll);
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
