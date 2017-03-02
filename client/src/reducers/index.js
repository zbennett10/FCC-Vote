import { combineReducers } from 'redux';
import pollsReducer from './polls';
import userReducer from './user';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    polls: pollsReducer,
    form: formReducer,
    user: userReducer
});

export default rootReducer;
