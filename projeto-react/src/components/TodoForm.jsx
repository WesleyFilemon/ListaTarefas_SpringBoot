import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('PRAZO'); 
    const [daysToComplete, setDaysToComplete] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('ALTA'); 

    const handleAddTodo = () => {
        if (!description.trim()) {
            alert('Descrição da tarefa é obrigatória.');
            return;
        }

        if (taskType === 'PRAZO' && !daysToComplete) {
            alert('Dias para completar é obrigatório para tarefas do tipo PRAZO.');
            return;
        }

        if (taskType === 'DATA' && !dueDate) {
            alert('Data de vencimento é obrigatória para tarefas do tipo DATA.');
            return;
        }

        let taskData = {
            description,
            completed: false, 
            taskType,
            priority
        };

        if (taskType === 'PRAZO') {
            taskData.daysToComplete = daysToComplete;
        } else if (taskType === 'DATA' || taskType === 'LIVRE') {
            taskData.dueDate = dueDate;
        }

        addTodo(taskData);

        setDescription('');
        setTaskType('PRAZO');
        setDaysToComplete(null);
        setDueDate('');
        setPriority('ALTA');
    };

    return (
        <div className='TodoForm'>
            <label>
                Descrição:
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Tipo de Tarefa:
                <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                    <option value='PRAZO'>PRAZO</option>
                    <option value='DATA'>DATA</option>
                    <option value='LIVRE'>LIVRE</option>
                </select>
            </label>
            {taskType === 'PRAZO' && (
                <label>
                    Dias para Completar:
                    <input
                        type='number'
                        value={daysToComplete || ''}
                        onChange={(e) => setDaysToComplete(parseInt(e.target.value))}
                    />
                </label>
            )}
            {(taskType === 'DATA' || taskType === 'LIVRE') && (
                <label>
                    Data de Vencimento:
                    <input
                        type='date'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>
            )}
            <label>
                Prioridade:
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value='ALTA'>ALTA</option>
                    <option value='MEDIA'>MEDIA</option>
                    <option value='BAIXA'>BAIXA</option>
                </select>
            </label>
            <button type="button" className="todo-btn" onClick={handleAddTodo}>Adicionar Tarefa</button>
        </div>
    );
};
