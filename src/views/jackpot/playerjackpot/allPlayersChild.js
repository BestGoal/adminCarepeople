import React, { Component } from "react";
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Badge, Form, Modal, ModalHeader,
	ModalBody, ModalFooter, FormGroup, Label
} from "reactstrap";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../history";
import { ChevronDown, ChevronLeft, ChevronRight, Archive } from "react-feather";
import { connect } from "react-redux";
import { playerJackpotUpdate, getPlayerData } from "../../../redux/actions/jackpot/index";
import { selectedStyle, pagenation_set } from "../../../configs/providerconfig"
import { Root } from "../../../authServices/rootconfig"
import Toggle from "react-toggle"

const ActionsComponent = props => {
	return (
		<div className="data-list-action d-flex">
			<Archive className="cursor-pointer mr-1" size={20} onClick={() => props.me.setJakcpotModal(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let state = props.state.filters
	return (
		<>
			<Row>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Username</Label>
						<Input
							type="text"
							placeholder="Enter UserName"
							value={state.username ? state.username : ""}
							onChange={e => props.handleFilter(e.target.value, "username")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup>
						<Label>Email</Label>
						<Input
							type="text"
							placeholder="Enter Address"
							value={state.email ? state.email : ""}
							onChange={e => props.handleFilter(e.target.value, "email")}
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
			</Row>
		</>
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
		currentData: {},
		jackpotEnabled: true,
		jackpotModal: false,

		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],

		filters: {},

		columns: [
			{
				name: "Action",
				minWidth: "50px",
				sortable: true,
				cell: row => (
					<ActionsComponent
						me={this}
						row={row}
					/>
				)
			},
			{
				name: "id",
				selector: "_id",
				sortable: false,
				minWidth: "50px"
			},
			{
				name: "avatar",
				selector: "avatar",
				sortable: true,
				minWidth: "50px",
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
				name: "Agent",
				selector: "parent",
				sortable: true,
				minWidth: "150px"
			},
			{
				name: "jackpot Status",
				selector: "jackpotEnabled",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<Badge
						color={row.jackpotEnabled ? "light-success" : "light-danger"} pill>
						{row.jackpotEnabled ? "enabled" : "disabled"}
					</Badge>
				)
			},
		]
	}

	componentDidMount() {
		this.props.getPlayerData(this.props.parsedFilter, {})
	}

	setJakcpotModal(row) {
		this.setState({ jackpotModal: true, currentData: row, jackpotEnabled: row.jackpotEnabled });
	}

	sendJackpotChange(e) {
		e.preventDefault();
		let sendData = {
			_id: this.state.currentData._id,
			jackpotEnabled: this.state.jackpotEnabled
		}
		this.props.playerJackpotUpdate(sendData, this.props.parsedFilter, this.state.filters)
		this.setState({ jackpotModal: false });
	}

	handleFilter = (value, bool) => {
		let filters = this.state.filters;
		filters[bool] = value;
		this.setState({ filters: filters });
		this.props.getPlayerData(this.props.parsedFilter, filters)
	}

	handlePagination = page => {
		let { parsedFilter } = this.props
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
		let urlPrefix = `${history.location.pathname}`
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		this.props.getPlayerData({ page: page.selected + 1, perPage }, this.state.filters)
	}

	handleRowsPerPage = value => {
		let { parsedFilter } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
		this.props.getPlayerData({ page, perPage: value }, this.state.filters);
	}

	render() {
		let { jackpotModal, jackpotEnabled, columns, data, totalPages, totalRecords, sortIndex } = this.state;
		return (
			<>
				<Modal isOpen={jackpotModal} toggle={() => this.setState({ jackpotModal: false })} className="modal-dialog-centered" >
					<Form action="#" onSubmit={(e) => this.sendJackpotChange(e)}>
						<ModalHeader toggle={() => this.setState({ jackpotModal: false })} className="bg-primary">
							Jackpot Update
						</ModalHeader>
						<ModalBody className="modal-dialog-centered d-block">
							<Col md="6" sm="12" className="mt-0">
								<Label> Jackpot Enabled </Label>
								<label className="react-toggle-wrapper">
									<Toggle
										checked={jackpotEnabled}
										onChange={() => this.setState({ jackpotEnabled: !jackpotEnabled })}
										name="controlledSwitch"
										value="yes"
									/>
									<Button.Ripple
										color="primary"
										type="button"
										onClick={() => this.setState({ jackpotEnabled: !jackpotEnabled })}
										size="sm"
									>
										{jackpotEnabled ? "Enable" : "Disable"}
									</Button.Ripple>
								</label>
							</Col>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit"> Accept </Button>
						</ModalFooter>
					</Form>
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
						onSelectedRowsChange={data => this.setState({ selectedRows: data.selectedRows })}
						customStyles={selectedStyle}
						subHeaderComponent={
							<CustomHeader
								state={this.state}
								total={totalRecords}
								index={sortIndex}
								handleFilter={this.handleFilter}
								handleRowsPerPage={this.handleRowsPerPage}
							/>
						}
						sortIcon={<ChevronDown />}
					/>
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.jackpot.playerData,
	}
}

export default connect(mapStateToProps, {
	getPlayerData,
	playerJackpotUpdate
})(ListViewConfig)