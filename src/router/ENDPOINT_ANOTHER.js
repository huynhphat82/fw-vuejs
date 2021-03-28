
export const API_URL_ANOTHER = 'https://reqres.in/api';

const ENDPOINT_ANOTHER = {
  USER_LIST: '/users',
  USER_DETAIL: id =>  `/users/${id}`,
  POST_LIST: '/posts',
  POST_INSERT: '/posts',
  POST_DETAIL: id => `/posts/${id}`,
  POST_UPDATE: id => `/posts/${id}`,
  POST_DELETE: id => `/posts/${id}`,

};

export default ENDPOINT_ANOTHER;
