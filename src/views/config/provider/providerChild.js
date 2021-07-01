import React, { Component } from "react"
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader,
	ModalBody, ModalFooter, FormGroup, Label, Form, Badge
} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Edit2, Trash, ArrowUp, ArrowDown } from "react-feather"
import { connect } from "react-redux"
import Toggle from "react-toggle"
import Select from "react-select"
import { selectedStyle, pagenation_set, SuperAgent } from "../../../configs/providerconfig"
import { toast } from "react-toastify"
import { getAllGameTypes, providerSave, providerGet, providerUpdate, providerDelete, pagenationchange, filterData } from "../../../redux/actions/config/system"

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowEdit(props.row)} />
			<Trash className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowDelete(props.row, props.parsedFilter)} />
			<ArrowUp className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowArrowup(props.row)} />
			<ArrowDown className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowArrowDown(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let { allGameTypes, filterData, userData } = props;

	return (
		<Row>
			<Col md={4} xs={12}>
				<FormGroup className="mb-1">
					<Label for="gametypes">Game Types</Label>
					<Select
						className="React"
						classNamePrefix="select"
						value={allGameTypes.find(obj => obj.value === filterData.gameType)}
						options={allGameTypes}
						onChange={e => console.log({ filterType: e, value: "me.state.value" })}
					/>
				</FormGroup>
			</Col>
			<Col md={4} xs={12} className="d-flex align-items-center">
				<div className="filter-section">
					<Input type="text" className="border-white" onChange={e => props.handleFilter(e)} />
				</div>
			</Col>
			<Col className="d-flex justify-content-end mt-1" md={4} xs={6}>
				{
					userData.permission === SuperAgent &&
					<Button.Ripple color="success" onClick={() => props.handleSidebar(true)} >
						<span>Add Provider</span>
					</Button.Ripple>
				}
			</Col>
			<Col className="d-flex justify-content-between mt-1" sm={6} xs={6}>
				<UncontrolledDropdown className="data-list-rows-dropdown">
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
	)
}

class Child extends Component {
	static getDerivedStateFromProps(props, state) {
		if (props.dataList.data.length !== state.data.length || state.currentPage !== props.parsedFilter.page) {
			return {
				data: props.dataList.data,
				allData: props.dataList.filteredData,
				totalPages: props.dataList.totalPages,
				currentPage: parseInt(props.parsedFilter.page) - 1,
				rowsPerPage: parseInt(props.parsedFilter.perPage),
				totalRecords: props.dataList.totalRecords,
				sortIndex: props.dataList.sortIndex
			}
		}
		return null;
	}

	state = {
		allGameTypes: [{ label: "ALL", value: "" }],
		filterData: {
			gameType: ""
		},
		providerData: {
			id: "",
			providerName: "",
			Agregator: "",
			Percentage: "",
			gameType: "",
			Route: false,
			status: false
		},
		modal: false,
		update: false,
		data: [],
		totalPages: 0,
		rowsPerPage: 10,
		totalRecords: 0,
		sortIndex: [],
		columns: [
			{
				name: "Id",
				selector: "order",
				sortable: false,
				minWidth: "50px",
				cell: (row) => (
					<>{row.order + 1}</>
				)
			}, {
				name: "providerName ",
				selector: "providerName",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "Agregator",
				selector: "Agregator",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "Percentage",
				selector: "Percentage",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "gameType",
				selector: "gameType",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<>{row.gameType.name}</>
				)
			}, {
				name: "Route",
				selector: "Route",
				sortable: false,
				minWidth: "150px",
				cell: row => (
					<> {row.Route ? "Direct" : "Aggregators"} </>
				)
			}, {
				name: "Status",
				selector: "status",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.status ? "light-success" : "light-danger"} pill> {row.status ? "Enable" : "Disable"}</Badge>
				)
			}, {
				name: this.props.userData.permission === SuperAgent ? "Actions" : "",
				minWidth: this.props.userData.permission === SuperAgent ? "200px" : "0",
				sortable: false,
				cell: row => (
					<>
						{
							this.props.userData.permission === SuperAgent ?
								<ActionsComponent row={row} me={this} /> : ""
						}
					</>
				)
			},
		],
	}

	componentDidMount() {
		this.props.getAllGameTypes();
		this.props.providerGet(this.props.parsedFilter)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.allGameTypes !== this.props.allGameTypes) {
			let newAllGameTypes = [];
			let allGameTypes = this.props.allGameTypes;
			let temp = [{ label: "ALL", value: "" }]
			newAllGameTypes = [...temp, ...allGameTypes]
			this.setState({ allGameTypes: newAllGameTypes })
		}
	}

	toggleModal = () => {
		let providerData = {
			providerName: "",
			Agregator: "",
			Percentage: "",
			gameType: "",
			Route: false,
			status: false
		}
		this.setState(prevState => ({
			modal: !prevState.modal,
			update: false,
			providerData
		}))
	}

	updateProviderData(key, value) {
		let providerData = this.state.providerData;
		providerData[key] = value;
		this.setState({ providerData });
	}

	validator() {
		let data = this.state.providerData;
		if (!data.providerName || data.providerName === "") {
			toast.error("please input provider name");
			return false;
		} else if (!data.Agregator || data.Agregator === "") {
			toast.error("please input Agregator");
			return false;
		} else if (!data.Percentage || data.Percentage === "") {
			toast.error("please input Percentage");
			return false;
		} else if (!data.gameType || data.gameType === "") {
			toast.error("please input gameType");
			return false;
		}
		return true;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState(prevState => ({
			modal: false,
			update: false
		}));
		let flag = this.validator();
		if (flag) {
			let providerData = this.state.providerData;
			if (!this.state.update) {
				let num = this.props.dataList.allData.length;
				let order = 0;
				if (num > 0) {
					order = this.props.dataList.allData[num - 1].order + 1;
				}
				providerData['order'] = order;
				this.props.providerSave(providerData, this.props.parsedFilter)
			} else {
				providerData['_id'] = providerData.id;
				this.props.providerUpdate([this.state.providerData], this.props.parsedFilter);
			}
		}
	}

	rowEdit(row) {
		this.setState({
			providerData: {
				providerName: row.providerName,
				Agregator: row.Agregator,
				Percentage: row.Percentage,
				Route: row.Route,
				status: row.status,
				gameType: row.gameType._id,
				id: row._id,
			},
			modal: true,
			update: true
		});
	}

	rowDelete(row) {
		this.props.providerDelete(row, this.props.parsedFilter);
	}

	rowArrowup(row) {
		let alldata = this.props.dataList.data;
		let min = alldata[0].order;
		if (row.order === min) {
			return;
		} else {
			let num = row.order;
			let first = {};
			let last = {};
			for (let i = 0; i < alldata.length; i++) {
				if (alldata[i].order === num) {
					last = alldata[i];
					first = alldata[i - 1];
					break;
				}
			}
			let temp = 0;
			temp = first.order;
			first.order = last.order;
			last.order = temp;
			first.gameType = first.gameType._id;
			last.gameType = last.gameType._id;
			this.props.providerUpdate([first, last], this.props.parsedFilter);
		}
	}

	rowArrowDown(row) {
		let alldata = this.props.dataList.allData;
		let max = alldata[alldata.length - 1].order;
		if (row.order === max) {
			return;
		} else {
			let num = row.order;
			let first = {};
			let last = {};
			for (let i = 0; i < alldata.length; i++) {
				if (alldata[i].order === num) {
					last = alldata[i];
					first = alldata[i + 1];
					break;
				}
			}
			let temp = 0;
			temp = first.order;
			first.order = last.order;
			last.order = temp;
			this.props.providerUpdate([first, last], this.props.parsedFilter);
		}
	}

	handlePagination = page => {
		let { parsedFilter, pagenationchange } = this.props
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		pagenationchange({ page: page.selected + 1, perPage: perPage })
		this.setState({ currentPage: page.selected })
	}

	handleRowsPerPage = value => {
		let { parsedFilter, pagenationchange } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
		this.setState({ rowsPerPage: value })
		pagenationchange({ page: page, perPage: value })
	}

	handleFilter = e => {
		this.setState({ value: e.target.value })
		this.props.filterData(e.target.value)
	}

	render() {
		let { allGameTypes, filterData, modal, update, providerData, columns, data, totalPages, rowsPerPage, totalRecords, sortIndex } = this.state;
		return (
			<div id="admindata_table" className={`data-list list-view`}>
				<Modal isOpen={modal} toggle={this.toggleModal} className="modal-dialog-centered" >
					<Form onSubmit={this.handleSubmit} action={history.location.pathname} >
						<ModalHeader toggle={this.toggleModal} className="bg-primary">
							{!update ? "Add New Game provider" : "Edit Game Provider"}
						</ModalHeader>
						<ModalBody className="modal-dialog-centered  mt-1">
							<Row>
								<Col md="6" sm="12">
									<Label>Provider Name</Label>
									<FormGroup className="form-label-group position-relative has-icon-left mb-0">
										<Input type="text" placeholder="Provider Name" value={providerData.providerName} onChange={e => this.updateProviderData('providerName', e.target.value)} required />
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
									</FormGroup>
								</Col>
								<Col md="6" sm="12">
									<Label>Agregator</Label>
									<FormGroup className="form-label-group position-relative has-icon-left mb-0">
										<Input type="text" placeholder="Agregator" value={providerData.Agregator} onChange={e => this.updateProviderData('Agregator', e.target.value)} required />
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
									</FormGroup>
								</Col>
								<Col md="6" sm="12" className="mt-0">
									<Label>Percentage</Label>
									<FormGroup className="form-label-group position-relative has-icon-left mb-0">
										<Input type="number" min={1} max={99} placeholder="Percentage" value={providerData.Percentage} onChange={e => this.updateProviderData('Percentage', e.target.value)} required />
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
									</FormGroup>
								</Col>
								<Col md="6" sm="12">
									<FormGroup className="mb-0">
										<Label for="gametypes">Game Types</Label>
										<Select
											className="React"
											classNamePrefix="select"
											value={this.props.allGameTypes.find(obj => obj.value === providerData.gameType)}
											options={this.props.allGameTypes}
											onChange={e => this.updateProviderData('gameType', e.value)}
										/>
									</FormGroup>
								</Col>
								<Col xs={6} className="mt-0">
									<Label>Route</Label>
									<label className="react-toggle-wrapper">
										<Button.Ripple color="primary" onClick={() => this.updateProviderData('Route', !providerData.Route)} size="sm" >
											{providerData.Route ? "Direct" : "Aggregators"}
										</Button.Ripple>
									</label>
								</Col>
								<Col xs={6} className="mt-0">
									<Label>STATUS</Label>
									<label className="react-toggle-wrapper">
										<Toggle checked={providerData.status} onChange={() => this.updateProviderData('status', !providerData.status)} name="controlledSwitch" value="yes" />
										<Button.Ripple color="primary" onClick={() => this.updateProviderData('status', !providerData.status)} size="sm" >
											{providerData.status ? "Enable" : "Disable"}
										</Button.Ripple>
									</label>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit">Submit</Button>
						</ModalFooter>
					</Form>
				</Modal>

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
					responsive
					pointerOnHover
					selectableRowsHighlight
					customStyles={selectedStyle}
					subHeader
					subHeaderComponent={
						<CustomHeader
							allGameTypes={allGameTypes}
							filterData={filterData}
							handleRowsPerPage={this.handleRowsPerPage}
							rowsPerPage={rowsPerPage}
							total={totalRecords}
							index={sortIndex}
							me={this}
							userData={this.props.userData}
							parsedFilter={this.props.parsedFilter}
							allrefreshGames={this.props.allrefreshGames}
							handleFilter={this.handleFilter}
							handleSidebar={this.toggleModal}
						/>
					}
					sortIcon={<ChevronDown />}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.config.system,
		allGameTypes: state.config.system.allGameTypes,
		userData: state.auth.userData
	}
}

export default connect(mapStateToProps, {
	getAllGameTypes,
	providerSave,
	providerGet,
	providerUpdate,
	providerDelete,
	pagenationchange,
	filterData,
})(Child)