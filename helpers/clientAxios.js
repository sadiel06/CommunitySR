import axios from 'axios';

const ClientAxios = axios.create({
  baseURL: 'http://10.0.0.5:8080/API/',
});

export default ClientAxios;
