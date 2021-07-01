import React, { Component } from "react";
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Badge, Form, Modal, ModalHeader, ModalBody, ModalFooter, 
	FormGroup, Label, ButtonGroup, ButtonDropdown
} from "reactstrap";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Lock, User, Globe } from "react-feather";
import { getData, resetpass, depositaction, withdrawaction, playerBlock } from "../../../redux/actions/players/index";
import { selectedStyle, pagenation_set, countryList, status_options, currency } from "../../../configs/providerconfig"
import { PLAYERPROFILE } from "../../../configs/urlConfig";
import { Root } from "../../../authServices/rootconfig"
import Sidebar from "./dataListSidebar";
import { history } from "../../../history";

const ActionsComponent = props => {
	return (
		<div className="data-list-action d-flex">
			<User className="cursor-pointer mr-1" size={20} onClick={() => history.push(PLAYERPROFILE, { id: props.row._id })} />
			<Lock className="cursor-pointer mr-1" size={20} onClick={() => props.me.resetpassword(props.row)} />
			<Globe className="cursor-pointer mr-1" size={20} onClick={() => props.me.changeSelectRow(props.row)} />
			<div className="badge badge-pill badge-light-success" onClick={() => props.me.handleDeposit(props.row)}>DP</div>
			<div className="badge badge-pill badge-light-danger" onClick={() => props.me.handlewithdrawl(props.row)}>WD</div>
		</div>
	)
}

const CustomHeader = props => {
	let condition = props.condition;
	let tempAllData = [{ value: "", label: "All" }];
	let statusList = [...tempAllData, ...status_options];
	let currencyList = [...tempAllData, ...currency];
	let RealcountryList = [...tempAllData, ...countryList]

	return (
		<div>
			<Row>
				<Col md='3' sm='6' xs='12'>
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
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>First Name</Label>
						<Input
							type="text"
							placeholder="Enter First Name"
							value={condition.firstname ? condition.firstname : ""}
							onChange={e => props.handleFilter(e.target.value, "firstname")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Last Name</Label>
						<Input
							type="text"
							placeholder="Enter Last Name"
							value={condition.lastname ? condition.lastname : ""}
							onChange={e => props.handleFilter(e.target.value, "lastname")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Email</Label>
						<Input
							type="text"
							placeholder="Enter Address"
							value={condition.email ? condition.email : ""}
							onChange={e => props.handleFilter(e.target.value, "email")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Parent Agent</Label>
						<Input
							type="text"
							placeholder="Enter Address"
							value={condition.parent ? condition.parent : ""}
							onChange={e => props.handleFilter(e.target.value, "parent")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Phone</Label>
						<Input
							type="text"
							placeholder="Enter Phone"
							value={condition.phone ? condition.phone : ""}
							onChange={e => props.handleFilter(e.target.value, "phone")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
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
					<FormGroup className="mb-0">
						<Label>Currency</Label>
						<Select
							className="React"
							classNamePrefix="select"
							options={currencyList}
							value={condition.currency ? currencyList.find(obj => obj.value === condition.currency) : currencyList[0]}
							onChange={e => props.handleFilter(e.value, "currency")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Country</Label>
						<Select
							className="React"
							classNamePrefix="select"
							options={RealcountryList}
							value={condition.country ? RealcountryList.find(obj => obj.value === condition.country) : RealcountryList[0]}
							onChange={e => props.handleFilter(e.value, "country")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-1">
						<Label>Registration Date</Label>
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
				<Col md="4" xs='6' className='justify-content-start align-items-center flex'>
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
				<Col className="d-flex justify-content-end">
					<Button.Ripple
						color="success"
						type="submit"
						onClick={() => props.handleSidebar(true)}
						className="mr-1">
						<Plus size={15} />
						<span className="align-middle">Create</span>
					</Button.Ripple>
				</Col>
			</Row>
		</div>
	)
}

class ListViewConfig extends Component {
	static getDerivedStateFromProps(props, state) {
		return {
			data: props.dataList.data,
			totalPages: props.dataList.totalPages,
			totalRecords: props.dataList.totalRecords,
			sortIndex: props.dataList.sortIndex
		}
	}

	state = {
		condition: {
		},

		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],
		sidebar: false,
		passmodal: false,
		modal: false,

		password1: "",
		password2: "",

		selectedRows: {},
		toogleBlockModal: false,
		toggleBtn: false,

		amount: 0,
		comment: "",
		type: "",

		columns: [
			{
				name: "Action",
				minWidth: "200px",
				sortable: true,
				cell: row => (
					<ActionsComponent
						me={this}
						row={row}
					/>
				)
			},
			{
				name: "avatar",
				selector: "avatar",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<>
						{row.avatar !== "" ? <img style={{ width: "50px", height: "50px", backgroundSize: "100% 100%" }} src={Root.imageurl + row.avatar} alt="" /> : ""}
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
				name: "Balance",
				selector: "balance",
				sortable: true,
				minWidth: "100px"
			},
			{
				name: "Bonus",
				selector: "bonus",
				sortable: true,
				minWidth: "100px"
			},
			{
				name: "Agent",
				selector: "parent",
				sortable: true,
				minWidth: "150px"
			},
			{
				name: "firstname",
				selector: "firstname",
				sortable: true,
				minWidth: "50px",
			},
			{
				name: "lastname",
				selector: "lastname",
				sortable: true,
				minWidth: "50px",
			},
			{
				name: "email",
				selector: "email",
				sortable: true,
				minWidth: "200px",
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
				name: "KYC Status",
				selector: "kyc_status",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<Badge
						color={row.kyc_status === "allow" ? "light-success" : row.kyc_status === "pending" ? "light-warning" : "light-danger"} pill>
						{row.kyc_status ? row.kyc_status : "block"}
					</Badge>
				)
			},
			{
				name: "Create Date",
				selector: "create_date",
				sortable: true,
				minWidth: "200px",
			},
			// {
			// 	name: "Total Deposits",
			// 	selector: "totalDeposit",
			// 	sortable: true,
			// 	minWidth: "100px",
			// },
			// {
			// 	name: "Total Withdrawals",
			// 	selector: "totalWithdrawal",
			// 	sortable: true,
			// 	minWidth: "100px",
			// },
			// {
			// 	name: "Last Active",
			// 	selector: "lastActivationDate",
			// 	sortable: true,
			// 	minWidth: "200px",
			// },
			// {
			// 	name: "Login Counts",
			// 	selector: "lastActivationCount",
			// 	sortable: true,
			// 	minWidth: "100px",
			// },
			{
				name: "currency",
				selector: "currency",
				sortable: true,
				minWidth: "20px",
				cell: row => (
					<>
						{row.currency}
					</>
				)
			},
			{
				name: "Country",
				selector: "country",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<>{countryList.find(obj => obj.value === row.country) ? countryList.find(obj => obj.value === row.country)['label'] : ""}</>
				)
			},
			{
				name: "Phone",
				selector: "phone",
				sortable: true,
				minWidth: "100px",
			},
		],
	}

	componentDidMount() {
		this.props.getData(this.props.parsedFilter, this.state.condition);
	}

	handlePagination = page => {
		let { parsedFilter, getData } = this.props
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
		let urlPrefix = `${history.location.pathname}`
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		getData({ page: page.selected + 1, perPage: perPage }, this.state.condition);
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getData } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
		getData({ page: page, perPage: value }, this.state.condition);
	}

	handleSidebar = (boolean) => {
		this.setState({ sidebar: boolean })
	}

	resetpassword = (selectedRows) => {
		this.setState({ passmodal: true, selectedRows })
	}

	resetpassword_action = (e) => {
		e.preventDefault();
		if (this.state.password1 === this.state.password2) {
			let row = {
				_id: this.state.selectedRows._id,
				password: this.state.password1,
			};
			this.setState({ passmodal: false, password1: "", password2: "" })
			this.props.resetpass(row);
		} else {
			toast.warn("Please enter correct password.");
		}
	}

	handleDeposit(selectedRows) {
		this.setState({ modal: true, type: "deposit", selectedRows })
	}

	handlewithdrawl(selectedRows) {
		this.setState({ modal: true, type: "withdraw", selectedRows })
	}

	amountaction() {
		if ((this.state.type === "withdraw" && parseInt(this.state.amount) > this.state.selectedRows.balance) || this.state.amount <= 0) {
			toast.error("Please enter correct amount");
			return;
		} else {
			this.setState({ modal: false, amount: 0, comment: "", })
			switch (this.state.type) {
				case "deposit":
					this.props.depositaction({
						id: this.state.selectedRows._id,
						amount: parseInt(this.state.amount),
						comment: this.state.comment,
					}, this.props.parsedFilter, this.state.condition);
					break;
				case "withdraw":
					this.props.withdrawaction({
						id: this.state.selectedRows._id,
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
		this.props.getData(this.props.parsedFilter, condition);
	}

	changeSelectRow = (row) => {
		this.setState({ selectedRows: row, toogleBlockModal: true });
	}

	blockUnblock(key) {
		this.props.playerBlock(key, this.state.selectedRows._id, this.props.parsedFilter, this.state.condition);
	}

	render() {
		let { columns, data, totalPages, sidebar, passmodal, modal, totalRecords, sortIndex, condition, toogleBlockModal, selectedRows,
			toggleBtn } = this.state
		return (
			<>
				<Modal isOpen={passmodal} toggle={() => this.setState({ passmodal: false })} className="modal-dialog-centered" >
					<Form className="" action="#" onSubmit={this.resetpassword_action}>
						<ModalHeader toggle={() => this.setState({ passmodal: false })} className="bg-primary">
							RESETPASSWORD
						</ModalHeader>
						<ModalBody className="modal-dialog-centered d-block">
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">password</div>
								<FormGroup className="position-relative has-icon-left">
									<Input
										type="password"
										placeholder="password"
										value={this.state.password1}
										maxLength={15}
										minLength={6}
										onChange={(e) => this.setState({ password1: e.target.value })}
										required
									/>
									<div className="form-control-position">
										<Lock size={15} />
									</div>
								</FormGroup>
							</Col>
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">repassword</div>
								<FormGroup className="position-relative has-icon-left">
									<Input
										type="password"
										placeholder="repassword"
										value={this.state.password2}
										maxLength={15}
										minLength={6}
										onChange={(e) => this.setState({ password2: e.target.value })}
										required
									/>
									<div className="form-control-position">
										<Lock size={15} />
									</div>
								</FormGroup>
							</Col>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit">
								Accept
							</Button>
						</ModalFooter>
					</Form>
				</Modal>

				<Modal isOpen={modal} toggle={() => this.setState({ modal: false })} className="modal-dialog-centered modal-sm">
					<ModalHeader toggle={() => this.setState({ modal: false })} className="bg-primary">
						{this.state.type}
					</ModalHeader>
					<ModalBody className="modal-dialog-centered d-block">
						<Col md="12">
							<Label >Amount</Label>
							<Input type="number" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
						</Col>
						<Col md="12">
							<Label >Comment</Label>
							<Input type="textarea" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />
						</Col>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => this.amountaction()}>
							Accept
						</Button>
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
								<Input value={selectedRows.username} disabled />
							</Col>
							<Col sm="6">
								<Label>Status</Label>
								<Input value={selectedRows.status} disabled />
							</Col>
							<Col md="12" className="mt-2">
								<ButtonGroup>
									<ButtonDropdown isOpen={toggleBtn} toggle={() => this.setState({ toggleBtn: !toggleBtn })}>
										<DropdownToggle color="warning">
											Block / Unblock
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={() => this.blockUnblock(1)} tag="a">Block this player</DropdownItem>
											<hr />
											<DropdownItem onClick={() => this.blockUnblock(2)} tag="a">Unblock this player</DropdownItem>
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
								responsive
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
								index={sortIndex}
								total={totalRecords}
								handleRowsPerPage={this.handleRowsPerPage}
								handleSidebar={this.handleSidebar}
								condition={condition}
								handleFilter={this.handleFilter}
							/>
						}
						sortIcon={<ChevronDown />}
					/>
					<Sidebar
						show={sidebar}
						handleSidebar={this.handleSidebar}
						dataParams={this.props.parsedFilter}
						condition={this.props.condition}
					/>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.Players.playerslist,
		cuser: state.auth,
	}
}

export default connect(mapStateToProps, {
	getData,
	resetpass,
	depositaction,
	withdrawaction,
	playerBlock
})(ListViewConfig)