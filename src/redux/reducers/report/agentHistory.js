import { 
    REPORT_AGENT_LIST, 
    REPORT_BIG_PROVIDER_LIST,
    REPORT_PROVIDER_LIST, 
    REPORT_GAME_LIST,
    REPORT_AGENT_GAME_DATA,
    REPORT_AGENT_GAME_TOTAL_DATA,
    REPORT_AGENT_TRANSACTION,
    REPORT_AGENT_TRANSACTION_TOTAL_DATA,
    REPORT_AGENT_LOGIN 
} from "../../types/index";

let initdata = { 
    agentList: [],
    bigProviderList: [ {label: "All", value: "" } ],
    providerList: [ {label: "All", value: "" } ],
    gameList: [ {label: "All", value: "" } ],
    rake: 0,
    ogMoney: 0,
    agentTotalGame: {
		betAmount: 0,
		winAmount: 0,
		allPlayerCount: 0
    },
    agentTotalTransaction: {
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
    loginData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    },
}

export default (state =initdata, action) => {
    switch (action.type) {
        case REPORT_AGENT_LIST:
            return { ...state, agentList: action.data }
        case REPORT_BIG_PROVIDER_LIST:
            return { ...state, bigProviderList: action.data }
        case REPORT_PROVIDER_LIST:
            return { ...state, providerList: action.data }
        case REPORT_GAME_LIST:
            return { ...state, gameList: action.data }
        case REPORT_AGENT_GAME_TOTAL_DATA:
            return { ...state, agentTotalGame: action.data, rake: action.rake, ogMoney: action.ogMoney }
        case REPORT_AGENT_GAME_DATA:
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
        case REPORT_AGENT_TRANSACTION:
            return { ...state, 
                transactionData: {
                    data: action.data,
                    totalPages: action.totalPages,
                    params: action.params,
                    totalRecords: action.totalRecords,
                    sortIndex : [action.params["skip1"], action.params["skip2"]],
                }
            }
        case REPORT_AGENT_TRANSACTION_TOTAL_DATA:
            return { ...state, agentTotalTransaction: action.data }
        case REPORT_AGENT_LOGIN:
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