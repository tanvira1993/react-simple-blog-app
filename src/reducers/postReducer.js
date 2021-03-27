import {
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    GET_POSTS_START,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    VOTE_START,
    VOTE_SUCCESS,
    VOTE_FAIL,
    CREATE_COMMENT_START,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL
} from "../constants/ActionTypes";

const initialState = {
    posts:'',
    getPostLoading: true
};
    
export default function authReducer(state = initialState, action) {
    switch(action.type){
        case CREATE_POST_START:
            return Object.assign({}, state , action.payload); 
        case CREATE_POST_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case CREATE_POST_FAIL:
            return Object.assign({}, state , action.payload);  
        case GET_POSTS_START:
            return Object.assign({}, state , action.payload); 
        case GET_POSTS_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case GET_POSTS_FAIL:
            return Object.assign({}, state , action.payload); 
        case VOTE_START:
            return Object.assign({}, state , action.payload); 
        case VOTE_FAIL:
            return Object.assign({}, state , action.payload); 
        case VOTE_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case CREATE_COMMENT_START:
            return Object.assign({}, state , action.payload); 
        case CREATE_COMMENT_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case CREATE_COMMENT_FAIL:
            return Object.assign({}, state , action.payload);                     
        default:
    }
    return state;
}