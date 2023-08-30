import React from 'react';

function Notification({ message, onConfirm, onCancel }) {
    return (
        <div className='notification'>
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    );
}

export default Notification;
