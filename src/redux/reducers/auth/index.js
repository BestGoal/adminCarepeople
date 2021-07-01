import { PROFILE_USER, HOMEPAGELOADIN, SIDEVAR_DATA, GETBALANCE } from "../../types/index";

let initdata = {
	isAuth: false,
	isLoading: false,
	userData: {},
	playerData: {},
	sidebar: [],
	realSidebar: []
}

export default (state =initdata, action) => {
	switch (action.type) {
		case HOMEPAGELOADIN:{
			return {...state, isLoading: action.data}
		}
		case PROFILE_USER: {
			return { ...state, ...action.data }
		}
		case SIDEVAR_DATA: {
			return { ...state, sidebar: action.data, realSidebar: action.rdata }
		}
		case GETBALANCE:{
			return { ...state, playerData: action.data}
		}
		default: {
			return state
		}
	}
}