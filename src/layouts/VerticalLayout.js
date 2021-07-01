import React, { PureComponent } from "react";
import classnames from "classnames";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar"
import {
	collapseSidebar,
} from "../redux/actions/customizer/index";

class VerticalLayout extends PureComponent {
	state = {
		width: window.innerWidth,
		sidebarState: this.props.customizer.sidebarCollapsed,
		layout: this.props.customizer.theme,
		collapsedContent: this.props.customizer.sidebarCollapsed,
		sidebarHidden: false,
		currentLang: "en",
		appOverlay: false,
		customizer: false,
		currRoute: this.props.location.pathname
	};
	collapsedPaths = [];
	mounted = false;
	updateWidth = () => {
		if (this.mounted) {
			this.setState(prevState => ({
				width: window.innerWidth
			}));
		}
	};

	handleCustomizer = bool => {
		this.setState({
			customizer: bool
		});
	};

	componentDidMount() {
		this.mounted = true;
		let {
			location: { pathname },
			customizer: { theme, direction }
		} = this.props;

		if (this.mounted) {
			if (window !== "undefined") {
				window.addEventListener("resize", this.updateWidth, false);
			}
			if (this.collapsedPaths.includes(pathname)) {
				this.props.collapseSidebar(true);
			}

			let layout = theme;
			let dir = direction;
			if (dir === "rtl")
				document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
			else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
			return layout === "dark"
				? document.body.classList.add("dark-layout")
				: layout === "semi-dark"
					? document.body.classList.add("semi-dark-layout")
					: null;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		let {
			location: { pathname },
			customizer: { theme, sidebarCollapsed }
		} = this.props;

		let layout = theme;
		if (this.mounted) {
			if (layout === "dark") {
				document.body.classList.remove("semi-dark-layout");
				document.body.classList.add("dark-layout");
			}
			if (layout === "semi-dark") {
				document.body.classList.remove("dark-layout");
				document.body.classList.add("semi-dark-layout");
			}
			if (layout !== "dark" && layout !== "semi-dark") {
				document.body.classList.remove("dark-layout", "semi-dark-layout");
			}

			if (
				prevProps.customizer.sidebarCollapsed !==
				this.props.customizer.sidebarCollapsed
			) {
				this.setState({
					collapsedContent: sidebarCollapsed,
					sidebarState: sidebarCollapsed
				});
			}
			if (
				prevProps.customizer.sidebarCollapsed ===
				this.props.customizer.sidebarCollapsed &&
				pathname !== prevProps.location.pathname &&
				this.collapsedPaths.includes(pathname)
			) {
				this.props.collapseSidebar(true);
			}
			if (
				prevProps.customizer.sidebarCollapsed ===
				this.props.customizer.sidebarCollapsed &&
				pathname !== prevProps.location.pathname &&
				!this.collapsedPaths.includes(pathname)
			) {
				this.props.collapseSidebar(false);
			}
		}
	}

	handleCollapsedMenuPaths = item => {
		let collapsedPaths = this.collapsedPaths;
		if (!collapsedPaths.includes(item)) {
			collapsedPaths.push(item);
			this.collapsedPaths = collapsedPaths;
		}
	};

	toggleSidebarMenu = val => {
		this.setState({
			sidebarState: !this.state.sidebarState,
			collapsedContent: !this.state.collapsedContent
		});
	};

	sidebarMenuHover = val => {
		this.setState({
			sidebarState: val
		});
	};

	handleSidebarVisibility = () => {
		if (this.mounted) {
			if (window !== undefined) {
				window.addEventListener("resize", () => {
					if (this.state.sidebarHidden) {
						this.setState({
							sidebarHidden: !this.state.sidebarHidden
						});
					}
				});
			}
			this.setState({
				sidebarHidden: !this.state.sidebarHidden
			});
		}
	};

	componentWillUnmount() {
		this.mounted = false;
	}

	handleCurrentLanguage = lang => {
		this.setState({
			currentLang: lang
		});
	};

	handleAppOverlay = value => {
		if (value.length > 0) {
			this.setState({
				appOverlay: true
			});
		} else if (value.length < 0 || value === "") {
			this.setState({
				appOverlay: false
			});
		}
	};

	handleAppOverlayClick = () => {
		this.setState({
			appOverlay: false
		});
	};

	render() {
		let activeitem = window.sessionStorage.getItem("activeitem");

		let appProps = this.props.customizer;
		let menuThemeArr = [
			"primary",
			"success",
			"danger",
			"info",
			"warning",
			"dark"
		];
		let sidebarProps = {
			toggleSidebarMenu: this.props.collapseSidebar,
			toggle: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarHover: this.sidebarMenuHover,
			sidebarVisibility: this.handleSidebarVisibility,
			visibilityState: this.state.sidebarHidden,
			// activePath: this.props.match.path,
			activePath: activeitem,
			collapsedMenuPaths: this.handleCollapsedMenuPaths,
			currentLang: this.state.currentLang,
			activeTheme: appProps.menuTheme,
			collapsed: this.state.collapsedContent,
			activeMode: appProps.theme,
			deviceWidth: this.state.width
		};
		let navbarProps = {
			toggleSidebarMenu: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarVisibility: this.handleSidebarVisibility,
			currentLang: this.state.currentLang,
			changeCurrentLang: this.handleCurrentLanguage,
			handleAppOverlay: this.handleAppOverlay,
			appOverlayState: this.state.appOverlay,
			navbarColor: appProps.navbarColor,
			navbarType: appProps.navbarType
		};

		let footerProps = {
			footerType: appProps.footerType,
			hideScrollToTop: appProps.hideScrollToTop
		};
		return (
			<div
				className={classnames(
					`wrapper vertical-layout theme-${appProps.menuTheme}`,
					{
						"menu-collapsed":
							this.state.collapsedContent === true && this.state.width >= 1200,
						"fixed-footer": appProps.footerType === "sticky",
						"navbar-static": appProps.navbarType === "static",
						"navbar-sticky": appProps.navbarType === "sticky",
						"navbar-floating": appProps.navbarType === "floating",
						"navbar-hidden": appProps.navbarType === "hidden",
						"theme-primary": !menuThemeArr.includes(appProps.menuTheme)
					}
				)}
			>
				<Sidebar {...sidebarProps} />
				<PerfectScrollbar>
					<div
						className={classnames("app-content content", {
							"show-overlay": this.state.appOverlay === true
						})}
						onClick={this.handleAppOverlayClick}
					>
						<Navbar {...navbarProps} />
						<div className="content-wrapper pt-0">{this.props.children}</div>
					</div>
				</PerfectScrollbar>
				<Footer {...footerProps} />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		customizer: state.customizer
	};
};
export default connect(mapStateToProps, {
	collapseSidebar,
})(VerticalLayout);
