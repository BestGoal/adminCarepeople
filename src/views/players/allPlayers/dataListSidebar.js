import React, { Component } from "react"
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from "reactstrap"
import { connect } from "react-redux"
import { playerRegister } from "../../../redux/actions/players/index"
import { status_options, PlayerPermission } from "../../../configs/providerconfig"
import Select from "react-select"

class DataListSidebar extends Component {

  state = {
    userData: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      status: status_options[0].value,
      permission: PlayerPermission
    }
  }

  updateKeyValue = (key, value) => {
    let userData = this.state.userData;
    userData[key] = value;
    this.setState({ userData });
  }

  handleregister = e =>{
    e.preventDefault();
    let userData = this.state.userData;
    this.setState({
      userData: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        status: status_options[0].value,
        permission: PlayerPermission
      }
    })
    this.props.handleSidebar(false);
    this.props.playerRegister(userData, this.props.dataParams, this.props.condition);
  }

  render() {
    let { show } = this.props;
    let userData = this.state.userData;
    return (
      <Modal isOpen={show} toggle={() => this.props.handleSidebar(false)} className="modal-dialog-centered modal-md">
        <Form onSubmit={this.handleregister}>
          <ModalHeader toggle={() => this.props.handleSidebar(false)} className="bg-primary">
            {"ADD PLAYER"}
          </ModalHeader>
          <ModalBody className="mt-1">
            <Row>
              <Col sm="12">
                <FormGroup className="mb-0">
                  <Label>User Name *</Label>
                  <Input 
                    type="text" 
                    placeholder="User Name"
                    onChange={e=>this.updateKeyValue("username", e.target.value)}
                    value = {userData.username}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="mb-0">
                  <Label>Password *</Label>
                  <Input 
                    type="text"
                    placeholder="Password"
                    onChange={e=>this.updateKeyValue("password", e.target.value)}
                    value = {userData.password}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="mb-0">
                  <Label>First Name</Label>
                  <Input 
                    type="text"
                    placeholder="First Name"
                    value = {userData.firstname}
                    onChange={e=>this.updateKeyValue("firstname", e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="mb-0">
                  <Label>Last Name</Label>
                  <Input 
                    type="text" 
                    placeholder="Last Name"
                    value = {userData.lastname}
                    onChange={e=>this.updateKeyValue("lastname", e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
               <FormGroup className="mb-0">
                  <Label>Email *</Label>
                  <Input 
                    type="email" 
                    placeholder="Email"
                    onChange={e=>this.updateKeyValue("email", e.target.value)}
                    value = {userData.email}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup className="mb-0">
                  <Label>Status</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={status_options}
                    value={status_options.find(obj => obj.value === userData.status)}
                    defaultValue={status_options[0]}
                    onChange={e => this.updateKeyValue('status', e.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row>
                <Col xs="12 justify-content-start">
                    <Button color="primary" type="submit">{"Submit"}</Button>
                    <Button className="ml-1" color="danger" outline onClick={() => this.props.handleSidebar(false)}>{"Cancel"}</Button>
                </Col>
            </Row>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

export default connect(null,{ playerRegister })(DataListSidebar)