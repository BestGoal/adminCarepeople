import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify";
import { FILTERGAMES } from "../../types/index"

function sendToRedux(dispathchData, dispatch) {
	let data = dispathchData.list;
	let totalPages = dispathchData.pages["totalPages"];
	let pages = dispathchData.pages;
	let totalRecords = dispathchData.pages["totalRecords"];
	dispatch({ type: FILTERGAMES, data, totalPages, params: pages, totalRecords });
}

export const getGames = (parseFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("config/getgames", { parseFilter, condition }, dispatch, true);
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch);
		}
	}
}

export const addNewGame = (newItem, parseFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("config/addnewgame", { parseFilter, condition, newItem });
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch);
			toast.success("Successfully saved.")
		} else {
			toast.error("error")
		}
	}
}

export const UpdateGame = (updateGame, parseFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("config/updategame", { parseFilter, condition, updateGame });
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch);
			toast.success("Successfully updated.")
		} else {
			toast.error("error")
		}
	}
}

export const DeleteGame = (sendData, parseFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("config/deletegame", { parseFilter, condition, sendData });
		if (rdata.status) {
			sendToRedux(rdata.data, dispatch);
			toast.success("Successfully deleted.")
		} else {
			toast.error("error")
		}
	}
}

export const gameImageUpdate = (imgData, parseFilter, condition) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("config/updateimage", imgData);
		if (rdata.status) {
			dispatch(getGames(parseFilter, condition))
		} else {
			toast.error("error!")
		}
	}
}