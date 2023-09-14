import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clickItemRequest, deleteTodoRequest, setSelectedTodo } from '../redux/actions';
import Notification from './Notification/Notification';

//img
import checkImg from '../img/checked.png';
import checkMarkImg from '../img/check-mark.png';

function Todos({ item, deleteTodoRequest, setSelectedTodo, editTodoRequest, clickItemRequest }) {
    const [editedTodo, setEditedTodo] = useState({ ...item });
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleToggleComplete = () => {
        clickItemRequest(item);
    };

    const handleDeleteTodo = () => {
        setShowDeleteConfirmation(false);
        deleteTodoRequest(item.id);
    };

    const handleEditTodoClick = () => {
        setEditedTodo({ ...item });
        setShowEditConfirmation(true);
    };


    const handleConfirmEdit = () => {
        editTodoRequest(editedTodo)
        setShowEditConfirmation(false);
    };

    const handleCancelEdit = () => {
        setEditedTodo({ ...item });
        setShowEditConfirmation(false);
    };

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
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
                <button className='delete' onClick={handleDeleteConfirmation}>
                    Delete
                </button>
                <button className='edit' onClick={handleEditTodoClick}>
                    Edit
                </button>
                {showEditConfirmation && (
                    <Notification
                        message='Bạn có chắc chắn muốn thay đổi công việc?'
                        onConfirm={handleConfirmEdit}
                        onCancel={handleCancelEdit}
                    />
                )}
                {showDeleteConfirmation && (
                    <Notification
                        message='Bạn có chắc chắn muốn xóa công việc này?'
                        onConfirm={handleDeleteTodo}
                        onCancel={handleCancelDelete}
                    />
                )}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodoRequest: (id) => dispatch(deleteTodoRequest(id)),
        clickItemRequest: (itemId) => dispatch(clickItemRequest(itemId)),
        setSelectedTodo: (todo) => dispatch(setSelectedTodo(todo)),

    };
};

export default connect(null, mapDispatchToProps)(Todos);
