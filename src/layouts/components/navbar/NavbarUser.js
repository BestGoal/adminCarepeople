import React from "react"
import { UncontrolledDropdown, DropdownToggle } from "reactstrap"
import { connect } from "react-redux"
import { Users } from "react-feather"
import UserDropdown from './Userdropdown'
import { Root } from "../../../authServices/rootconfig";

class NavbarUser extends React.PureComponent {

	render() {
		// let playerData = this.props.player;
		let userData = this.props.user;

		return (
			<ul className="nav navbar-nav navbar-nav-user float-right">
				{/* <div className='d-flex flex-column justify-content-center align-items-center'>
					<div className="font-weight-bold d-block color-white">{`Balance ${playerData.balance} €`}</div>
					<div className="font-weight-bold color-white">{`BonusBalance ${playerData.bonusbalance} €`}</div>
				</div> */}

				<UncontrolledDropdown tag="li" className="dropdown-user nav-item">
					<DropdownToggle tag="a" className="nav-link dropdown-user-link">
						<div className="user-nav d-sm-flex d-none">
							<span className="user-name text-bold-600">
								{userData.email}
							</span>
						</div>
						<div className="icon-section">
							<div className="avatar avatar-stats p-50 m-0 bg-rgba-dark">
								<div className="avatar-content">
									{this.props.user.avatar ?
										<img src={Root.imageurl + this.props.user.avatar} style={{ width: "50px", height: "50px", backgroundSize: "100% 100%" }} alt="" />
										:
										<Users size={30} color={'white'} />
									}
								</div>
							</div>
						</div>
					</DropdownToggle>
					<UserDropdown />
				</UncontrolledDropdown>
			</ul>
		)
	}
}

const mapPropsToState = state => {
	return {
		user: state.auth.userData,
		player: state.auth.playerData
	}
}
export default connect(mapPropsToState, {})(NavbarUser)