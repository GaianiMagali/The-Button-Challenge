import { userLoggedActions } from "./actions";
import { user_logged_initial_state } from "./userLogged";

export const userLoggedReducer = (state = user_logged_initial_state, { payload, type }) => {
    switch (type) {
        case userLoggedActions.USER_LOGGED_SUCCESS:
            return {
                ...state,
                isPending: false,
                success: true,
                error: null,
                logged: true,
                user: payload.data[0]
            }

        case userLoggedActions.USER_LOGGED_PENDING:
            return {
                ...state,
                isPending: true
            }

        case userLoggedActions.USER_LOGGED_FAILED:
            return {
                ...state,
                isPending: false,
                success: false,
                error: payload.error,
                logged: false
            }

        case userLoggedActions.LOGOUT:
            return {
                ...state,
                isPending: false,
                success: false,
                error: null,
                logged: false,
                user: {}
            }
        case userLoggedActions.SET_USER_LOGGED:
            return {
                ...state,
                isPending: false,
                success: true,
                error: null,
                user: payload.data,
                logged: !!payload.data
            }
        default:
            return state;
    }
}