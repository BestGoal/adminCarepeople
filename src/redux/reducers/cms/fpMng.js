import { ALLSLIDERITEMS } from "../../types/index"

const initStateData = {
    allSliderImage: []
}

export const fpMng = (state = initStateData, action) => {
    switch (action.type) {
      case ALLSLIDERITEMS: {
        return { ...state, allSliderImage: action.data }
      }
    //   case "CMSFPMNGDATA2": {        
    //     return { ...state, firstpagesliderimg2: action.data }
    //   }
    //   case "CMSFPMNGDATA3": {
    //     return { ...state, firstpagesliderimg3: action.data }
    //   }
    //   case "CMSLIVECASINOMNGDATA": {
    //     return { ...state, livecasinosliderimg: action.data }
    //   }
    //   case "CMSCASINOMNGDATA": {
    //     return { ...state, casinosliderimg: action.data }
    //   }
    //   case "CMSVIRTUALMNGDATA":{
    //     return { ...state, virtualsliderimg: action.data }
    //   }
    //   case "CMSPORKERMNGDATA":{
    //     return { ...state, porkersliderimg: action.data }
    //   }
    //   case "CMSCOCKFIGHTMNGDATA":{
    //     return { ...state, cockfightslierimg: action.data }
    //   }
    //   case "CMSANIMALMNGDATA":{
    //     return { ...state, animalslierimg: action.data }
    //   }
      
    //   case "ALLDATA_SLIDERIMAGES":{
    //     return { ...state,
    //       casinosliderimg: action.data["1"],
    //       virtualsliderimg: action.data["2"],
    //       porkersliderimg: action.data["3"],
    //       livecasinosliderimg: action.data["4"],
    //       firstpagesliderimg1: action.data["5"],
    //       firstpagesliderimg2: action.data["6"],
    //       firstpagesliderimg3: action.data["7"],   
    //       cockfightslierimg: action.data["8"],
    //       animalslierimg: action.data["9"],
    //     }
    //   }
      // case "CMSTEXTLOADDATA": {
        
      //   return { ...state, firstpagestext: action.data
      //   }
      // }

      // case "CMSFPHEADERTEXT": {
      //   return { ...state, firstpageheader: action.data }
      // }    
      default: {
        return state
      }
    }
  }
  