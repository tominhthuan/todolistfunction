// Header.js
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/actions';
import { useDispatch } from '../context/dispatchContext';

function Header() {
    const [inputTodo, setInputTodo] = useState('');
    const selectedTodo = useSelector((state) => state.selectedTodo);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedTodo) {
            setInputTodo(selectedTodo.name);
        } else {
            setInputTodo('');
        }
        inputRef.current.focus();
    }, [selectedTodo]);

    const handleAddTodo = () => {
        if (inputTodo.trim() !== '') {
            if (selectedTodo) {
                dispatch(updateTodo({ ...selectedTodo, name: inputTodo }));
            } else {
                dispatch(addTodo(inputTodo));
            }
            setInputTodo('');
            inputRef.current.focus();
        }
    };

    const handleInputChange = (e) => {
        setInputTodo(e.target.value);
    };

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
