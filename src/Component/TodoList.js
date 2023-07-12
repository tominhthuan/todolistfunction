import React from 'react'
import Todos from './Todos'

function TodoList({ todos, clickItem, deleteTodo, setSelectedTodo, filter }) {
    const handleEditTodo = (id) => {
        const selectedTodo = todos.find((todo) => todo.id === id);
        setSelectedTodo(selectedTodo);
    }

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.isCompleted;
        } else if (filter === 'active') {
            return !todo.isCompleted;
        } else {
            return true;
        }
    });

    return (
        <div>
            {filteredTodos.map((item, index) => (
                <Todos
                    key={item.id}
                    item={item}
                    id={item.id}
                    index={index}
                    clickItem={clickItem}
                    deleteTodo={deleteTodo} // Truyền hàm deleteTodo xuống component Todos
                    handleEditTodo={handleEditTodo}

                />
            ))}
        </div>
    );
}

export default TodoList;


