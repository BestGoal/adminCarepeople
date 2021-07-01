import React, { Component } from "react"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Badge, Button, FormGroup, Label, Modal, ModalHeader,
	ModalBody, ModalFooter, Form
} from "reactstrap"
import { ChevronDown, ChevronLeft, ChevronRight, Archive, Bold } from "react-feather"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import Toggle from "react-toggle"
import { history } from "../../../history"
import { Root } from "../../../authServices/rootconfig"
import { getAllAgent, updateJackpotInfo } from "../../../redux/actions/jackpot/index"
import { pagenation_set, selectedStyle } from "../../../configs/providerconfig"

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Archive className="cursor-pointer" size={20} onClick={() => props.me.setJackpotInfo(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let state = props.state.condition
	return (
		<>
			<Row>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label>Username</Label>
						<Input type="text" placeholder="Enter UserName" value={state.username ? state.username : ""} onChange={e => props.handleFilter(e.target.value, "username")} />
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='12'>
					<FormGroup>
						<Label for="basicInput">Email</Label>
						<Input type="text" placeholder="Enter Email" value={state.email ? state.email : ""} onChange={e => props.handleFilter(e.target.value, "email")} />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md="3" xs='12' className='justify-content-start align-items-center flex'>
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
		jackpotData: {
			jackpotbank: "",
			jackpotgroup: "",
			jackpotEnabled: true
		},
		jackpotModal: false,

		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],

		condition: {},

		columns: [
			{
				name: "Actions",
				minWidth: "50px",
				sortable: true,
				cell: row => (
					<ActionsComponent
						row={row}
						me={this}
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
				name: "Parent",
				selector: "parent",
				sortable: true,
				minWidth: "150px"
			},
			{
				name: "bankname",
				selector: "jackpotbank",
				sortable: true,
				minWidth: "150px",
			},
			{
				name: "jackpot group id",
				selector: "jackpotgroup",
				sortable: true,
				minWidth: "150px",
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
		this.props.getAllAgent(this.props.parsedFilter, {})
	}

	setJackpotInfo(row) {
		let jackpotData = {
			_id: row._id,
			jackpotbank: row.jackpotbank ? row.jackpotbank : "",
			jackpotgroup: row.jackpotgroup ? row.jackpotgroup : "",
			jackpotEnabled: row.jackpotEnabled
		}
		this.setState({ currentData: row, jackpotData, jackpotModal: true })
	}

	toggleJackpotModal = () => {
		this.setState(prevState => ({ jackpotModal: !prevState.jackpotModal }))
	}

	async changeJackpotData(key, value) {
		let jackpotData = this.state.jackpotData;
		jackpotData[key] = value;
		await this.setState({ jackpotData })
	}

	jackpotSubmit = async (e) => {
		e.preventDefault()
		let { _id, jackpotbank, jackpotgroup, jackpotEnabled } = this.state.jackpotData
		let flag1 = await this.validator(jackpotbank, "jackpotbank")
		let flag2 = await this.validator(jackpotgroup, "jackpotgroup")
		if (flag1 && flag2) {
			let sendData = {
				_id,
				jackpotbank,
				jackpotgroup,
				jackpotEnabled
			}
			this.props.updateJackpotInfo(sendData, this.props.parsedFilter, this.state.condition)
			this.setState({ jackpotModal: false })
		}
	}

	validator(string, key) {
		let reg = /[a-z]/g;
		if (string.indexOf(" ") > -1) {
			toast.warn(`${key} can't include space.`)
			return false;
		} else if (string.length < 4) {
			toast.warn(`${key} have to long than 5 charactor.`)
			return false;
		} else if (string.match(reg) && string.match(reg).length === string.length) {
			return true;
		} else {
			toast.warn(`${key} can't include special charactor.`)
			return false;
		}
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getAllAgent } = this.props;
		let page = parsedFilter.page ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
		this.setState({ rowsPerPage: value })
		getAllAgent({ page, perPage: value }, this.state.condition)
	}

	handlePagination = page => {
		let { parsedFilter, getAllAgent } = this.props;
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		getAllAgent({ page: page.selected + 1, perPage }, this.state.condition)
	}

	handleFilter = (value, bool) => {
		let condition = this.state.condition;
		if (value) {
			condition[bool] = value;
		} else {
			delete condition[bool];
		}
		this.setState({ condition })
		this.props.getAllAgent(this.props.parsedFilter, condition)
	}

	render() {
		let { jackpotModal, currentData, jackpotData, columns, data, totalPages, totalRecords, sortIndex } = this.state;
		return (
			<>
				<Modal isOpen={jackpotModal} toggle={this.toggleJackpotModal} className="modal-dialog-centered" >
					<Form className="" action="#" onSubmit={this.jackpotSubmit}>
						<ModalHeader toggle={this.toggleJackpotModal} className="bg-primary">
							Jackpot Information
						</ModalHeader>
						<ModalBody className="modal-dialog-centered d-block">
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">bankname</div>
								<FormGroup className="position-relative has-icon-left">
									<Input
										required
										type="text"
										placeholder="bank Name"
										value={jackpotData.jackpotbank}
										maxLength={14}
										minLength={4}
										onChange={(e) => this.changeJackpotData("jackpotbank", e.target.value)}
										disabled={currentData.jackpotbank && currentData.jackpotbank.length ? true : false}
									/>
									<div className="form-control-position">
										<Bold size={15} />
									</div>
								</FormGroup>
							</Col>
							<Col lg="12" md="12">
								<div className="font-medium-2 text-bold-600 mb-1">jackpot groupid</div>
								<FormGroup className="position-relative has-icon-left">
									<Input
										required
										type="text"
										placeholder="Jackpot Group Id"
										value={jackpotData.jackpotgroup}
										maxLength={14}
										minLength={4}
										onChange={(e) => this.changeJackpotData("jackpotgroup", e.target.value)}
										disabled={currentData.jackpotgroup && currentData.jackpotgroup.length ? true : false}
									/>
									<div className="form-control-position">
										<Bold size={15} />
									</div>
								</FormGroup>
							</Col>
							<Col md="6" sm="12" className="mt-0">
								<Label>STATUS</Label>
								<label className="react-toggle-wrapper">
									<Toggle
										checked={jackpotData.jackpotEnabled}
										onChange={() => this.changeJackpotData("jackpotEnabled", jackpotData.jackpotEnabled ? false : true)}
										name="controlledSwitch"
										value="yes"
									/>
									<Button.Ripple
										color="primary"
										type="button"
										onClick={() => this.changeJackpotData("jackpotEnabled", jackpotData.jackpotEnabled ? false : true)}
										size="sm"
									>
										{jackpotData.jackpotEnabled ? "Enable" : "Disable"}
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
								handleFilter={this.handleFilter}
								handleRowsPerPage={this.handleRowsPerPage}
								total={totalRecords}
								index={sortIndex}
								state={this.state}
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
		dataList: state.jackpot.agentData,
	}
}

export default connect(mapStateToProps, {
	getAllAgent,
	updateJackpotInfo
})(ListViewConfig)