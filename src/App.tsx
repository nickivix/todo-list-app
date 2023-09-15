import React from 'react';
import './styles/TodoApp.css';
import TodoApp from './components/TodoApp';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;