import axios from "axios";
import { Root } from "../../../authServices/rootconfig";
import { AXIOS_REQUEST, getSession } from "./index";
import { LOGIN_URL } from "../../../configs/urlConfig";
import { toast } from "react-toastify";
import { history } from "../../../history";
import { PROFILE_USER } from "../../types/index";
import { setSession, deleteSession, url_path } from "./index";

export const sessionCheck = async () => {
	try {
		const instance = axios.create({
			baseURL: Root.adminurl,
			timeout: 3000,
			headers: {
				'authorization': `${getSession()}`,
				"Content-Type": "application/json",
			}
		});
		let Response = await instance.get("auth/sessionCheck");
		if (Response.data) {
			if (Response.data.status) {
				return {
					auth: {
						isAuth: true,
						isLoading: false,
						userData: Response.data.data
					}
				}
			} else if (!Response.data.status && Response.data.isSession === true) {
				return { auth: { isAuth: false, realSidebar: [] } }
			} else {
				return { auth: { isAuth: false, realSidebar: [] } }
			}
		} else {
			return { auth: { isAuth: false, realSidebar: [] } }
		}
	} catch (e) {
		return { auth: { isAuth: false, realSidebar: [] } }
	}
}

export const loginWithJWT = user => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("auth/adminlogin", user, dispatch, true);
		if (rdata.status) {
			sessionStorage.clear();
			await setSession(rdata.token);
			window.location.assign("/");
		} else {
			toast.error(rdata.data);
		}
	}
}

export const setUserInfo = () => {
	return async (dispatch) => {
		let userData = await sessionCheck();
		dispatch({ type: PROFILE_USER, data: userData.auth });
	}
}

export const initSocket = () => {
	return async (dispatch, getState) => {
		if (url_path() === LOGIN_URL) {
			history.push("/Dashboard");
		}
	}
}

export const logoutWithJWT = () => {
	return async dispatch => {
		await AXIOS_REQUEST("auth/logout");
		deleteSession();
		sessionStorage.clear()
		window.location.assign(LOGIN_URL)
	}
}

export const changepassword = (user) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("auth/adminchangepassword", { user })
		if (rdata.status) {
			toast.success("Successfully changed!")
		} else {
			toast.error("fail")
		}
	}
}