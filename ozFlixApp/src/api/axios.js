import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '53881b1aab07f9bc03d5c3821a70d80f',
    language: 'ko-KR',
  },
});

export default instance;
