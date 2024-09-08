import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Cambia esto a la URL de tu API de Laravel
});

export default instance;
