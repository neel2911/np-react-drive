import * as _const from '../../utilities/shared/ConstType';


const initialState = {
    isapiloaded: false,
    files: [],
    breadBrumbs: [{
        id: "root",
        name: 'My Drive'
    }],
    isLoading: false
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case _const.LOADING:
            return {
                ...state,
                isLoading: true
            }
        case _const.CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case _const.UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case _const.DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case _const.INIT_SUCCESS:
            return {
                ...state,
                isapiloaded: true,
                isLoading: false
            }
        case _const.GET_SUCCESS:
            return {
                ...state,
                files: [...action.payload],
                isLoading: false
            }
        case _const.BREADCRUMB_ADD:
            return {
                ...state,
                breadBrumbs: [...state.breadBrumbs, action.payload]
            }
        case _const.BREADCRUMB_REMOVE:
            return {
                ...state,
                breadBrumbs: [...action.payload]
            }
        default:
            break;
    }
    return state;
}