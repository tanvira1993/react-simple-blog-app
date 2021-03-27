import {
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SIGNUP_START,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL
} from "../constants/ActionTypes";

const initialState = {
    isLoggedIn: false,
    authInfo:'',
    profile:''
};
    
export default function authReducer(state = initialState, action) {
    switch(action.type){
        case USER_LOGIN_START:
			return Object.assign({}, state , action.payload); 
		case USER_LOGIN_SUCCESS:
			return Object.assign({}, state , action.payload); 
		case USER_LOGOUT_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case USER_SIGNUP_START:
            return Object.assign({}, state , action.payload); 
        case USER_SIGNUP_SUCCESS:
            return Object.assign({}, state , action.payload); 
        case USER_SIGNUP_FAIL:
            return Object.assign({}, state , action.payload);         
        default:
    }
    return state;
}