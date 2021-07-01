import { combineReducers } from "redux";

import auth from "./auth/index";
import agent from "./agent/index";
import Players from "./players/index";
import config from "./config/index";
import report from "./report/index";
import customizer from "./customizer/index";
import permission from "./permission/index";
import cms from "./cms/index";
import dashboard from "./dashboard/index"
import jackpot from "./jackpot/index"

const rootReducer = combineReducers({
  auth,
  agent,
  Players,
  config,
  report,
  customizer,
  permission,
  cms,
  dashboard,
  jackpot
});

export default rootReducer;