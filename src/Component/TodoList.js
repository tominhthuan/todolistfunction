
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Todos from './Todos';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);

    const [itemsToShow, setItemsToShow] = useState(5);
    const itemsPerScroll = 5;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight;
        const bottom = scrollY + windowHeight >= bodyHeight;
        if (bottom) {
            setItemsToShow((prevItems) => prevItems + itemsPerScroll);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === 'completed') {
                return todo.isCompleted;
            } else if (filter === 'active') {
                return !todo.isCompleted;
            } else {
                return true;
            }
        });
    }, [todos, filter]);

    const currentTodos = filteredTodos.slice(0, itemsToShow);

    return (
        <div>
            {currentTodos.map((item, index) => (
                <Todos key={item.id} item={item} index={index} />
            ))}
        </div>
    );
}

export default TodoList;
