import { CREATE_POLL } from './types';
import { DELETE_POLL } from './types';
import { ADD_POLL_OPTION } from './types';
import { FETCH_ALL_POLLS } from './types';
import { FETCH_USER_POLLS } from './types';
import { DEAUTH_USER } from './types';
import { AUTH_USER } from './types';
import axios from 'axios';
import {browserHistory} from 'react-router';

const API_URL = 'http://localhost:3001/';

export function createPoll(poll) {
    return {
        type: CREATE_POLL,
        payload: poll
    }
}

export function deletePoll(poll) {
    return {
        type: DELETE_POLL,
        payload: poll
    }
}

export function addPollOption(option) {
    return {
        type: ADD_POLL_OPTION,
        payload: option
    }
}

export function fetchAllPolls(polls) {
    return {
        type: FETCH_ALL_POLLS,
        payload: polls
    }
}

export function fetchUserPolls(polls) {
    return {
        type: FETCH_USER_POLLS,
        payload: polls
    }
}

export function signin({email, password}) {
    return function(dispatch) {
        axios.post(`${API_URL}signin`, {email, password})
            .then(postResponse => {
                const token = postResponse.data.token;
                const userID = postResponse.data.id;
                axios.get(`${API_URL}user/${userID}`)
                    .then(getResponse => {
                        //send new user state to user reducer (auth: true and userID)
                        dispatch({
                            type: AUTH_USER,
                            payload: {authenticated: true, userID: userID}
                        });
                        //save jwt token to localstorage
                        localStorage.setItem('token', token);
                    })
                    .catch((error) => console.log(error));

                    //make it to where route is executed only when reducer is done
                    browserHistory.push(`/user/${userID}`);
            })
            .catch((error) => console.log(error));   
    }
}

export function signout() {
    localStorage.removeItem('token');
    axios.get(`${API_URL}signout`)
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
        return {type: DEAUTH_USER, payload: {authenticated: false, userID: null}}
}

export function signup({email, password}) {
     return function(dispatch) {
        axios.post(`${API_URL}signup`, {email, password})
            .then(postResponse => {
                const token = postResponse.data.token;
                const userID = postResponse.data.id;
                axios.get(`${API_URL}user/${userID}`)
                    .then(getResponse => {
                        //send new user state to user reducer (auth: true and userID)
                        dispatch({
                            type: AUTH_USER,
                            payload: {authenticated: true, userID: userID}
                        });
                        //save jwt token to localstorage
                        localStorage.setItem('token', token);
                         browserHistory.push(`/user/${userID}`);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));    
    }
}

export function authUser(credentials) {
    return {
        type: AUTH_USER,
        payload: credentials
    }
}

export function deauthUser(credentials) {
    return {
        type: DEAUTH_USER,
        payload: credentials
    }
}
