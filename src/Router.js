import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { history } from "./history";
import { ContextLayout } from "./utility/Layout";
import { LOGIN_URL } from "./configs/urlConfig";
import Loading from "./views/ui-elements/loading/index";
import { url_path } from "./redux/actions/auth/index";
import { setSidebar, initSocket } from "./redux/actions/auth/loginActions";

const Login = lazy(() => import("./views/auth/login"));
const Changepassword = lazy(() => import("./views/auth/changePassword"));

const Revenue = lazy(() => import("./views/dashboard/revenue"));

const Agents = lazy(() => import("./views/agents/allAgents/index"));
const RoleManager = lazy(() => import("./views/agents/roleManager/index"));
const AgentProfile = lazy(() => import("./views/agents/agentProfile"));
const AgentsTree = lazy(() => import("./views/agents/agentTree/index"));
const AgentsProvider = lazy(() => import("./views/agents/agentsProvider/index"));

const AllPlayers = lazy(() => import("./views/players/allPlayers/index"));
const PlayersInfo = lazy(() => import("./views/players/playerProfile/index"));

const Permission = lazy(() => import("./views/config/permission/index"));
const System = lazy(() => import("./views/config/provider/index"));
const Games = lazy(() => import("./views/config/games/index"));
const Bonus = lazy(() => import("./views/config/bonus/index"));

const GameTypes = lazy(() => import("./views/cms/gameType/index"));
const SliderManage = lazy(() => import("./views/cms/sliderManage/index"));

const AgentJackpotManage = lazy(() => import("./views/jackpot/agentjackpot/index"));
const PlayerJackpotManage = lazy(() => import("./views/jackpot/playerjackpot/index"));
const AgentJackpotViewer = lazy(() => import("./views/jackpot/jackpotviewer/index"));

const AgentGameReport = lazy(() => import("./views/report/agent/agentGameReport/index"));
const AgentTransactionReport = lazy(() => import("./views/report/agent/agentTransactionReport/index"));
const AgentLoginReport = lazy(() => import("./views/report/agent/agentLoginReport/index"));
const PlayerGameReport = lazy(() => import("./views/report/player/playerGameReport/index"));
const PlayerTransactionReport = lazy(() => import("./views/report/player/playerTransactionReport/index"));
const PlayerBetReport = lazy(() => import("./views/report/player/PlayerBetReport/index"));
const PlayerLoginReport = lazy(() => import("./views/report/player/playerLoginReport/index"));

const CommingSoon = lazy(() => import("./views/commingSoon/index"));

const PermissionManage = lazy(() => import("./views/permission/index"));

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			return (
				<ContextLayout.Consumer>
					{context => {
						let LayoutTag =
							fullLayout === true ? context.fullLayout : context.state.activeLayout === "horizontal" ? context.horizontalLayout : context.VerticalLayout
						return (
							<LayoutTag {...props} permission={"admin"}>
								<Suspense fallback={<Loading />}>
									<Component {...props} />
								</Suspense>
							</LayoutTag>
						)
					}}
				</ContextLayout.Consumer>
			)
		}}
	/>
)

const AppRoute = connect(null)(RouteConfig)

const RequireAuth = (data) => {
	const isAuthorized = useSelector((state) => state.auth.isAuth);
	let sidebararray = data.sidebarData, 
		path = data.location.pathname, 
		item = data.children;
	sidebararray = [ ...sidebararray, ...[{ navLink: "/" }, { navLink: "/agent-profile" }, { navLink: "/chagepassword" }]];	
	if (!isAuthorized && url_path() !== LOGIN_URL) {
		return <Redirect to={LOGIN_URL} />;
	}
	if (item && sidebararray && sidebararray.length > 0) {
		for (let i in item) {
			let isExist = sidebararray.find(obj => obj.navLink === path);
			if (item[i].props.path === path && isExist) {
				return item.slice(0, item.length - 1);
			}
		}
		return item.slice(item.length - 1, item.length);
	} else {
		return []
	}
};

class AppRouter extends React.Component {

	componentDidMount() {
		if (this.props.isAuth) {
			this.props.setSidebar();
			this.props.initSocket();
		}
	}

	render() {
		const isLoading = this.props.isLoading;
		return (
			<Router history={history}>
				{
					isLoading && <Loading />
				}
				<Switch>
					<AppRoute path={LOGIN_URL} component={Login} fullLayout />
					<RequireAuth sidebarData = {this.props.sidebar}>
						<AppRoute exact path="/" component={Revenue} />
						<AppRoute exact path="/Dashboard" component={Revenue} />
						<AppRoute exact path="/chagepassword" component={Changepassword} />

						<AppRoute exact path="/agent/all-agent" component={Agents} />
						<AppRoute exact path="/agent/role-manager" component={RoleManager} />
						<AppRoute exact path="/agent/all-agent-treeview" component={AgentsTree} />
						<AppRoute exact path="/agent-profile" component={AgentProfile} />
						<AppRoute exact path="/agent/provider-manage" component={AgentsProvider} />

						<AppRoute exact path="/players/all-players" component={AllPlayers} />
						<AppRoute exact path="/player-profile" component={PlayersInfo} />

						<AppRoute exact path="/config-permission" component={Permission} />
						<AppRoute exact path="/config/system" component={System} />
						<AppRoute exact path="/config/games" component={Games} />
						<AppRoute exact path="/config/bonus" component={Bonus} />

						<AppRoute exact path="/cms/gameTypes" component={GameTypes} />
						<AppRoute exact path="/cms/slider" component={SliderManage} />

						<AppRoute exact path="/jackpot/agent" component={AgentJackpotManage} />
						<AppRoute exact path="/jackpot/player" component={PlayerJackpotManage} />
						<AppRoute exact path="/jackpot/view" component={AgentJackpotViewer} />

						<AppRoute exact path="/report/agent/agent-game" component={AgentGameReport} />
						<AppRoute exact path="/report/agent/transaction-report" component={AgentTransactionReport} />
						<AppRoute exact path="/report/agent/login-report" component={AgentLoginReport} />
						<AppRoute exact path="/report/player/player-game" component={PlayerGameReport} />
						<AppRoute exact path="/report/player/transaction-report" component={PlayerTransactionReport} />
						<AppRoute exact path="/report/player/bet-report" component={PlayerBetReport} />
						<AppRoute exact path="/report/player/login-report" component={PlayerLoginReport} />

						<AppRoute exact path="/permission/manage" component={PermissionManage} />
						<AppRoute exact component={CommingSoon} />
					</RequireAuth>
				</Switch>
				<ToastContainer />
			</Router>
		)
	}
}

const mapStateToPropss = (state) => {
	return {
		isLoading: state.auth.isLoading,
		isAuth: state.auth.isAuth,
		sidebar: state.auth.realSidebar
	}
}

const mapDispatchToProps = {
	setSidebar,
	initSocket
}

export default connect(mapStateToPropss, mapDispatchToProps)(AppRouter);