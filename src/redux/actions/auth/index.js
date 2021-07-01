import jwt from "jwt-simple"
import axios from "axios"
import { toast } from "react-toastify";
import { Root } from "../../../authServices/rootconfig"
import { history } from "../../../history"
import { HOMEPAGELOADIN } from "../../types/index";

export const setSession = async (string) => {
	await localStorage.setItem(Root.token,string);
	return true;
}

export const getSession = () => {
	let token = localStorage.getItem(Root.token);
	return token;
}

export const url_path = () => {
	return history.location.pathname;
}

export const AXIOS_REQUEST = async (url,inputdata,dispatch,loading) => {
	try{
		const instance = axios.create({
			baseURL: Root.adminurl,
			timeout: Root.timeout,
			headers: {
				'authorization': `${getSession()}`,
				"Content-Type": "application/json",
				"device": window.innerWidth,
				"user-device": "web",
			},
		});

		if(loading){
			dispatch({type: HOMEPAGELOADIN, data: true})
		}
		let Response =  await instance.post(url,inputdata);
		if(loading){
			dispatch({type: HOMEPAGELOADIN, data: false})
		}
		if(Response.data){
			if(!Response.data.status && Response.data.isSession === true){
				toast.error(Response.data.message);
				deleteSession();
				window.location.reload();
			}else{
				return Response.data;
			}
		}else{
			return {status: false, data: "error"}
		}
	}catch(e){
		if(loading){
			dispatch({type: HOMEPAGELOADIN  , data: false})
		}
		return {status: false, data: "network error"}
	}
}

export const deleteSession = () => {
	localStorage.setItem(Root.token,undefined);
	return true;
}

export const sendToRedux = (dispathchData, dispatch, dispatchString) => {
	let data = dispathchData.data;
	let totalPages = dispathchData.pages["totalPages"];
	let pages = dispathchData.pages;
	let totalRecords = dispathchData.pages["totalRecords"];
	dispatch({ type: dispatchString, data, totalPages, params: pages, totalRecords });
}



export const getSelectData = (data, v_key, l_key) => {
	let returnData = [
		{value: "", label: "All"}
	];
	for(let i = 0 ; i < data.length ; i ++){
		returnData.push({ value: data[i][v_key], label: data[i][l_key] });
	}
	return returnData;
}

export const getIndex = (arr, arr2, arr3, params = {}) =>{
	if (arr2.length > 0) {
		let startIndex = arr.findIndex(i => i._id === arr2[0]._id) + 1
		let endIndex = arr.findIndex(i => i._id === arr2[arr2.length - 1]._id) + 1
		let finalArr = [startIndex, endIndex]
		return (arr3 = finalArr)
	} else {
		let finalArr = [arr.length - parseInt(params.perPage), arr.length]
		return (arr3 = finalArr)
	}
}

export const getParseFilter = (parseFilter, count) => {
	let {page, perPage} = parseFilter;
	if(!page || !perPage){
		page = 0;
		perPage = 10;	
	}
	let returnData = {
		start: (page > 0 ? page - 1: 0) * perPage,
		end: parseInt(perPage)
	}

	if(returnData.start >= count) {
		returnData.start = 0;
		return { returnData, params: {page: parseInt(page), perPage: parseInt(perPage)}};
	} else {
		return { returnData, params: {page: parseInt(page), perPage: parseInt(perPage)}};
	}
}

export const dataProcess = (rdata, params) => {
	return	{
		AllData: rdata.data, 
		Count: rdata.count,
		totalPages: Math.ceil(rdata.count / params.perPage),
 		start: (params.page > 0 ? params.page - 1: 0) * params.perPage,
		end: rdata.data.length >= params.perPage ? 
			params.page * params.perPage
			: 
			(
				params.page > 0 ? (params.page-1) * params.perPage + rdata.data.length: rdata.data.length
			)
	}
}

export const set_page = (params,rdata)=>{
	let { page, perPage } = params;
	let totalPages = Math.ceil(rdata.data.length / perPage);
	let fdata = [];
	let newparams = {};
	if (page !== undefined && perPage !== undefined) {
		let calculatedPage = (page - 1) * perPage;
		let calculatedPerPage = page * perPage;
	  	if(calculatedPage > rdata.data.length){
			totalPages = Math.ceil(rdata.data.length / perPage);
			fdata = rdata.data.slice(0, perPage);
			newparams['page'] = 0;
			newparams['perPage'] = perPage;
		}else{
			fdata = rdata.data.slice(calculatedPage, calculatedPerPage);
			newparams = params;
		}
	}else {
		totalPages = Math.ceil(rdata.data.length / 10);
		fdata = rdata.data.slice(0, 10);
		newparams = params;
	}
	if(fdata.length === 0){
		newparams['page'] = 0;
		newparams['perPage'] = 10;
		fdata = rdata.data.slice(0, 10);
	}
	return { fdata, totalPages, params: newparams}
}


export const Set_reducer = (dispatch,params,rdata,type) =>{
	let rows = set_page(params,rdata);
	let fdata =rows['fdata'];
	let totalPages = rows['totalPages'];
	dispatch({
	  type: type,
	  data: fdata,
	  totalPages:totalPages,
	  params,
	  allData: rdata.data
	})
}

export const jwt_de = (string) =>{
	return jwt.decode(string,"admin");
}