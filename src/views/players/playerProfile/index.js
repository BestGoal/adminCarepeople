import React from "react"
import {TabContent,Nav,NavItem,NavLink,Badge,Col,Table,TabPane} from "reactstrap"
import classnames from "classnames"
import { connect } from "react-redux";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { history } from "../../../history";
import { getPlayerProfileInfo } from "../../../redux/actions/players/index"
import Profile from "./profile"
import Document from "./document"

class TabsBasic extends React.Component {
  state = {
    activeTab: "1",
    active: "1",
    allData: {
      pid: "",
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      status: "",
      balance: {
        balance: "",
        bonusbalance: ""
      },
    }
  }

  componentDidMount(){
    if(this.props.location.state && this.props.location.state.id){
      this.props.getPlayerProfileInfo({id: this.props.location.state.id});
    }else{
      history.goBack();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      this.setState({ allData: this.props.profile.data });
    }
  }

  toggle = tab => {
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }

  render() {
    let row = this.state.allData;
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Players" breadCrumbParent="Players" breadCrumbParent2={"this.state.allData.username"} />
        <Col md="12" className="">
          <Table responsive bordered >
            <thead >
              <tr>
                <th>UserID </th>
                <th>First Name </th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Status</th>
                <th>balance</th>
                <th>bonusbalance</th>
              </tr>
            </thead>
            <tbody>
                <tr >
                  <td>{row._id}</td>
                  <td>{row.firstname}</td>
                  <td>{row.lastname}</td>
                  <td>{row.email}</td>
                  <td>{row.username}</td>
                  <td><Badge
                    color={ row.status === "allow" ? "light-success": row.status === "pending" ? "light-warning": "light-danger"} pill>
                    {row.status}
                  </Badge>
                  </td>
                  <td>{ row.balance.balance ? parseFloat(row.balance.balance).toFixed(0): "0" }</td>
                  <td>{ row.balance.bonusbalance ? parseFloat(row.balance.bonusbalance).toFixed(0): "0" }</td>
                </tr>

            </tbody>
          </Table> 
        </Col>
        <Nav tabs className="nav-justified">
          <NavItem>
            <NavLink className={classnames({active: this.state.active === "1"})} onClick={() => {this.toggle("1")}}>
              Player Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({active: this.state.active === "2"})} onClick={() => {this.toggle("2")}}>
              Player Management
            </NavLink>
          </NavItem>
        </Nav>
        <div className="playerinfor-style">
          <TabContent activeTab={this.state.active} className="h-100">
            <TabPane tabId="2" className="h-100">
              <Profile />
            </TabPane>
            <TabPane tabId="1">
              <Document />
            </TabPane>
          </TabContent>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => {
  return {
    profile: state.Players.profile,
  }
}

export default connect(mapStateToProps, {
  getPlayerProfileInfo
})(TabsBasic)