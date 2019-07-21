import * as _const from '../../utilities/shared/ConstType';

// Action
const init = () => {
    return (dispatch) => {
        dispatch({ type: _const.INIT_SUCCESS });
    }
}

const create = () => {
    return (dispatch) => {
        dispatch({ type: _const.CREATE_SUCCESS });

    }
}

const breadCrumbAdd = (file) => {
    return (dispatch) => {
        dispatch({ type: _const.BREADCRUMB_ADD, payload: file });
    }
}

const breadCrumbRemove = (index) => {
    return (dispatch) => {
        dispatch({ type: _const.BREADCRUMB_REMOVE, payload: index });
    }
}

const get = (request) => {
    return (dispatch) => {
        request.then((response) => {
            dispatch({ type: _const.GET_SUCCESS, payload: response.result.files });
        });
    }
}

const upload = () => {
    return (dispatch) => {
        dispatch({ type: _const.UPLOAD_SUCCESS });
    }
}

const _delete = () => {
    return (dispatch) => {
        dispatch({ type: _const.DELETE_SUCCESS });
    }
}

export default {
    init,
    create,
    get,
    breadCrumbAdd,
    breadCrumbRemove,
    upload,
    delete: _delete
};