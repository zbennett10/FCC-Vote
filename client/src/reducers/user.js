import {DEAUTH_USER} from '../actions/types';
import {AUTH_USER} from '../actions/types';


export default function (state = {authentication: false, userID: null}, action){
    let userID;
    switch(action.type) {
        case AUTH_USER:
            return action.payload;
            break;
        case DEAUTH_USER:
            return action.payload;
            break;
        default: 
            return state;
    }
}