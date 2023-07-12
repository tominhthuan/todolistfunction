import React, { useState, useEffect } from 'react'

function Header({ addTodo, selectedTodo, updateTodo }) {
    const [inputTodo, setInputTodo] = useState(''); //lưu trữ giá trị input vừa nhập

    useEffect(() => {
        if (selectedTodo) {
            setInputTodo(selectedTodo.name)
        } else {
            setInputTodo('');
        }
    }, [selectedTodo]);


    // const handleAddTodo = () => {
    //     if (inputTodo.trim() !== "") {
    //         addTodo(inputTodo);
    //         setInputTodo('');
    //     }
    // }
    const handleAddTodo = () => {
        if (inputTodo.trim() !== '') {
            if (selectedTodo) {
                // Nếu selectedTodo tồn tại, gọi hàm updateTodo
                updateTodo({
                    ...selectedTodo,
                    name: inputTodo,
                });
            } else {
                // Ngược lại, gọi hàm addTodo
                addTodo(inputTodo);
            }
            setInputTodo('');
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
            />
            <button
                className='handleAddTodo'
                onClick={handleAddTodo}
            >
                {selectedTodo ? "Save Todo " : "Add Todos"}

            </button>
        </div>
    )
}

export default Header



