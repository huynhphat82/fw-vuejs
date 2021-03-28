
const DEBUG_MODE = true;
const Log = {};

const log = (type, ...args) => {
  DEBUG_MODE && console[type] && typeof console[type] === 'function' && console[type](...args);
};

Log.info = (...args) => log('info', ...args);
Log.log = (...args) => log('log', ...args);
Log.warn = (...args) => log('warn', ...args);
Log.error = (...args) => log('error', ...args);

export default Log;
