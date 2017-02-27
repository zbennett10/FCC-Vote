import { CREATE_POLL } from './types';
import { DELETE_POLL } from './types';
import { ADD_POLL_OPTION } from './types';
import { VIEW_POLL } from './types';
import { FETCH_ALL_POLLS } from './types';

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

export function viewPoll(poll) {
    return {
        type: VIEW_POLL,
        payload: poll
    }
}

export function fetchAllPolls(polls) {
    return {
        type: FETCH_ALL_POLLS,
        payload: polls
    }
}