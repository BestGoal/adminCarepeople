import React, { Component } from "react"
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import { addNewAgent } from "../../../redux/actions/agent/index"
import { status_options, gender, countryList, PlayerPermission, currency } from "../../../configs/providerconfig"
import { toast } from "react-toastify";
import { Airplay } from "react-feather";

class DataListSidebar extends Component {

  state = {
    userData: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      country: countryList[0].value,
      currency: currency[0].value,
      gender: gender[0].value,
      status: status_options[0].value,
      permission: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      postcode: "",
      state: "",
      cell_phone: "",
      phone: "",
      fax: "",
      website: "",
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.createAgentPermission !== this.props.createAgentPermission) {
      if (this.state.userData.permission !== this.props.createAgentPermission[0].value) {
        this.updateUserData('permission', this.props.createAgentPermission[0].value);
      }
    }
  }

  handleregister = e => {
    e.preventDefault();
    let row = this.state.userData;
    if (!row.permission || row.permission !== PlayerPermission) {
      let userData = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
        state: "",
        cell_phone: "",
        phone: "",
        fax: "",
        website: "",
        currency: currency[0].value,
        status: status_options[0].value,
        country: countryList[0].value,
        gender: gender[0].value,
        permission: this.props.createAgentPermission[0].value,
      }
      this.props.addNewAgent(row, this.props.dataParams, this.props.condition);
      this.props.handleSidebar(false);
      this.setState({ userData });
    } else {
      toast.warn("You can't create your sub agent.")
    }
  }

  updateUserData(key, value) {
    let userData = this.state.userData;
    userData[key] = value;
    this.setState({ userData });
  }

  handleSidebar() {
    let userData = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      postcode: "",
      state: "",
      cell_phone: "",
      phone: "",
      fax: "",
      website: "",
      currency: currency[0].value,
      status: status_options[1].value,
      country: countryList[0].value,
      gender: gender[0].value,
      permission: this.props.createAgentPermission[0].value,
    }
    this.setState({ userData });
    this.props.handleSidebar(false);
  }

  render() {
    let { userData } = this.state;
    let { show, createAgentPermission } = this.props;
    return (
      <Modal isOpen={show} toggle={() => this.handleSidebar(false)} className="modal-dialog-centered modal-lg">
        <Form className="" action="#" onSubmit={this.handleregister}>
          <ModalHeader toggle={() => this.handleSidebar(false)} className="bg-primary">
            ADD NEW AGENT
          </ModalHeader>
          <ModalBody className="mt-1">
            <Row>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>User Name *</Label>
                  <Input
                    type="text"
                    placeholder="User Name"
                    onChange={e => this.updateUserData("username", e.target.value)}
                    value={userData.username}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Password *</Label>
                  <Input
                    type="text"
                    placeholder="Password"
                    value={userData.password}
                    onChange={e => this.updateUserData('password', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>First Name*</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={userData.firstname}
                    onChange={e => this.updateUserData('firstname', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Last Name*</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={userData.lastname}
                    onChange={e => this.updateUserData('lastname', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={e => this.updateUserData('email', e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Country</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={countryList}
                    value={countryList.find(obj => obj.value === userData.country)}
                    defaultValue={countryList[0]}
                    onChange={e => this.updateUserData('country', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Currency</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={currency}
                    value={currency.find(obj => obj.value === userData.currency)}
                    defaultValue={currency[0]}
                    onChange={e => this.updateUserData('currency', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>gender</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={gender}
                    value={gender.find(obj => obj.value === userData.gender)}
                    defaultValue={gender[0]}
                    onChange={e => this.updateUserData('gender', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Status</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={status_options}
                    value={status_options.find(obj => obj.value === userData.status)}
                    defaultValue={status_options[0]}
                    onChange={e => this.updateUserData('status', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Permission</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={createAgentPermission}
                    value={createAgentPermission.find(obj => obj.value === userData.permission)}
                    defaultValue={createAgentPermission[0]}
                    onChange={e => this.updateUserData('permission', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Company</Label>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    onChange={e => this.updateUserData('company', e.target.value)}
                    value={userData.company}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Address (line 1)</Label>
                  <Input
                    type="text"
                    placeholder="Address (line 1)"
                    onChange={e => this.updateUserData('address_1', e.target.value)}
                    value={userData.address_1}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Address (line 2)</Label>
                  <Input
                    type="text"
                    placeholder="Address (line 2)"
                    onChange={e => this.updateUserData('address_2', e.target.value)}
                    value={userData.address_2}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>City</Label>
                  <Input
                    type="text"
                    placeholder="City"
                    onChange={e => this.updateUserData('city', e.target.value)}
                    value={userData.city}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Postal Code</Label>
                  <Input
                    type="number"
                    placeholder="PostCode"
                    onChange={e => this.updateUserData('postcode', e.target.value)}
                    value={userData.postcode}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>State</Label>
                  <Input
                    type="text"
                    placeholder="State"
                    onChange={e => this.updateUserData('state', e.target.value)}
                    value={userData.state}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Cell Phone</Label>
                  <Input
                    type="number"
                    placeholder="Cell Phone"
                    onChange={e => this.updateUserData('cell_phone', e.target.value)}
                    value={userData.cell_phone}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Phone</Label>
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    onChange={e => this.updateUserData('phone', e.target.value)}
                    value={userData.phone}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Fax</Label>
                  <Input
                    type="number"
                    placeholder="Fax Number"
                    onChange={e => this.updateUserData('fax', e.target.value)}
                    value={userData.fax}
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup className="mb-0">
                  <Label>Website</Label>
                  <Input
                    type="text"
                    placeholder="Website Url"
                    onChange={e => this.updateUserData('website', e.target.value)}
                    value={userData.website}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col xs="12 justify-content-center">
                <Button.Ripple type="submit" color="success">
                  <Airplay size={15} />
                  <span>Submit</span>
                </Button.Ripple>
                <Button className="ml-1" color="danger" outline onClick={() => this.handleSidebar(false)}> Cancel </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

export default connect(null, { addNewAgent })(DataListSidebar);