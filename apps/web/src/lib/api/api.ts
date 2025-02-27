import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV == 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:5000/v1',
});
