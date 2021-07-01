import { AXIOS_REQUEST, sendToRedux } from "../auth/index"
import { toast } from "react-toastify"
import { PLAYERS_GET_DATA, PLAYER_PROFILE } from "../../types/index";

export const getData = (parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("players/playerlist", { parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, PLAYERS_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}

export const playerRegister = (userData, parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("players/playerRegister", { userData, parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			toast.success("Success")
			sendToRedux(rdata.data, dispatch, PLAYERS_GET_DATA);
		} else {
			toast.error(rdata.data)
		}
	}
}

export const resetpass = (user) => {
	return async dispatch => {
		let rdata = await AXIOS_REQUEST("players/playerresetpass", { user }, dispatch, true)
		if (rdata.status) {
			toast.success("Success")
		} else {
			toast.success("failure")
		}
	}
}

export const depositaction = (data, parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("players/playerDeposit", { data, parsedFilter, condition }, dispatch, true)
		if (rdata.status) {
			toast.success("success")
			sendToRedux(rdata.data, dispatch, PLAYERS_GET_DATA);
		} else {
			toast.warn(rdata.data)
		}
	}
}

export const withdrawaction = (data, parsedFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("players/playerWithdrawal", { data, parsedFilter, condition }, dispatch, true)
		if (rdata.status) {
			toast.success("success")
			sendToRedux(rdata.data, dispatch, PLAYERS_GET_DATA);
		} else {
			toast.warn(rdata.data)
		}
	}
}

export const playerBlock = (key, userid, parsedFilter, condition) => {
	return async dispatch => {
		let rdata = await AXIOS_REQUEST("player/playerBlockUnblock", { key, userid, parsedFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch, PLAYERS_GET_DATA);
		} else {
			toast.error("fail")
		}
	}
}

export const getPlayerProfileInfo = (data) => {
	return async dispatch => {
		let rdata = await AXIOS_REQUEST("players/playerprofile", data);
		if (rdata.status) {
			dispatch({ type: PLAYER_PROFILE, data: rdata.data });
		} else {
			toast.error(rdata.data);
		}
	}
}

export const getKYCData = (id) => {
	return async dispatch => {
		await AXIOS_REQUEST("playersplayers/getplayerkycdata", { userid: id })
	}
}

export const profile_update = (data) => {
	return async dispatch => {
		let rdata = await AXIOS_REQUEST("players/playerUpdate", data, dispatch, true);
		if (rdata.status) {
			toast.success("Success");
		} else {
			toast.error(rdata.data);
		}
	}
}