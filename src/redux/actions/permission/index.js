import { AXIOS_REQUEST } from "../auth/index"
import { PERMISSION_LOAD_LIST } from "../../types/index"

export const roleList = () => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("permission/role_menuload", {});
        if (rdata.status) {
            dispatch({ type: PERMISSION_LOAD_LIST, data: rdata.data, list: rdata.list })
        }
    }
}

export const rowadd_action = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("permission/role_menuadd", { data }, dispatch, true);
        if (rdata.status) {
            dispatch({ type: PERMISSION_LOAD_LIST, data: rdata.data, list: rdata.list })
        }
    }
}

export const rowinadd_action = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("permission/role_menuadd", { data });
        if (rdata.status) {
            dispatch({ type: PERMISSION_LOAD_LIST, data: rdata.data, list: rdata.list })
        }
    }
}

export const rowupdate_action = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("permission/role_menuupdate", { data });
        if (rdata.status) {
            dispatch({ type: PERMISSION_LOAD_LIST, data: rdata.data, list: rdata.list })
        } else {
            return false
        }
    }
}

export const row_delete_action = (data) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("permission/role_menudelete", { data });
        if (rdata.status) {
            dispatch({ type: PERMISSION_LOAD_LIST, data: rdata.data, list: rdata.list })
        } else {
            return false
        }
    }
}