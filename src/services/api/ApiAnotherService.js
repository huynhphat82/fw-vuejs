import ENDPOINT_ANOTHER from "~/router/ENDPOINT_ANOTHER";
import http from './../AnotherHttp';

const ApiAnotherService = {};

ApiAnotherService.getUsers = async (showSpinner = true) => {
  return await http.get(ENDPOINT_ANOTHER.USER_LIST, { data: {n: 1}, params: {q: 3}, showSpinner });
};

ApiAnotherService.getUserDetail = async (id, showSpinner = true) => {
  return await http.get(ENDPOINT_ANOTHER.USER_DETAIL(id), { showSpinner });
};

export default ApiAnotherService;
