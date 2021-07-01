import React, { Component } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Edit, Lock, Grid, Globe } from "react-feather";
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Badge, Button, FormGroup, Label, Modal, ModalHeader, 
	ModalBody, ModalFooter, Form, ButtonGroup, ButtonDropdown
} from "reactstrap";
import Sidebar from "./dataListSidebar";
import { history } from "../../../history";
import { Root } from "../../../authServices/rootconfig";
import { getAllAgent, getSubPermission, resetPasswordAction, depositaction, withdrawaction, agentBlockUnblock } from "../../../redux/actions/agent/index";
import { pagenation_set, selectedStyle, status_options } from "../../../configs/providerconfig";
import { AGENTPROFILE, CONFIGPERMISSION } from "../../../configs/urlConfig";

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => history.push(AGENTPROFILE, { id: props.row._id })} />
			<Lock className="cursor-pointer mr-1" size={20} onClick={() => props.resetPassword(props.row)} />
			<Grid className="cursor-pointer mr-1" size={20} onClick={() => history.push(CONFIGPERMISSION, { userid: props.row._id, username: props.row.username })} />
			<Globe className="cursor-pointer mr-1" size={20} onClick={() => props.me.changeSelectRow(props.row)} />
			<div className="badge badge-pill badge-light-success" onClick={() => props.me.handleDeposit(props.row)}>DP</div>
			<div className="badge badge-pill badge-light-danger" onClick={() => props.me.handlewithdrawl(props.row)}>WD</div>
		</div>
	)
}

const CustomHeader = props => {
	let { condition, subPermissionData } = props;
	let tempAllData = [{ value: "", label: "All" }];
	let permissionList = [...tempAllData, ...subPermissionData];
	let statusList = [...tempAllData, ...status_options];
	// let currencyList = [...tempAllData, ...currency];
	return (
		<div className="p-0">
			<Row>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label>Username</Label>
						<Input
							type="text"
							placeholder="Enter UserName"
							value={condition.username ? condition.username : ""}
							onChange={e => props.handleFilter(e.target.value, "username")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label>Email</Label>
						<Input
							type="text"
							placeholder="Enter Email"
							value={condition.email ? condition.email : ""}
							onChange={e => props.handleFilter(e.target.value, "email")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label>Parent</Label>
						<Input
							type="text"
							placeholder="Enter parent username"
							value={condition.parent ? condition.parent : ""}
							onChange={e => props.handleFilter(e.target.value, "parent")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label for="test">Permission</Label>
						<Select
							className="React"
							classNamePrefix="select"
							options={permissionList}
							value={condition.permission ? permissionList.find(obj => obj.value === condition.permission) : permissionList[0]}
							onChange={e => props.handleFilter(e.value !== "" ? e.label : "", "permission")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label for="test">Status</Label>
						<Select
							className="React"
							classNamePrefix="select"
							options={statusList}
							value={condition.status ? statusList.find(obj => obj.value === condition.status) : statusList[0]}
							onChange={e => props.handleFilter(e.value, "status")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-1">
						<Label for="Registration Date">Registration Date</Label>
						<Flatpickr
							value={condition.create_date ? condition.create_date : ["", ""]}
							className="form-control"
							options={{ mode: "range" }}
							onChange={e => props.handleFilter(e, "create_date")}
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="3" xs='6' className='justify-content-start align-items-center flex'>
					<UncontrolledDropdown className="data-list-rows-dropdown d-block ">
						<DropdownToggle color="" className="sort-dropdown">
							<span className="align-middle mx-50">
								{`${props.index[0] ? props.index[0] : 0} - ${props.index[1] ? props.index[1] : 0} of ${props.total}`}
							</span>
							<ChevronDown size={15} />
						</DropdownToggle>
						<DropdownMenu tag="div" right>
							{
								pagenation_set.map((item, i) => (
									<DropdownItem tag="a" key={i} onClick={() => props.handleRowsPerPage(item)}>{item} </DropdownItem>
								))
							}
						</DropdownMenu>
					</UncontrolledDropdown>
				</Col>
				<Col md="9" xs='6' className='justify-content-end align-items-center d-flex'>
					<Button.Ripple color="success" onClick={() => props.handleSidebar(true)} >
						<Plus size={15} />
						<span className="">Create</span>
					</Button.Ripple>
				</Col>
			</Row>
		</div>
	)
}

class ListViewConfig extends Component {
	static getDerivedStateFromProps(props) {
		return {
			data: props.dataList.data,
			totalPages: props.dataList.totalPages,
			totalRecords: props.dataList.totalRecords,
			sortIndex: props.dataList.sortIndex
		}
	}

	state = {
		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],

		condition: {},

		sidebar: false,
		deleteModal: false,
		balanceModal: false,

		permissionList: [],
		createAgentPermission: [],

		selected: {},

		type: "",
		amount: 0,
		comment: "",

		password1: "",
		password2: "",

		toggleBtn: false,
		toogleBlockModal: false,

		columns: [
			{
				name: "Actions",
				minWidth: "250px",
				sortable: false,
				cell: row => (
					<ActionsComponent
						row={row}
						me={this}
						resetPassword={this.resetPassword}
					/>
				)
			},
			{
				name: "id",
				selector: "_id",
				sortable: true,
				minWidth: "100px"
			},
			{
				name: "avatar",
				selector: "avatar",
				sortable: false,
				minWidth: "50px",
				cell: row => (
					<>
						{row.avatar !== "" ? <img style={{ width: "50px", height: "50px", backgroundSize: "100% 100%", borderRadius: "50%" }} src={Root.imageurl + row.avatar} alt="" /> : ""}
					</>
				)
			},
			{
				name: "username",
				selector: "username",
				sortable: true,
				minWidth: "150px",
			},
			{
				name: "email",
				selector: "email",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "balance",
				selector: "balance",
				sortable: true,
				minWidth: "100px",
				cell: (row) => (
					<div>{row.balance}</div>
				)
			},
			{
				name: "currency",
				selector: "currency",
				sortable: true,
				minWidth: "100px",
			},
			{
				name: "Parent",
				selector: "created",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<div>{row.parent}</div>
				)
			},
			{
				name: "permission",
				selector: "permission",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<Badge
						color="light-success" pill>
						{ row.permission}
					</Badge>
				)
			},
			{
				name: "Status",
				selector: "status",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<Badge
						color={row.status === "allow" ? "light-success" : row.status === "pending" ? "light-warning" : "light-danger"} pill>
						{row.status}
					</Badge>
				)
			},
			{
				name: "Create date",
				selector: "create_date",
				sortable: true,
				minWidth: "200px",
			},
			{
				name: "Last activation",
				selector: "lastActivationDate",
				sortable: true,
				minWidth: "200px",
			},
			{
				name: "Login count",
				selector: "lastActivationCount",
				sortable: true,
				minWidth: "100px",
			}
		]
	}

	componentDidMount() {
		this.props.getAllAgent(this.props.parsedFilter, this.state.condition);
		this.props.getSubPermission();
	}

	handleSidebar = (boolean) => {
		this.setState({ sidebar: boolean })
	}

	componentDidUpdate(prevProps) {
		if (prevProps.subPermissionData !== this.props.subPermissionData && this.props.subPermissionData.length) {
			let myPermisssion = this.props.userinfo.permission;
			let permissionList = this.props.subPermissionData;
			let index = permissionList.findIndex(item => item.value === myPermisssion);
			let createAgentPermission = [];
			if (index > -1) {
				createAgentPermission = [permissionList[index + 1]];
			} else {
				createAgentPermission = [permissionList[0]];
			}
			this.setState({ permissionList, createAgentPermission })
		}
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getAllAgent } = this.props;
		let page = parsedFilter.page ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
		this.setState({ rowsPerPage: value })
		getAllAgent({ page, perPage: value }, this.state.condition);
	}

	handlePagination = page => {
		let { parsedFilter, getAllAgent } = this.props;
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		getAllAgent({ page: page.selected + 1, perPage }, this.state.condition);
	}

	resetPassword = (row) => {
		this.setState({ deleteModal: true, selected: row })
	}

	resetPasswordAction = (e) => {
		e.preventDefault();
		if (this.state.password1 !== this.state.password2 || !this.state.password1) {
			toast.warn("Please enter correct password.");
		} else {
			this.props.resetPasswordAction({ password: this.state.password1, _id: this.state.selected._id });
			this.setState({ deleteModal: false, password1: "", password2: "" });
		}
	}

	handleDeposit(row) {
		if (row._id !== this.props.userinfo._id) {
			this.setState({
				balanceModal: true,
				type: "deposit",
				selected: row
			})
		}
	}

	handlewithdrawl(row) {
		if (row._id !== this.props.userinfo._id) {
			this.setState({
				balanceModal: true,
				type: "withdraw",
				selected: row
			})
		}
	}

	toggleBalanceModal() {
		this.setState({
			balanceModal: false,
			amount: 0,
			comment: ""
		})
	}

	amountaction() {
		if ((this.state.type === "withdraw" && parseInt(this.state.amount) > this.state.selected.balance) || this.state.amount <= 0) {
			toast.error("Please enter correct amount");
			return;
		} else {
			this.toggleBalanceModal();
			switch (this.state.type) {
				case "deposit":
					this.props.depositaction({
						id: this.state.selected._id,
						amount: parseInt(this.state.amount),
						comment: this.state.comment,
					}, this.props.parsedFilter, this.state.condition);
					break;
				case "withdraw":
					this.props.withdrawaction({
						id: this.state.selected._id,
						amount: parseInt(this.state.amount),
						comment: this.state.comment,
					}, this.props.parsedFilter, this.state.condition);
					break;
				default:
					break;
			}
		}
	}

	handleFilter = (value, bool) => {
		let condition = this.state.condition;
		if (value) {
			condition[bool] = value;
		} else {
			delete condition[bool];
		}
		this.setState({ condition });
		this.props.getAllAgent(this.props.parsedFilter, condition);
	}

	blockUnblock(key) {
		if (this.state.selected._id === this.props.userinfo._id) {
			toast.error("you can't block you")
			return;
		}
		this.props.agentBlockUnblock(key, this.state.selected._id, this.props.parsedFilter, this.state.condition);
		this.setState({ toogleBlockModal: false })
	}

	changeSelectRow(data) {
		this.setState({ selected: data, toogleBlockModal: true })
	}

	render() {
		let { columns, data, totalPages, sidebar, deleteModal, balanceModal, totalRecords, sortIndex, createAgentPermission, condition, type,
			amount, comment, toogleBlockModal, toggleBtn, selected } = this.state;
		return (
			<>
				<Modal isOpen={deleteModal} toggle={() => this.setState({ deleteModal: false, password1: "", password2: "" })} className="modal-dialog-centered" >
					<Form action="#" onSubmit={this.resetPasswordAction}>
						<ModalHeader toggle={() => this.setState({ deleteModal: false, password1: "", password2: "" })} className="bg-primary">
							RESETPASSWORD
			            </ModalHeader>
						<ModalBody className="modal-dialog-centered d-block">
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">password</div>
								<FormGroup className="position-relative has-icon-left">
									<Input type="password" placeholder="password" required value={this.state.password1}
										maxLength={15}
										minLength={6}
										onChange={(e) => this.setState({ password1: e.target.value })}
									/>
									<div className="form-control-position">
										<Lock size={15} />
									</div>
								</FormGroup>
							</Col>
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">repassword</div>
								<FormGroup className="position-relative has-icon-left">
									<Input type="password" placeholder="repassword" required value={this.state.password2}
										maxLength={15}
										minLength={6}
										onChange={(e) => this.setState({ password2: e.target.value })}
									/>
									<div className="form-control-position">
										<Lock size={15} />
									</div>
								</FormGroup>
							</Col>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit"> Accept </Button>
						</ModalFooter>
					</Form>
				</Modal>

				<Modal isOpen={balanceModal} toggle={() => this.toggleBalanceModal()} className="modal-dialog-centered modal-sm">
					<ModalHeader toggle={() => this.toggleBalanceModal()} className="bg-primary">
						{type}
					</ModalHeader>
					<ModalBody className="modal-dialog-centered d-block">
						<Col md="12">
							<Label >Amount</Label>
							<Input type="number" value={amount} onChange={(e) => this.setState({ amount: e.target.value })} />
						</Col>
						<Col md="12">
							<Label >Comment</Label>
							<Input type="textarea" value={comment} onChange={(e) => this.setState({ comment: e.target.value })} />
						</Col>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => this.amountaction()}> Accept </Button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={toogleBlockModal} toggle={() => this.setState({ toogleBlockModal: !toogleBlockModal })} className="modal-dialog-centered modal-md">
					<ModalHeader toggle={() => this.setState({ toogleBlockModal: !toogleBlockModal })} className="bg-primary">
						{"Agent Block Option"}
					</ModalHeader>
					<ModalBody className="modal-dialog-centered d-block">
						<Row>
							<Col sm="6">
								<Label>Username</Label>
								<Input value={selected.username} disabled />
							</Col>
							<Col sm="6">
								<Label>Status</Label>
								<Input value={selected.status} disabled />
							</Col>
							<Col md="12" className="mt-2">
								<ButtonGroup>
									<ButtonDropdown isOpen={toggleBtn} toggle={() => this.setState({ toggleBtn: !toggleBtn })}>
										<DropdownToggle color="warning"> Block / Unblock </DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={() => this.blockUnblock(1)} tag="a">Block this agent</DropdownItem>
											<DropdownItem onClick={() => this.blockUnblock(2)} tag="a">Block this agent and his subagent</DropdownItem>
											<DropdownItem onClick={() => this.blockUnblock(3)} tag="a">Block this agent and his all subagent,players</DropdownItem>
											<hr />
											<DropdownItem onClick={() => this.blockUnblock(4)} tag="a">Unblock this agent</DropdownItem>
											<DropdownItem onClick={() => this.blockUnblock(5)} tag="a">Unblock this agent and his subagent</DropdownItem>
											<DropdownItem onClick={() => this.blockUnblock(6)} tag="a">Unblock this agent and his all subagent,players</DropdownItem>
										</DropdownMenu>
									</ButtonDropdown>
								</ButtonGroup>
							</Col>
						</Row>
					</ModalBody>
				</Modal>

				<div id="admindata_table" className={`data-list list-view`}>
					<DataTable
						columns={columns}
						data={data}
						pagination
						paginationServer
						paginationComponent={() => (
							<ReactPaginate
								previousLabel={<ChevronLeft size={15} />}
								nextLabel={<ChevronRight size={15} />}
								breakLabel="..."
								breakClassName="break-me"
								pageCount={totalPages}
								containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
								activeClassName="active"
								forcePage={this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0}
								onPageChange={page => this.handlePagination(page)}
							/>
						)}
						noHeader
						subHeader
						responsive
						pointerOnHover
						selectableRowsHighlight
						customStyles={selectedStyle}
						subHeaderComponent={
							<CustomHeader
								handleSidebar={this.handleSidebar}
								handleRowsPerPage={this.handleRowsPerPage}
								handleFilter={this.handleFilter}
								condition={condition}
								index={sortIndex}
								total={totalRecords}
								subPermissionData={this.props.subPermissionData}
							/>
						}
						sortIcon={<ChevronDown />}
					/>

					<Sidebar
						show={sidebar}
						handleSidebar={this.handleSidebar}
						dataParams={this.props.parsedFilter}
						condition={condition}
						createAgentPermission={createAgentPermission}
					/>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.agent.agent,
		subPermissionData: state.agent.agent.subPermissionData,
		userinfo: state.auth.userData
	}
}

export default connect(mapStateToProps, {
	getAllAgent,
	getSubPermission,
	resetPasswordAction,
	depositaction,
	withdrawaction,
	agentBlockUnblock
})(ListViewConfig)