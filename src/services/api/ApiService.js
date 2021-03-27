import ENDPOINT from "../../router/ENDPOINT";
import http from "../Http";

const ApiService = {};

ApiService.getUsers = async (showSpinner = true) => {
  return await http.get(ENDPOINT.USER_LIST, { data: {n: 1}, params: {q: 3}, showSpinner });
};

ApiService.getUserDetail = async (id, showSpinner = true) => {
  return await http.get(ENDPOINT.USER_DETAIL(id), { showSpinner });
};

ApiService.getPosts = async (showSpinner = true) => {
  return await http.get(ENDPOINT.POST_LIST, { showSpinner });
}

ApiService.getPostDetail = async (id, showSpinner = true) => {
  return await http.get(ENDPOINT.POST_DETAIL(id), { showSpinner });
}
ApiService.getPost = ApiService.getPostDetail;

ApiService.createPost = async (params, showSpinner = true) => {
  return await http.post(ENDPOINT.POST_INSERT, { data: params, showSpinner });
}

ApiService.updatePost = async (id, params, showSpinner = true) => {
  if (typeof id === 'object') {
    showSpinner = typeof params === 'boolean' ? params : true;
    return await http.put(ENDPOINT.POST_UPDATE(id.id), { data: id, showSpinner });
  }
  return await http.patch(ENDPOINT.POST_UPDATE(id), { data: params, showSpinner });
}

ApiService.deletePost = async (id, showSpinner = true) => {
  return await http.delete(ENDPOINT.POST_DELETE(id), { showSpinner });
}

export default ApiService;
