// TodoList.js
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickItem, deleteTodo, setSelectedTodo } from '../redux/actions';
import Todos from './Todos';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 5;



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

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
        <div>
            {currentTodos.map((item, index) => (
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
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Trang trước
                </button>
                <button
                    disabled={indexOfLastTodo >= filteredTodos.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}

export default TodoList;
