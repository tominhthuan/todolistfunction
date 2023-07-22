import React from 'react'

//img
import checkImg from '../img/checked.png';
import checkMarkImg from '../img/check-mark.png';

function Todos({ item, deleteTodo, clickItem, id, handleEditTodo }) {

    const handleToggleComplete = () => {
        clickItem(item.id);
    };

    const handleDeleteTodo = () => {
        deleteTodo(id);
    };
    const handleEditClick = () => {
        handleEditTodo(item.id);
    };
    return (
        <div className="TodoList">
            <div className={`todo ${item.isCompleted ? 'completed' : ''}`}>
                <button className='ButtonClick' onClick={handleToggleComplete}>
                    {item.isCompleted ? (
                        <img src={checkMarkImg} width={30} height={30} alt="Completed" />
                    ) : (
                        <img src={checkImg} width={30} height={30} alt="Not Completed" />
                    )}
                </button>
                <h1>{item.name}</h1>
                <button className='delete' onClick={handleDeleteTodo}>Delete</button>
                <button className='edit' onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    );
}

export default Todos
