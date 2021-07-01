import { DASHBOARD_UPDATE } from "../../types/index";

let initdata = {
	dashboardData: {
        TotalDepositOfAgent: 0,
        TotalWithdrawalOfAgent: 0,
        TotalBetAmount: 0,
        TotalWinAmount: 0,
        TotalPlayerBalance: 0,
        TotalAgentbalance: 0,
        TotalPlayerMakingDeposit: 0,
        TotalPlayerMakingWithdrawal: 0,
    },
}

export default (state = initdata, action) => {
	switch (action.type) {
		case DASHBOARD_UPDATE: {
            let dashboardData = state.dashboardData;
            let newData = Object.assign({}, dashboardData, action.data);
			return {...state, dashboardData: newData }
		}
		default: {
			return state
		}
	}
}