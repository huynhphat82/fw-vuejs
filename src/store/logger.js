import _ from 'lodash';
import { Log } from '~/services';

const logger = store => {
  let prevState = _.cloneDeep(store.state);
  // Listening status of store
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state);
    // Track states for each action (mutation)
    Log.group(mutation.type, () => {
      Log.info('[prevState] => ', prevState);
      Log.info('[actionState] => ', mutation);
      Log.info('[nextState] => ', nextState);
    });
    // save state for next mutation
    prevState = nextState;
  })
};

export default logger;
