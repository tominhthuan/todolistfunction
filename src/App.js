// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './Component/Header';
import TodoList from './Component/TodoList';
import Footer from './Component/Footer';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <TodoList />
        <Footer />

      </div>
    </Provider>
  );
}

export default App;
