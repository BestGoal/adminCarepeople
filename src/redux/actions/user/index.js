import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { toast } from "react-toastify"
import { USER_GET_DATA } from "../../types/index"

export const getAllClients = (parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("admin/getAllClients", { parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, USER_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}

export const updateClients = (userData, parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("admin/updateClient", { userData, parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, USER_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}

export const getAllWorker = (parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("admin/getAllWorker", { parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, USER_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}

export const updateWorkers = (userData, parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("admin/updateWorkers", { userData, parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, USER_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}