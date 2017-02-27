import { combineReducers } from 'redux';
import pollsReducer from './polls';

const rootReducer = combineReducers({
    polls: pollsReducer
});

export default rootReducer;
