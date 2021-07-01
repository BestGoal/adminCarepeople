import React from 'react';
import { connect } from "react-redux";
import JqxTreeGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from "reactstrap";
import MultiSelect from "react-multi-select-component";
import Select from "react-select";
// import { Plus, CornerDownRight, X, Edit2 } from "react-feather";
import { toast } from "react-toastify";
import Toggle from "react-toggle";
import confirm from "reactstrap-confirm";
import { roleList, rowadd_action, rowinadd_action, rowupdate_action, row_delete_action } from "../../redux/actions/permission/index";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

const initalSource = {
	dataFields: [
		{ name: 'id', type: 'string' },
		{ name: 'pid', type: 'string' },
		{ name: 'icon', type: 'string' },
		{ name: 'title', type: 'string' },
		{ name: 'navLink', type: 'string' },
		{ name: 'status', type: 'Boolean' },
		{ name: 'type', type: 'string' },
		{ name: 'roles', type: 'array' },
		{ name: '_id', type: 'string' },
	],
	dataType: 'json',
	hierarchy:
	{
		keyDataField: { name: 'id' },
		parentDataField: { name: 'pid' }
	},
	id: 'id',
	localData: []
};

let typeOption = [
	{ label: "collapse", value: "collapse" },
	{ label: "item", value: "item" }
]

class SidebarPermission extends React.PureComponent {

	constructor(props) {
		super(props);
		this.myTreeGrid = React.createRef();
		const dataAdapter = new jqx.dataAdapter(initalSource);
		this.state = {
			width: window.innerWidth,
			columnGroups: [
			],
			columns: [
				{ dataField: 'title', text: 'title', width: window.innerWidth / 5 },
				{ dataField: 'icon', text: 'icon', width: window.innerWidth / 5 },
				{ dataField: 'navLink', text: 'navLink', width: window.innerWidth / 5 },
				{ dataField: 'type', text: 'type', width: window.innerWidth / 5 },
				{ dataField: 'status', text: 'status', width: window.innerWidth / 5 },
				{ dataField: 'roles', text: 'roles', hidden: true },
				{ dataField: '_id', text: '_id', hidden: true },
			],
			source: dataAdapter,

			modal: false,
			title: "",
			icon: "",
			navLink: "",
			update: false,
			type: false,
			bool: "",
			status: false,
			roles: [],
			selectitem: null,
		}
	}

	componentDidMount() {
		this.props.roleList();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.list !== this.props.list) {
			initalSource.localData = this.props.list;
			const dataAdapter = new jqx.dataAdapter(initalSource);
			this.setState({ source: dataAdapter });
		}
	}

	addItem() {
		this.setState({
			modal: true,
			title: "",
			icon: "",
			navLink: "",
			type: typeOption[0],
			status: false,
			roles: [],
			update: false,
			bool: "add"
		})
	}

	addAction = async () => {
		let id = new Date().valueOf(), pid = 0, newRoles = {}
		let { title, navLink, icon, status, roles, type, selectitem } = this.state
		if (selectitem && selectitem.parent) {
			pid = selectitem.parent.id;
		}
		for (let i = 0; i < roles.length; i++) {
			newRoles[roles[i].value] = true;
		}

		let row = { pid, id, title, navLink, icon, status, roles: newRoles, type: type.value }
		this.props.rowadd_action(row);
	}

	inAddItem() {
		if (!this.state.selectitem) {
			toast.warn("Please select item");
			return;
		}
		this.setState({
			modal: true,
			title: "",
			icon: "",
			navLink: "",
			type: typeOption[0],
			status: false,
			roles: [],
			update: false,
			bool: "inadd"
		})
	}

	inAddAction = async () => {
		let id = new Date().valueOf(), newRoles = {}
		let pid = this.state.selectitem.id;
		let { roles, title, navLink, icon, status, type } = this.state;
		for (let i = 0; i < roles.length; i++) {
			newRoles[roles[i].value] = true;
		}
		let row = { pid, id, title, navLink, icon, status, roles: newRoles, type: type.value }
		this.props.rowinadd_action(row);
	}

	editItem() {
		let selectitem = this.state.selectitem;
		if (!selectitem) {
			toast.warn("Please select item");
			return;
		}
		let rows = []
		let data = this.props.roleLists;
		for (let key in selectitem.roles) {
			if (selectitem.roles[key]) {
				let select = data.find(obj => obj.value === key);
				rows.push(select);
			}
		}
		this.setState({
			modal: true,
			title: selectitem.title,
			icon: selectitem.icon,
			navLink: selectitem.navLink,
			status: selectitem.status,
			type: typeOption.filter(item => item.value === selectitem.type)[0],
			update: true,
			bool: "edit",
			roles: rows
		})
	}

	editAction = async () => {
		let { title, navLink, icon, status, selectitem, roles, type } = this.state;
		let newRoles = {}
		for (let i = 0; i < roles.length; i++) {
			newRoles[roles[i].value] = true;
		}
		let row = {
			id: selectitem.id,
			title, navLink, icon, status,
			roles: newRoles,
			type: type.value
		}
		this.props.rowupdate_action(row);
	}

	deleteItem = async () => {
		if (!this.state.selectitem) {
			toast.warn("Please select item");
			return;
		}
		let result = await confirm();
		if (result) {
			await this.props.row_delete_action({ id: this.state.selectitem.id });
			this.setState({ selectitem: null })
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ modal: false, selectitem: false })
		switch (this.state.bool) {
			case "add":
				this.addAction();
				break;
			case "inadd":
				this.inAddAction();
				break;
			case "edit":
				this.editAction();
				break;
			default:
				toast.error("error action")
				break;
		}
	}

	render() {
		let { source, columns, modal, title, icon, navLink, type, status, update, roles } = this.state;
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="CMS" breadCrumbParent="Permission Manager" />
				<Row>
					{/* <Col sm="12" className="p-1">
						<Button.Ripple className="ml-1" color="success" onClick={() => this.addItem()} >
							<Plus size={14} />Add
						</Button.Ripple>
						<Button.Ripple className="ml-1" color="success" onClick={() => this.inAddItem()} >
							<CornerDownRight size={14} />InAdd
						</Button.Ripple>
						<Button.Ripple className="ml-1" color="success" onClick={() => this.editItem()} >
							<Edit2 size={14} />Edit
						</Button.Ripple>
						<Button.Ripple className="ml-1" color="success" onClick={() => this.deleteItem()} >
							<X size={14} />Delete
						</Button.Ripple>
					</Col> */}
					<Col sm="12">
						<JqxTreeGrid ref={this.myTreeGrid} source={source} columns={columns} onRowClick={(e) => this.setState({ selectitem: e.args.row })} />
					</Col>
				</Row>

				<Modal isOpen={modal} toggle={() => this.setState({ modal: false })} className="modal-dialog-centered modal-md">
					<Form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={() => this.setState({ modal: false })} className="bg-primary">Sidebar</ModalHeader>
						<ModalBody className="modal-dialog-centered mt-2">
							<Row>
								<Col md="12" className="mt-1">
									<FormGroup className="form-label-group">
										<Input type="text" value={title} onChange={e => this.setState({ title: e.target.value })} required />
										<Label>title</Label>
									</FormGroup>
								</Col>
								<Col md="12" className="mt-1">
									<FormGroup className="form-label-group">
										<Input type="text" value={icon} onChange={e => this.setState({ icon: e.target.value })} required />
										<Label>icon</Label>
									</FormGroup>
								</Col>
								<Col md="12" className="mt-1">
									<FormGroup className="form-label-group">
										<Input type="text" value={navLink} onChange={e => this.setState({ navLink: e.target.value })} required />
										<Label>navLink</Label>
									</FormGroup>
								</Col>
								<Col md="12" className="m-0">
									<Label>type</Label>
									<Select
										className="React"
										classNamePrefix="select"
										options={typeOption}
										value={typeOption.find(obj => obj.value === type.value)}
										onChange={e => this.setState({ type: e })}
									/>
								</Col>
								<Col md="12" className="mt-1">
									<Label>roles view</Label>
									<MultiSelect
										options={this.props.roleLists}
										className="multi-select"
										classNamePrefix="select"
										selectAllLabel="ALL Roles"
										hasSelectAll="All"
										shouldToggleOnHover={true}
										value={roles}
										focusSearchOnOpen={true}
										onChange={(e) => this.setState({ roles: e })}
										labelledBy={"Select Roles"}
									/>
								</Col>
								<Col md="12" className="mt-1">
									<Label>status</Label>
									<label className="react-toggle-wrapper">
										<Toggle checked={status} onChange={() => this.setState({ status: !status })} name="controlledSwitch" value="yes" />
										<Button.Ripple color="primary" onClick={() => this.setState({ status: !status })} size="sm" >
											{status ? "Enable" : "Diable"}
										</Button.Ripple>
									</label>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit" >
								{!update ? "Accept" : "Update"}
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</React.Fragment>
		);
	}
}


const mapStateToProps = (state) => ({
	roleLists: state.permission.data,
	list: state.permission.list
})

const mapDispatchToProps = {
	roleList, 
	rowadd_action, 
	rowinadd_action, 
	rowupdate_action, 
	row_delete_action
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPermission)