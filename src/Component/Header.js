import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodoApi, updateTodoApi } from '../api';
import { addTodo, updateTodo, setSelectedTodo } from '../redux/actions';

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

    const handleAddTodo = async () => {
        if (inputTodo.trim() !== '') {
            if (selectedTodo) {
                const updatedTodo = { ...selectedTodo, name: inputTodo };
                await updateTodoApi(updatedTodo);
                dispatch(updateTodo(updatedTodo));
                dispatch(setSelectedTodo(null));
            } else {
                const newTodo = { name: inputTodo, isCompleted: false };
                const addedTodo = await addTodoApi(newTodo);
                dispatch(addTodo(addedTodo));
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
