export const API_URL = 'https://jsonplaceholder.typicode.com';

const ENDPOINT = {
  USER_LIST: '/users',
  USER_DETAIL: id =>  `/users/${id}`,
  POST_LIST: '/posts',
  POST_INSERT: '/posts',
  POST_DETAIL: id => `/posts/${id}`,
  POST_UPDATE: id => `/posts/${id}`,
  POST_DELETE: id => `/posts/${id}`,

};

export default ENDPOINT;
