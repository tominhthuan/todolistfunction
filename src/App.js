import React, { useState } from 'react'

import '../src/App.css'


import Header from './Component/Header'
import TodoList from './Component/TodoList'
import Footer from './Component/Footer'

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filter, setFilter] = useState('all');

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const clickItem = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo = (inputTodo) => {
    setTodos([...todos, { name: inputTodo, isCompleted: false, id: todos.length }])
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return {
          ...todo,
          name: updatedTodo.name,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setSelectedTodo(null); // Đặt lại selectedTodo thành null sau khi sửa
  };
  return (
    <div className='App'>
      <Header
        addTodo={addTodo}
        selectedTodo={selectedTodo}
        updateTodo={updateTodo}
      />
      <TodoList
        todos={todos}
        clickItem={clickItem}
        deleteTodo={deleteTodo}
        setSelectedTodo={setSelectedTodo}
        filter={filter}
      />
      <Footer filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App

