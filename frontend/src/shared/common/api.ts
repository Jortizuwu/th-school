import axios from 'axios';
import { ENVS } from './env';

export const thApi = axios.create({
  baseURL: ENVS.API_URL,
});
