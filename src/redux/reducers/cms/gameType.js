import { FILTERGAMETYPES } from "../../types/index"

const initialState = {
    gameTypes: {
        AllGameTypes: [],
        CountGameTypes: 0,
        totalPages: 0,
        start: 0,
        end: 0,
    }
}

export const gameTypes = (state = initialState, action) => {
    switch (action.type) {
        case FILTERGAMETYPES:
            return { ...state, gameTypes: {
            AllGameTypes: action.data.AllData,
            CountGameTypes: action.data.Count,
            totalPages: action.data.totalPages,
            start: action.data.start,
            end: action.data.end,
            } }
        default:
            return state
    }
}