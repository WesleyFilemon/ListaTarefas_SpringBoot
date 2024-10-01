import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

export const TodoList = ({ task, deleteTodo, toggleComplete, editTodo }) => {
    const [editing, setEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedDaysToComplete, setEditedDaysToComplete] = useState(task.daysToComplete || '');
    const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');
    const [editedPriority, setEditedPriority] = useState(task.priority);
    const [showDetails, setShowDetails] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedDescription(task.description);
        setEditedDaysToComplete(task.daysToComplete || '');
        setEditedDueDate(task.dueDate || '');
        setEditedPriority(task.priority);
    };

    const handleSaveEdit = () => {
        const updatedTask = {
            ...task,
            description: editedDescription,
            daysToComplete: editedDaysToComplete,
            dueDate: editedDueDate,
            priority: editedPriority
        };

        editTodo(updatedTask);
        setEditing(false);
    };

    const handleChangePriority = (e) => {
        setEditedPriority(e.target.value);
    };

    const handleChangeDaysToComplete = (e) => {
        setEditedDaysToComplete(parseInt(e.target.value));
    };

    const handleChangeDueDate = (e) => {
        setEditedDueDate(e.target.value);
    };

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    const getStatusText = () => {
        if (task.completed) {
            return 'Concluída';
        }

        switch (task.taskType) {
            case 'PRAZO':
                if (task.daysToComplete !== null) {
                    return `${task.daysToComplete} Para entrega`;
                } else {
                    return 'Sem prazo definido';
                }
            case 'DATA':
                if (task.dueDate) {
                    const dueDate = new Date(task.dueDate);
                    const currentDate = new Date();
                    const differenceInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

                    if (differenceInDays < 0) {
                        return `${Math.abs(differenceInDays)} dias de atraso`;
                    } else if (differenceInDays === 0) {
                        return 'Hoje é o prazo final';
                    } else {
                        return `Faltam ${differenceInDays} dias`;
                    }
                } else {
                    return 'Sem data de vencimento';
                }
            case 'LIVRE':
                return 'Prevista';
            default:
                return 'Prevista';
        }
    };

    return (
        <div className="Todo">
            <p
                className={`${task.completed ? "completed" : "incompleted"}`}
                onClick={handleShowDetails}
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    className={`check-icon ${task.completed ? 'checked' : ''}`}
                    onClick={() => toggleComplete(task.id)}
                />
                {task.description}
            </p>
            {showDetails && (
                <div className="task-details">
                    <p><strong>Descrição:</strong> {task.description}</p>
                    <p><strong>Estado:</strong> {getStatusText()}</p>
                    {task.taskType === 'PRAZO' && task.daysToComplete !== null && <p><strong>Prazo:</strong> {task.daysToComplete} dias</p>}
                    {task.taskType === 'DATA' && task.dueDate && <p><strong>Data de Vencimento:</strong> {task.dueDate}</p>}
                    <p><strong>Prioridade:</strong> {task.priority}</p>
                </div>
            )}
            <div className="action-buttons">
                <FontAwesomeIcon
                    className="edit-icon"
                    icon={faPen}
                    onClick={handleEdit}
                />
                <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    onClick={() => deleteTodo(task.id)}
                />
            </div>
            {editing && (
                <div className="edit-form">
                    <label>
                        Descrição:
                        <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Dias para Completar:
                        <input
                            type="number"
                            value={editedDaysToComplete}
                            onChange={handleChangeDaysToComplete}
                        />
                    </label>
                    <label>
                        Data de Vencimento:
                        <input
                            type="date"
                            value={editedDueDate}
                            onChange={handleChangeDueDate}
                        />
                    </label>
                    <label>
                        Prioridade:
                        <select value={editedPriority} onChange={handleChangePriority}>
                            <option value="ALTA">ALTA</option>
                            <option value="MEDIA">MEDIA</option>
                            <option value="BAIXA">BAIXA</option>
                        </select>
                    </label>
                    <div>
                        <button onClick={handleSaveEdit}>Salvar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};
