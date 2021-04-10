import axios from 'axios';

const ClientAxios = axios.create({
  baseURL: 'http://25.18.180.159/API/',
});

export default ClientAxios;
