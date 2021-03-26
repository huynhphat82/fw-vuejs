import { OK } from "./HTTP_CODE_STATUS";

const json = (message, code = OK, success = true) => ({
  success: success,
  status_code: code,
  //message_type: 'SUCCESS', // 'WARNING' | 'FAILED'
  [success ? 'data' : 'error']: message
});

const Response = {
  success: (message, code) => json(message, code),
  error: (message, code) => json(message, code, false)
};

export default Response;
