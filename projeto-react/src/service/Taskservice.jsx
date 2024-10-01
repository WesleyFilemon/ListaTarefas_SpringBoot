import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

export class Taskservice {
    listarTodos() {
        return axiosInstance.get('/api/task');
    }
    
    listarCompleted() {
        return axiosInstance.get('/api/task/completed');
    }

    listaIncomplete() {
        return axiosInstance.get('/api/task/incomplete');
    }

    excluirTarefa(id) {
        return axiosInstance.delete(`/api/task/${id}`);
    }

    adicionarTarefa(data) {
        return axiosInstance.post('/api/task', data);
    }
    editarTarefa(updatedTask) {
        return axiosInstance.put(`/api/task/${updatedTask.id}`, updatedTask);
    }
}
