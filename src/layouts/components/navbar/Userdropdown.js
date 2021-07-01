import React from "react"
import { DropdownItem, DropdownMenu } from "reactstrap"
import * as Icon from "react-feather"
import { history } from "../../../history"
import { connect } from "react-redux"
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions"
import { AGENTPROFILE } from "../../../configs/urlConfig";

class UserDropdown extends React.Component {

	gotoProfile = () => {
		history.push(AGENTPROFILE, { id: this.props.user.userData._id });
	}

	render() {
		return (
			<DropdownMenu right>
				<DropdownItem tag="a" onClick={() => this.gotoProfile()} >
					<Icon.Mail size={14} className="mr-50" />
					<span className="align-middle">My Profile</span>
				</DropdownItem>
				<DropdownItem tag="a" href="#" onClick={() => history.push("/chagepassword")} >
					<Icon.Mail size={14} className="mr-50" />
					<span className="align-middle">Change Password</span>
				</DropdownItem>
				<DropdownItem tag="a" href="#" onClick={() => this.props.logoutWithJWT()} >
					<Icon.Power size={14} className="mr-50" />
					<span className="align-middle">Log Out</span>
				</DropdownItem>
			</DropdownMenu>
		);
	}
}

const get_auth = state => {
	return {
		user: state.auth
	}
}

export default connect(get_auth, {
	logoutWithJWT,
})(UserDropdown)