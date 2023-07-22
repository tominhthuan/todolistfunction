// TodoList.js
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickItem, deleteTodo, setSelectedTodo } from '../redux/actions';
import Todos from './Todos';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleEditTodo = (id) => {
        const selectedTodo = todos.find((todo) => todo.id === id);
        dispatch(setSelectedTodo(selectedTodo));
    };

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

    return (
        <div>
            {filteredTodos.map((item, index) => (
                <Todos
                    key={item.id}
                    item={item}
                    id={item.id}
                    index={index}
                    clickItem={(id) => dispatch(clickItem(id))}
                    deleteTodo={(id) => dispatch(deleteTodo(id))}
                    handleEditTodo={handleEditTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;
