import { OK } from "./HTTP_CODE_STATUS";

const json = (message, status = OK, success = true, statusText = null) => ({
  success,
  status,
  [success ? 'data' : 'error']: message,
  // ...(statusText ? { statusText } : {}),
});

const Response = {
  success: (message, code, statusText) => json(message, code, true, statusText),
  error: (message, code, statusText) => json(message, code, false, statusText),
};

export default Response;
