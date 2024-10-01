import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Taskservice } from '../service/Taskservice';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showIncomplete, setShowIncomplete] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        const taskService = new Taskservice();

        if (showCompleted) {
            taskService.listarCompleted()
                .then((response) => {
                    console.log(response.data);
                    setTodos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (showIncomplete) {
            taskService.listaIncomplete()
                .then((response) => {
                    console.log(response.data);
                    setTodos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            taskService.listarTodos()
                .then((response) => {
                    console.log(response.data);
                    setTodos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const addTodo = (todo) => {
        const taskService = new Taskservice();

        taskService.adicionarTarefa(todo)
            .then((response) => {
                console.log(response.data);
                fetchTasks(); 
            })
            .catch((error) => {
                console.error('Erro ao adicionar tarefa:', error);
            });
    };

    const deleteTodo = (id) => {
        const taskService = new Taskservice();

        taskService.excluirTarefa(id)
            .then(() => {
                setTodos(todos.filter((todo) => todo.id !== id));
                console.log(`Tarefa com ID ${id} excluída.`);
            })
            .catch((error) => {
                console.error(`Erro ao excluir tarefa com ID ${id}:`, error);
            });
    };

    const toggleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        const taskService = new Taskservice();
        const updatedTask = updatedTodos.find(todo => todo.id === id);
        taskService.editarTarefa(updatedTask)
            .then(() => {
                console.log(`Tarefa com ID ${id} marcada como concluída.`);
            })
            .catch((error) => {
                console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
            });
    };

    const editTodo = (updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        const taskService = new Taskservice();
        taskService.editarTarefa(updatedTodo)
            .then(() => {
                console.log(`Tarefa com ID ${updatedTodo.id} editada.`);
            })
            .catch((error) => {
                console.error(`Erro ao editar tarefa com ID ${updatedTodo.id}:`, error);
            });
    };

    const listarTarefasCompletas = () => {
        setShowCompleted(true);
        setShowIncomplete(false);
        fetchTasks();
    };

    const listarTodasAsTarefas = () => {
        setShowCompleted(false);
        setShowIncomplete(false);
        fetchTasks();
    };

    const listarTarefasIncompletas = () => {
        setShowCompleted(false);
        setShowIncomplete(true);
        fetchTasks();
    };

    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
                <TodoList
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                />
            ))}
            <div className="todo-buttons">
                <button className="todo-btn" onClick={listarTodasAsTarefas}>Listar Todas as Tarefas</button>
                <button className="todo-btn" onClick={listarTarefasCompletas}>Listar Tarefas Completas</button>
                <button className="todo-btn" onClick={listarTarefasIncompletas}>Listar Tarefas Incompletas</button>
            </div>
        </div>
    );
};

export default TodoWrapper;
