import axios from 'axios';

const api = axios.create({
  /* CRIANDO A CONEXÃO PARA INJEÇÃO DA API*/
  baseURL: 'http://localhost:8080/api', 
});

export default api;
