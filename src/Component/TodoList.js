import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from '../context/dispatchContext';
// import { clickItem, deleteTodo, setSelectedTodo } from '../redux/actions';
import Todos from './Todos';
import Pagination from './Pagination';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const filter = useSelector((state) => state.filter);
    // const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 3;



    // const handleEditTodo = (id) => {
    //     const selectedTodo = todos.find((todo) => todo.id === id);
    //     dispatch(setSelectedTodo(selectedTodo));
    // };

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
                // clickItem={(id) => dispatch(clickItem(id))}
                // deleteTodo={(id) => dispatch(deleteTodo(id))}
                // handleEditTodo={handleEditTodo}
                />
            ))}

            <Pagination setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default TodoList;