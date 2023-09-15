import React, { useState, useEffect } from 'react';

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<any[]>([])
    const [newTodo, setNewTodo] = useState<string>('')
    const [statusText, setStatusText] = useState<string>('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => setTodos(data.slice(0, 10)))
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value)
    };

    const handleAddTodo = () => {
        setStatusText(`Adding: ${newTodo}`)

        setTimeout(() => {
            setTodos(prevTodos => [...prevTodos, { title: newTodo, id: Math.random() }])
            setNewTodo('')
            setStatusText('')
        }, 2000);
    };

    const handleDownload = () => {
        const content = todos.map((todo, index) => `${index + 1}. ${todo.title}`).join('\n')
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'list.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    };

    return (
        <div>
            <div className="button-container">
                <button onClick={handleDownload}>Download TODO List</button>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="Type a new todo..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTodo();
                        }
                    }}
                />
                Press "Enter" to add the new TODO item to the list
            </div>

            <div className="todo-lists">
                <ol className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={index} className="todo-item">
                            {todo.title}
                        </li>
                    ))}
                </ol>

                <ol className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={index} className="todo-item">
                            {todo.title}
                        </li>
                    ))}
                </ol>
            </div>

            <div className="status-text" style={{ color: 'red' }}>
                {statusText}
            </div>
        </div>
    );
};

export default TodoApp;
