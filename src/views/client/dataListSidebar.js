import React, { Component } from "react"
import { Label, Input, FormGroup, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from "reactstrap"
import Select from "react-select"
import { connect } from "react-redux"
import { updateClients } from "../../redux/actions/user/index"
import { status_options } from "../../configs/providerconfig"
import { Airplay } from "react-feather";

class DataListSidebar extends Component {

	state = {
		userData: {}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentRow !== this.props.currentRow) {
			this.setState({ userData: this.props.currentRow })
		}
	}

	handleregister = e => {
		e.preventDefault();
		this.props.updateClients(this.state.userData, this.props.dataParams, this.props.condition);
		this.props.handleSidebar(false);
	}

	updateUserData(key, value) {
		let userData = this.state.userData;
		userData[key] = value;
		this.setState({ userData });
	}

	render() {
		let { userData } = this.state;
		let { show } = this.props;

		return (
			<Modal isOpen={show} toggle={() => this.props.handleSidebar(false)} className="modal-dialog-centered modal-lg">
				<Form action="#" onSubmit={this.handleregister}>
					<ModalHeader toggle={() => this.props.handleSidebar(false)} className="bg-primary">
						EDIT CLIENT DATA
					</ModalHeader>
					<ModalBody className="mt-1">
						<Row>
							<Col md="4" sm="12">
								<FormGroup className="mb-0">
									<Label>First Name*</Label>
									<Input
										type="text"
										placeholder="First Name"
										value={userData.firstName}
										onChange={e => this.updateUserData('firstName', e.target.value)}
										required
										disabled
									/>
								</FormGroup>
							</Col>
							<Col md="4" sm="12">
								<FormGroup className="mb-0">
									<Label>Last Name*</Label>
									<Input
										type="text"
										placeholder="Last Name"
										value={userData.lastName}
										onChange={e => this.updateUserData('lastName', e.target.value)}
										required
										disabled
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
										disabled
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
						</Row>
					</ModalBody>

					<ModalFooter>
						<Row>
							<Col xs="12 justify-content-center">
								<Button.Ripple type="submit" color="success">
									<Airplay size={15} />
									<span>Submit</span>
								</Button.Ripple>
								<Button className="ml-1" color="danger" outline onClick={() => this.props.handleSidebar(false)}> Cancel </Button>
							</Col>
						</Row>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default connect(null, { updateClients })(DataListSidebar);