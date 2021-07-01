import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { history } from "./history";
import { ContextLayout } from "./utility/Layout";
import { LOGIN_URL } from "./configs/urlConfig";
import { url_path } from "./redux/actions/auth/index";
import { initSocket } from "./redux/actions/auth/loginActions";

const Login = lazy(() => import("./views/auth/login"));
const Clients = lazy(() => import("./views/client/index"));
const Workers = lazy(() => import("./views/worker/index"));
const Changepassword = lazy(() => import("./views/auth/changePassword"));

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
								<Suspense fallback={<></>}>
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
	if (!isAuthorized && url_path() !== LOGIN_URL) {
		return <Redirect to={LOGIN_URL} />;
	}
	for (let i in data.children) {
		if (data.children[i].props.path === data.location.pathname) {
			return data.children.slice(0, data.children.length - 1)
		}
	}
	return data.children.slice(data.children.length - 1, data.children.length)
};

class AppRouter extends React.Component {

	componentDidMount() {
		if (this.props.isAuth) {
			this.props.initSocket();
		}
	}

	render() {
		const isLoading = this.props.isLoading;
		return (
			<Router history={history}>
				<Switch>
					<AppRoute path={LOGIN_URL} component={Login} fullLayout />
					<RequireAuth>
						<AppRoute exact path="/" component={Clients} />
						<AppRoute exact path="/all-clients" component={Clients} />
						<AppRoute exact path="/all-workers" component={Workers} />
						<AppRoute exact path="/chagepassword" component={Changepassword} />
						<AppRoute exact component={Clients} />
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
	initSocket
}

export default connect(mapStateToPropss, mapDispatchToProps)(AppRouter);