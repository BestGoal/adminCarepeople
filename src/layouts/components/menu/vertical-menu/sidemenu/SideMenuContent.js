import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import SideMenuGroup from "./SideMenuGroup"
import { ChevronRight } from "react-feather"
import { history } from "../../../../../history"
import { connect } from "react-redux"
import * as Icon from "react-feather"

const mainSidebar = [
	{
		pid: "0",
		id: 1,
		title: "Users",
		type: "collapse",
		navLink: "/all-clients",
		icon: <Icon.User size={20} />,
		children: [
			{
				pid: 1,
				id: 11,
				title: "All Clients",
				type: "item",
				icon: <Icon.Circle size={12} />,
				navLink: "/all-clients",
				children: []
			},
			{
				pid: 1,
				id: 22,
				title: "All Workers",
				type: "item",
				icon: <Icon.Circle size={12} />,
				navLink: "/all-workers",
				children: []
			},
		]
	},
	{
		pid: "0",
		id: 2,
		title: "Shifts",
		type: "collapse",
		navLink: "/user/client",
		icon: <Icon.User size={20} />,
		children: [
			{
				pid: 2,
				id: 22,
				title: "Didacated Shifts",
				type: "item",
				icon: <Icon.Circle size={12} />,
				navLink: "/shift/didacated",
				children: []
			}
		]
	}
]

class SideMenuContent extends React.Component {

	constructor(props) {
		super(props)
		this.parentArr = []
		this.collapsedPath = null
		this.redirectUnauthorized = () => {
			history.push("/misc/not-authorized")
		}
	}

	state = {
		flag: true,
		isHovered: false,
		activeGroups: [],
		currentActiveGroup: [],
		tempArr: [],
		activeitem: this.props.activeItemState,
		refresh: false
	}

	get_groups_active = (id) => {
		let open_group = [];
		let s_item = this.get_item(id);
		open_group = this.get_groups(s_item);
		return open_group;
	}

	get_groups_parent = (parent) => {
		let groups = [];
		let sidebar = mainSidebar
		function fact(node) {
			groups.push(node.id);
			let n = get_item(node.id, sidebar);
			if (n.pid === "0") {
				return;
			} else {
				fact({ id: n.pid });
			}
		}
		fact({ id: parent });

		return groups;

		function get_item(id, sidebar) {
			let item = {};
			function fact(node) {
				if (node.id === id) {
					item = node;
					return;
				}
				if (node.children && node.children.length > 0) {
					for (let j in node.children) {
						if (id === node.children[j].id) {
							item = node.children[j];
							return;
						}
						fact(node.children[j]);
					}
				} else {
					return;
				}
			}

			for (let i in sidebar) {
				fact(sidebar[i]);
			}
			return item;
		}
	}

	get_groups = (childs) => {
		let groups = [];
		let node = {};
		function fact(item) {
			if (item.children.length > 0) {
				groups.push(item.id);
				fact(item.children[0]);
			} else {
				node = item;
				return;
			}
		}
		fact(childs);
		return { groups: groups, node: node };
	}

	get_item = (id) => {
		let sidebar = mainSidebar;
		let item = {};
		function fact(node) {
			if (node.id === id) {
				item = node;
				return;
			}
			if (node.children && node.children.length > 0) {
				for (let j in node.children) {
					if (id === node.children[j].id) {
						item = node.children[j];
						return;
					}
					fact(node.children[j]);
				}
			} else {
				return;
			}
		}

		for (let i in sidebar) {
			fact(sidebar[i]);
		}
		return item;
	}

	get_item_navLink = (id) => {
		let sidebar = mainSidebar;
		let item = null;
		function fact(node) {
			if (node.navLink === id) {
				item = node;
				return;
			}
			if (node.children && node.children.length > 0) {
				for (let j in node.children) {
					if (id === node.children[j].navLink) {
						item = node.children[j];
						return;
					}
					fact(node.children[j]);
				}
			} else {
				return;
			}
		}

		for (let i in sidebar) {
			fact(sidebar[i]);
		}
		return item;
	}

	handleGroupClick = async (id, parent = null, type = "") => {

		let open_group = this.state.activeGroups;
		let activeitem = "";

		if (type === "item" && parent === null) {
			open_group = [];

			window.sessionStorage.setItem("activeitem", id);
			window.sessionStorage.setItem("activegroup", JSON.stringify("[]"));
			this.setState({ activeitem: id });
			return;
		} else if (type === "item" && parent) {
			let p_groups = this.get_groups_parent(parent);
			open_group = p_groups;
			window.sessionStorage.setItem("activeitem", id);
			window.sessionStorage.setItem("activegroup", JSON.stringify(p_groups));
			this.setState({ activeGroups: p_groups, activeitem: id });
		} else if (type === "collapse" && parent === null) {
			if (open_group.indexOf(id) === -1) {
				open_group = [];
				let d_ = this.get_groups_active(id);
				open_group = d_["groups"];
				activeitem = d_["node"].id;
				window.sessionStorage.setItem("activeitem", activeitem);
				window.sessionStorage.setItem("activegroup", JSON.stringify(open_group));
				this.setState({ activeGroups: open_group, activeitem: activeitem });
				history.push(d_["node"].navLink)
			} else {
				window.sessionStorage.setItem("activeitem", null);
				window.sessionStorage.setItem("activegroup", JSON.stringify([]));
				this.setState({ activeGroups: [], activeitem: null });
				return;
			}
		} else if (type === "collapse" && parent) {
			if (open_group.indexOf(id) === -1) {
				open_group = [];
				let d_ = this.get_groups_active(id);
				let p_groups = this.get_groups_parent(parent);
				let groups = d_["groups"];
				activeitem = d_["node"].id;
				open_group = p_groups;
				open_group = [...open_group, ...groups];
				window.sessionStorage.setItem("activeitem", activeitem);
				window.sessionStorage.setItem("activegroup", JSON.stringify(open_group));
				this.setState({ activeGroups: open_group, activeitem: activeitem });
				history.push(d_["node"].navLink)
			} else {
				open_group = [];
				let p_groups = this.get_groups_parent(parent);
				open_group = p_groups;
				window.sessionStorage.setItem("activegroup", JSON.stringify(open_group));
				this.setState({ activeGroups: open_group });
			}
		}
	}

	initRender = () => {

		let activeitem1 = history.location.pathname;
		let link = activeitem1 === "/" ? "/dashboard/Revenue" : activeitem1;
		let item = this.get_item_navLink(link);

		if (item) {
			let parent = item.pid === "0" ? null : item.pid;
			this.handleGroupClick(item.id, parent, item.type)
		} else {
			let activeitem = window.sessionStorage.getItem("activeitem");
			let activegroup = window.sessionStorage.getItem("activegroup");
			activegroup = activegroup !== "null" && activegroup ? JSON.parse(activegroup) : [];
			this.setState({ activeGroups: activegroup, activeitem: activeitem })
		}
	}

	componentDidMount() {
		this.initRender()
	}

	render() {
		let navigationConfig = mainSidebar;
		const menuItems = navigationConfig && navigationConfig.map(item => {
			const CustomAnchorTag = Link;
			let renderItem = (
				<li
					className={classnames("nav-item", {
						"has-sub": item.type === "collapse",
						open: this.state.activeGroups.includes(item.id),
						// "sidebar-group-active": this.state.activeGroups.includes( item.id ),
						hover: this.props.hoverIndex === item.id,
						// active: (this.props.activeItemState === item.navLink && item.type === "item") || (item.parentOf && item.parentOf.includes(this.props.activeItemState)),
						active: this.state.activeitem === item.id && item.type === "item",
						// disabled: item.disabled
					})}
					key={item.id}
					onClick={e => {
						e.stopPropagation()
						if (item.type === "item") {
							// this.props.handleActiveItem(item.navLink);
							this.handleGroupClick(item.id, null, item.type);
							if (this.props.deviceWidth <= 1200 && item.type === "item") {
								this.props.toggleMenu()
							}
						} else {
							// history.push(item.navLink)
							this.handleGroupClick(item.id, null, item.type)
						}
					}}>

					<CustomAnchorTag
						to={item.navLink}
						className={`d-flex ${item.badgeText ? "justify-content-between" : "justify-content-start"}`}
						onMouseEnter={() => { this.props.handleSidebarMouseEnter(item.id) }}
						onMouseLeave={() => { this.props.handleSidebarMouseEnter(item.id) }}
						key={item.id}
						onClick={e => { return item.type === "collapse" ? e.preventDefault() : "" }}
						target={undefined}>
						<div className="menu-text">
							{item.icon} <span className="menu-item menu-title"> {item.title} </span> </div>
						{item.type === "collapse" ? (<ChevronRight className="menu-toggle-icon" size={13} />) : ("")}

					</CustomAnchorTag>
					{item.type === "collapse" ? (
						<SideMenuGroup
							group={item}
							handleGroupClick={this.handleGroupClick}
							activeGroup={this.state.activeGroups}
							handleActiveItem={this.props.handleActiveItem}
							activeItemState={this.state.activeitem}
							handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
							activePath={this.props.activePath}
							hoverIndex={this.props.hoverIndex}
							initRender={this.initRender}
							parentArr={this.parentArr}
							triggerActive={undefined}
							currentActiveGroup={this.state.currentActiveGroup}
							permission={this.props.permission}
							currentUser={this.props.currentUser}
							redirectUnauthorized={this.redirectUnauthorized}
							collapsedMenuPaths={this.props.collapsedMenuPaths}
							toggleMenu={this.props.toggleMenu}
							deviceWidth={this.props.deviceWidth}
						/>
					) : (
						""
					)}
				</li>
			)

			// if ( item.navLink && item.collapsed !== undefined && item.collapsed === true ) { 
			//   this.collapsedPath = item.navLink;
			//   this.props.collapsedMenuPaths(item.navLink)
			// }

			if (item.type === "collapse" || item.type === "item") {
				return renderItem
			} else {
				// return <div></div>
				return this.redirectUnauthorized()
			}
		})
		return <React.Fragment>{menuItems}</React.Fragment>
	}
}

const mapStateToProps = (state) => ({
	sidebar: state.auth.sidebar,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent)
