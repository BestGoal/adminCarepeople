import { 
    REPORT_PLAYER_LIST, 
    REPORT_PLAYER_TOTAL_DATA,
    REPORT_PLAYER_BET_HISTORY,
    REPORT_PLAYER_TRANSACTION, 
    REPORT_PLAYER_TRANSACTION_ALLDATA,
    REPORT_PLAYER_LOGIN, 
    REPORT_PLAYER_BET_ALLDATA,
    REPORT_PLAYER_BET
} from "../../types/index"

let initdata = { 
    playerList: [],
    playerTotalGame: {
        betAmount: 0,
		winAmount: 0
    },
    rake: 0,
    ogMoney: 0,
    playerTotalTransaction: {
		allDepositMoney: 0,
		allWithdrawMoney: 0
    },
    playerTotalBetReport: {
		allDepositMoney: 0,
		allWithdrawMoney: 0
    },
    betData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    },
    transactionData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    },
    betReportData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    },
    loginData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    }
}

export default (state =initdata, action) => {
    switch (action.type) {
        case REPORT_PLAYER_LIST:
            return { ...state, playerList: action.data }
        case REPORT_PLAYER_TOTAL_DATA:
            return { ...state, playerTotalGame: action.data, rake: action.rake, ogMoney: action.ogMoney }
        case REPORT_PLAYER_BET_HISTORY:
            return {
                ...state,
                betData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }

        case REPORT_PLAYER_TRANSACTION:
            return { ...state, 
                transactionData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }
        case REPORT_PLAYER_TRANSACTION_ALLDATA:
            return { ...state, playerTotalTransaction: action.data }

        case REPORT_PLAYER_BET:
            return { ...state, 
                betReportData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }
        case REPORT_PLAYER_BET_ALLDATA:
            return { ...state, playerTotalBetReport: action.data }

        case REPORT_PLAYER_LOGIN:
            return { ...state, 
                loginData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }
        default:
            return state
    }
}