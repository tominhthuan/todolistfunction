import React from 'react';
import { connect } from 'react-redux';
import { clickItem, deleteTodo, setSelectedTodo } from '../redux/actions';

//img
import checkImg from '../img/checked.png';
import checkMarkImg from '../img/check-mark.png';

function Todos({ item, deleteTodo, clickItem, handleEditTodo }) {
    const handleToggleComplete = () => {
        clickItem(item.id);
    };

    const handleDeleteTodo = () => {
        deleteTodo(item.id);
    };

    const handleEditClick = () => {
        handleEditTodo(item);
    };

    return (
        <div className='TodoList'>
            <div className={`todo ${item.isCompleted ? 'completed' : ''}`}>
                <button className='ButtonClick' onClick={handleToggleComplete}>
                    {item.isCompleted ? (
                        <img src={checkImg} width={30} height={30} alt='Completed' />
                    ) : (
                        <img src={checkMarkImg} width={30} height={30} alt='Not Completed' />
                    )}
                </button>
                <h1>{item.name}</h1>
                <button className='delete' onClick={handleDeleteTodo}>
                    Delete
                </button>
                <button className='edit' onClick={handleEditClick}>
                    Edit
                </button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickItem: (id) => dispatch(clickItem(id)),
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        handleEditTodo: (todo) => dispatch(setSelectedTodo(todo)),
    };
};

export default connect(null, mapDispatchToProps)(Todos);
