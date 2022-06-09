import axios from 'axios';


export function getAllTasks() {
    return axios.get('http://localhost:3001/tasks');
}


export function createTask() {
    return axios.post('http://localhost:3001/tasks/create');
}


export function editTask() {
    return axios.put('http://localhost:3001/tasks/edit');
}


export function deleteTask() {
    return axios.delete('http://localhost:3001/tasks/delete');
}




