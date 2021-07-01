import React, { Component } from "react";
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader, ModalFooter,
	FormGroup, Label, Form, Badge
} from "reactstrap";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Toggle from "react-toggle";
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Edit2, Trash, ArrowUp, ArrowDown } from "react-feather";
import { connect } from "react-redux";
import { addNewGameType, getGameTypes, UpdateGameType, DeleteGameType } from "../../../redux/actions/cms/gameType";
import { selectedStyle, pagenation_set } from "../../../configs/providerconfig";
import { history } from "../../../history";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import confirm from "reactstrap-confirm";

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowEdit(props.row)} />
			<Trash className="cursor-pointer mr-1" size={20} onClick={() => props.me.toggleRemoveModal(props.row)} />
			<ArrowUp className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowArrowup(props.row)} />
			<ArrowDown className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowArrowDown(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	return (
		<div className="d-flex justify-content-between">
			<div>
				<UncontrolledDropdown className="data-list-rows-dropdown">
					<DropdownToggle color="" className="sort-dropdown">
						<span className="align-middle mx-50">
							{`${props.start} - ${props.end} of ${props.total}`}
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
			</div>
			<div>
				<Button.Ripple color="success" onClick={() => props.handleSidebar(true, true)} >
					<span>Add Type</span>
				</Button.Ripple>
			</div>
		</div>
	)
}

class GameTypeManager extends Component {

	static getDerivedStateFromProps(props, state) {
		if (props.dataList.AllGameTypes.length !== state.data.length || state.currentPage !== props.parsedFilter.page) {
			return {
				data: props.dataList.AllGameTypes,
				totalPages: props.dataList.totalPages,
				currentPage: parseInt(props.parsedFilter.page) - 1,
				totalRecords: props.dataList.CountGameTypes,
				start: props.dataList.start,
				end: props.dataList.end
			}
		}
		return null;
	}

	state = {

		gameTypeItem: {
			name: "",
			icon: "",
			navLink: "",
			selectId: "",
			status: true,
			haveGames: true,
		},

		modal: false,
		update: false,

		data: [],
		totalPages: 0,
		currentPage: 0,
		totalRecords: 0,
		start: 0,
		end: 0,

		columns: [
			{
				name: "Id",
				selector: "order",
				sortable: false,
				minWidth: "50px",
				cell: (row, index) => (
					<> {index + 1} </>
				)
			},
			{
				name: "Gametype Id",
				selector: "_id",
				sortable: false,
				minWidth: "200px",
			}, {
				name: "Name",
				selector: "name",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "Icon",
				selector: "icon",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<><FontAwesomeIcon icon={Icons[row.icon]} />&nbsp;&nbsp;{`${row.icon}`}</>
				)
			}, {
				name: "navLink",
				selector: "navLink",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "Status",
				selector: "status",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.status ? "light-success" : "light-danger"} pill> {row.status ? "Enable" : "Disable"}</Badge>
				)
			}, {
				name: "haveGames",
				selector: "haveGames",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.haveGames ? "light-success" : "light-danger"} pill> {row.haveGames ? "Enable" : "Disable"}</Badge>
				)
			}, {
				name: "Actions",
				minWidth: "50",
				sortable: false,
				cell: row => (
					<ActionsComponent row={row} me={this} />
				)
			},
		]
	}

	componentDidMount() {
		this.props.getGameTypes(this.props.parsedFilter, {})
	}

	toggleModal = (key, isNew) => {
		if (isNew) {
			this.setState({
				modal: key,
				update: false,
				gameTypeItem: {
					name: "",
					icon: "",
					navLink: "",
					selectId: "",
					status: true,
					haveGames: true,
				}
			})
		} else {
			this.setState({ modal: key });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let sendData = this.state.gameTypeItem;
		if (this.state.update) {
			sendData._id = sendData.selectId;
			this.props.UpdateGameType([sendData], this.props.parsedFilter);
		} else {
			sendData.order = this.state.totalRecords;
			this.props.addNewGameType(sendData, this.props.parsedFilter);
		}
		this.toggleModal(false, true);
	}

	handleItemUpdate(key, value) {
		let data = this.state.gameTypeItem;
		data[key] = value;
		this.setState({ gameTypeItem: data });
	}

	handlePagination = page => {
		let { parsedFilter, getGameTypes } = this.props
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		getGameTypes({ page: page.selected + 1, perPage })
		this.setState({ currentPage: page.selected })
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getGameTypes } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
		getGameTypes({ page, perPage: value });
	}

	async toggleRemoveModal(row = {}) {
		let flag = await confirm({
			title: (<> Delete game type. </>),
			message: "Will you remove this item reall ?",
			confirmText: "Ok",
			cancelColor: "link text-danger"
		});
		if (flag) {
			this.props.DeleteGameType({ _id: row._id }, this.props.parsedFilter);
		}
	}

	rowEdit(row) {
		this.setState({
			update: true,
			modal: true,
			gameTypeItem: {
				name: row.name,
				icon: row.icon,
				navLink: row.navLink,
				selectId: row._id,
				status: row.status,
				haveGames: row.haveGames
			}
		});
	}

	rowArrowup(row) {
		let allData = this.state.data;
		let index = allData.findIndex(item => item._id === row._id);
		if (index > -1 && index !== 0) {
			let firstData = allData[index - 1];
			let secondData = allData[index];
			firstData = Object.assign({}, firstData, { order: allData[index].order });
			secondData = Object.assign({}, secondData, { order: allData[index - 1].order })
			this.props.UpdateGameType([firstData, secondData], this.props.parsedFilter);
		}
	}

	rowArrowDown(row) {
		let allData = this.state.data;
		let index = allData.findIndex(item => item._id === row._id);
		if (index > -1 && index !== allData.length - 1) {
			let firstData = allData[index];
			let secondData = allData[index + 1];
			firstData = Object.assign({}, firstData, { order: allData[index + 1].order });
			secondData = Object.assign({}, secondData, { order: allData[index].order })
			this.props.UpdateGameType([firstData, secondData], this.props.parsedFilter);
		}
	}

	render() {
		let { modal, update, gameTypeItem, columns, totalRecords, start, end, totalPages, data } = this.state;
		return (
			<div id="admindata_table" className={`data-list list-view`}>
				<Modal isOpen={modal} toggle={() => this.toggleModal(false, true)} className="modal-dialog-centered" >
					<Form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={() => this.toggleModal(false, true)} className="bg-primary">
							{update ? "Update Game Types" : "Add Game Types"}
						</ModalHeader>
						<Row className="p-2 pt-3">
							<Col md="12" sm="12">
								<FormGroup className="form-label-group position-relative has-icon-left">
									<Input type="text" placeholder="Name" value={gameTypeItem.name} onChange={e => this.handleItemUpdate('name', e.target.value)} required />
									<div className="form-control-position" >
										<Edit2 size={15} />
									</div>
									<Label>Name</Label>
								</FormGroup>
							</Col>
							<Col md="12" sm="12">
								<FormGroup className="form-label-group position-relative has-icon-left">
									<Input type="text" placeholder="Icon" value={gameTypeItem.icon} onChange={e => this.handleItemUpdate('icon', e.target.value)} required />
									<div className="form-control-position" >
										<Edit2 size={15} />
									</div>
									<Label>Icon</Label>
								</FormGroup>
							</Col>
							<Col md="12" sm="12">
								<FormGroup className="form-label-group position-relative has-icon-left">
									<Input type="text" placeholder="navLink" value={gameTypeItem.navLink} onChange={e => this.handleItemUpdate('navLink', e.target.value)} required />
									<div className="form-control-position" >
										<Edit2 size={15} />
									</div>
									<Label>Link</Label>
								</FormGroup>
							</Col>
							<Col md="6" sm="12" className="mt-0">
								<Label>STATUS</Label>
								<label className="react-toggle-wrapper">
									<Toggle checked={gameTypeItem.status} onChange={() => this.handleItemUpdate('status', !gameTypeItem.status)} name="controlledSwitch" value="yes" />
									<Button.Ripple color="primary" onClick={() => this.handleItemUpdate('status', !gameTypeItem.status)} size="sm" >
										{gameTypeItem.status ? "Enable" : "Disable"}
									</Button.Ripple>
								</label>
							</Col>
							<Col md="6" sm="12" className="mt-0">
								<Label>IsHaveGames</Label>
								<label className="react-toggle-wrapper">
									<Toggle checked={gameTypeItem.haveGames} onChange={() => this.handleItemUpdate('haveGames', !gameTypeItem.haveGames)} name="controlledSwitch" value="yes" />
									<Button.Ripple color="primary" onClick={() => this.handleItemUpdate('haveGames', !gameTypeItem.haveGames)} size="sm" >
										{gameTypeItem.haveGames ? "Enable" : "Disable"}
									</Button.Ripple>
								</label>
							</Col>
						</Row>
						<ModalFooter>
							{
								update ? <Button color="primary" type="submit">Update</Button> : <Button color="primary" type="submit"> Save </Button>
							}
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
					customStyles={selectedStyle}
					subHeader
					subHeaderComponent={
						<CustomHeader
							handleRowsPerPage={this.handleRowsPerPage}
							total={totalRecords}
							start={start}
							end={end}
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
		dataList: state.cms.gameTypes.gameTypes,
	}
}

export default connect(mapStateToProps, {
	addNewGameType,
	getGameTypes,
	UpdateGameType,
	DeleteGameType,
})(GameTypeManager)