
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './Component/Header';
import TodoList from './Component/TodoList';
import Footer from './Component/Footer';
import { DispatchProvider } from './context/dispatchContext';

function App() {
  return (
    <Provider store={store}>
      <DispatchProvider dispatch={store.dispatch}>
        <div className='App'>
          <Header />
          <TodoList />
          <Footer />
        </div>
      </DispatchProvider>

    </Provider>
  );
}

export default App;
