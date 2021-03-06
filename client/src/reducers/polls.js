import { CREATE_POLL } from '../actions/types';
import { DELETE_POLL } from '../actions/types';
import { ADD_POLL_OPTION } from '../actions/types';
import { FETCH_ALL_POLLS } from '../actions/types';
import { FETCH_USER_POLLS } from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_ALL_POLLS:
            return action.payload;
        case CREATE_POLL:
            return state.concat(action.payload);
        case DELETE_POLL:
            return state;
        case ADD_POLL_OPTION:
            return state;
        case FETCH_USER_POLLS:
            return action.payload;
        default:
            return state;
    }
}