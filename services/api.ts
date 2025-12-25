import axios from 'axios';
import Constants from '../constants';

const api = axios.create({
  baseURL: Constants.API_BASE_URL,
  timeout: 30000, // 30 seconds
});

export default api;
