import React, { useState } from 'react';
import { connect } from 'react-redux';
import { clickItem, deleteTodo, setSelectedTodo, updateExistingTodo } from '../redux/actions';
import Notification from './Notification/Notification';

//img
import checkImg from '../img/checked.png';
import checkMarkImg from '../img/check-mark.png';

function Todos({ item, deleteTodo, setSelectedTodo, updateExistingTodo, clickItem }) {
    const [editedTodo, setEditedTodo] = useState({ ...item });
    const [showEditConfirmation, setShowEditConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleToggleComplete = () => {
        clickItem(item.id);
    };

    const handleDeleteTodo = () => {
        setShowDeleteConfirmation(false);
        deleteTodo(item.id);
    };

    const handleEditTodoClick = () => {
        setEditedTodo({ ...item });
        setShowEditConfirmation(true);
    };



    const handleConfirmEdit = () => {
        setSelectedTodo({ ...editedTodo });
        updateExistingTodo(editedTodo);
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
                        message='Bạn có chắc chắn muốn thay đổi công việc này?'
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
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        clickItem: (id) => dispatch(clickItem(id)),
        setSelectedTodo: (todo) => dispatch(setSelectedTodo(todo)),
        updateExistingTodo: (todo) => dispatch(updateExistingTodo(todo)),
    };
};

export default connect(null, mapDispatchToProps)(Todos);
