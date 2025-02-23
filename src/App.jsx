import { useEffect, useState } from "react";
import React from "react";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos"))
  
      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addtodo = (todo) => {
        setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
    };

    const updatetodo = (id, updatedTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
    };

    const deletetodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const completetoggle = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <TodoProvider value={{ todos, addtodo, updatetodo, deletetodo, completetoggle }}>
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 min-h-screen py-8">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        TODO's  
                    </h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
