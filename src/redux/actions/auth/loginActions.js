import axios from "axios";
import io from 'socket.io-client';
import { Root } from "../../../authServices/rootconfig";
import { AXIOS_REQUEST, getSession } from "./index";
import { LOGIN_URL } from "../../../configs/urlConfig";
import { toast } from "react-toastify";
import { history } from "../../../history";
import { SIDEVAR_DATA, GETBALANCE, PROFILE_USER } from "../../types/index";
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
		let Response = await instance.post("auth/sessionCheck");
		if (Response.data) {
			if (Response.data.status) {
				return {
					auth: {
						isAuth: true,
						isLoading: false,
						userData: Response.data.data.user,
						playerData: Response.data.data.player,
						sidebar: [],
						realSidebar: []
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
			// await dispatch(setUserInfo());
			// await dispatch(setSidebar());
			// dispatch(initSocket());
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

export const setSidebar = () => {
	return async dispatch => {
		let rdata = await AXIOS_REQUEST("auth/adminsidebar_load");
		if (rdata.status) {
			let list = rdata.data, map = {}, node, roots = [], i;
			for (i = 0; i < list.length; i += 1) {
				map[list[i].id] = i;
				list[i].children = [];
			}
			for (i = 0; i < list.length; i += 1) {
				node = list[i];
				if (node.pid !== "0") {
					if (list[map[node.pid]]) {
						list[map[node.pid]].children.push(node);
					}
				} else {
					roots.push(node);
				}
			}
			dispatch({ type: SIDEVAR_DATA, data: roots, rdata: rdata.data })
		}
	}
}

export const initSocket = () => {
	return async (dispatch, getState) => {
		let token = getSession();
		Root.socket = io(Root.admindomain, { query: { token } });
		Root.socket.on("destory", () => {
			deleteSession()
			window.location.assign("/");
		});

		Root.socket.on("balance", (data) => {
			let thisPlayer = getState().auth.playerData;
			for (let i = 0; i < data.data.length; i++) {
				if (thisPlayer._id === data.data[i]._id) {
					thisPlayer.balance = data.data[i].balance
					thisPlayer.bonusbalance = data.data[i].bonusbalance
					dispatch({ type: GETBALANCE, data: Object.assign({}, thisPlayer) })
				}
			}
		});

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

export const themeinforsave = (data) => {
	return async (dispatch) => {
		let rdata = await AXIOS_REQUEST("users/save_themeinfor", { data: data })
		if (rdata.status) {
			dispatch({
				type: "THEMSET",
				theme: rdata.data
			})
		} else {
			toast.error("Fail")
		}
	}
}