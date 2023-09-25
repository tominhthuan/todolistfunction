import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodoApi } from '../api';
import { addTodoRequest, updateExistingTodo, setSelectedTodo, editTodoRequest } from '../redux/actions';

function Header() {
    const [inputTodo, setInputTodo] = useState('');
    const selectedTodo = useSelector((state) => state.selectedTodo);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    debugger; //(3)
    const handleAddTodo = async () => {
        debugger;
        if (inputTodo.trim() !== '') {
            if (selectedTodo) {
                const updatedTodo = { ...selectedTodo, name: inputTodo };
                dispatch(editTodoRequest(updatedTodo));
                dispatch(setSelectedTodo(null));
            } else {
                const newTodo = { name: inputTodo, isCompleted: false };
                dispatch(addTodoRequest(newTodo));
            }
            setInputTodo('');
            inputRef.current.focus();
        }
    };

    const handleInputChange = (e) => {
        setInputTodo(e.target.value);
    };

    debugger;//(4)
    useEffect(() => {
        if (selectedTodo) {
            setInputTodo(selectedTodo.name);
        } else {
            setInputTodo('');
        }
        inputRef.current.focus();
    }, [selectedTodo]);

    return (
        <div className='header'>
            <h1>Todos App</h1>
            <input
                className='new-todo'
                type='text'
                value={inputTodo}
                onChange={handleInputChange}
                ref={inputRef}
            />
            <button className='handleAddTodo' onClick={handleAddTodo}>
                {selectedTodo ? 'Lưu Todo' : 'Thêm Todos'}
            </button>
        </div>
    );
}

export default Header;