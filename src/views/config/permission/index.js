import React from "react"
import { Row, Col, Button,Table } from "reactstrap"
import { Check } from "react-feather"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { connect } from 'react-redux'
import { getPermission, submitPermission } from "../../../redux/actions/config/permission"
import { toast } from "react-toastify"

class AllAgent extends React.Component {

  static getDerivedStateFromProps(props) {
    return {
      permissionData: props.permission
    }
  }

  state = {
    userid: "",
    username: ""
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.userid){
      this.setState({userid: this.props.location.state.userid, username: this.props.location.state.username });
      this.props.getPermission({userid: this.props.location.state.userid});
    } else {
      this.props.getPermission();
    }
  }

  handleChange(f_key, s_key) {
    let permissionData = this.state.permissionData;
    permissionData[f_key][s_key] = !permissionData[f_key][s_key];
    this.setState({ permissionData })
  }

  submit() {
    if(this.state.userid) {
      let permission = this.state.permissionData;
      let sendData = {
        id: this.state.userid,
        permission: {
          agent: permission.agent,
          player: permission.player
        } 
      }
      this.props.submitPermission(sendData);
    } else {
      toast.warn("You can't change your permission");
    }
  }

  render() {
    let permissionData = this.state.permissionData;
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Config" breadCrumbParent="Permission" />
        <Row>
          <Col sm="12" className = "playerinfor-style">
            <h3 className = "m-2 text-center">
              {
                `${this.state.username && this.state.username ? this.state.username+"'s" : "My" } Permission`
              }
            </h3>
            <Row>
              <Col sm="12">
                <Table responsive bordered className="text-center">
                  <thead>
                    <tr>
                      <th>Type </th>
                      <th>Create/Update</th>
                      <th>Block/Unblock</th>
                      <th>Transaction Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Agent</td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.agent.crud}
                          onChange={() => this.handleChange('agent', 'crud')}
                        />
                      </td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.agent.blockUnblock}
                          onChange={() => this.handleChange('agent', 'blockUnblock')}
                        />
                      </td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.agent.transaction}
                          onChange={() => this.handleChange('agent', 'transaction')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Player</td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.player.crud}
                          onChange={() => this.handleChange('player', 'crud')}
                        />
                      </td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.player.blockUnblock}
                          onChange={() => this.handleChange('player', 'blockUnblock')}
                        />
                      </td>
                      <td>
                        <Checkbox icon={<Check className="vx-icon" size={16} />} className = "justify-content-center"
                          checked={permissionData.player.transaction}
                          onChange={() => this.handleChange('player', 'transaction')}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={12} className="p-2 d-flex justify-content-end">
                <Button.Ripple color="success" className="mr-1" onClick = {() => this.submit()}> Submit </Button.Ripple>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userdetail,
  permission: state.config.permission.data
})

const mapDispatchToProps = {
  getPermission,
  submitPermission
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAgent)
