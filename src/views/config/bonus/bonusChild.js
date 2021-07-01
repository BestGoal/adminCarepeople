import React, { Component } from "react"
import {
	UncontrolledDropdown,
	DropdownMenu,
	DropdownToggle,
	DropdownItem,
	Input,
	Col,
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Label,
	Form,
	Badge,
} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import Toggle from "react-toggle"
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Edit2, Trash } from "react-feather"
import { connect } from "react-redux"
import { addNewBonus, getBonus, UpdateNewBonus, DeleteBonus } from "../../../redux/actions/config/bonus";
import { selectedStyle, pagenation_set } from "../../../configs/providerconfig"
import { history } from "../../../history"
import { toast } from "react-toastify"

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowEdit(props.row)} />
			<Trash className="cursor-pointer mr-1" size={20} onClick={() => props.me.toggleRemoveModal(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let { me, start, end, total } = props
	return (
		<Row>
			<Col xs="6" md="2">
				<UncontrolledDropdown className="data-list-rows-dropdown">
					<DropdownToggle color="" className="sort-dropdown">
						<span className="align-middle mx-50">
							{`${start} - ${end} of ${total}`}
						</span>
						<ChevronDown size={15} />
					</DropdownToggle>
					<DropdownMenu tag="div" right>
						{
							pagenation_set.map((item, i) => (
								<DropdownItem tag="a" key={i} onClick={() => me.handleRowsPerPage(item)}>{item} </DropdownItem>
							))
						}
					</DropdownMenu>
				</UncontrolledDropdown>
			</Col>
			<Col xs="6" md="10" className="mt-1">
				<div style={{ justifyContent: "flex-end", display: 'flex' }}>
					{/* <Button.Ripple color="success" type="submit" className="mr-1" onClick = {() => me.toggleModal(true, true)}> 
						<Plus size={15} />
						<span className="align-middle">{"Add New"}</span>
					</Button.Ripple> */}
				</div>
			</Col>
		</Row>
	)
}

class PokerManager extends Component {

	static getDerivedStateFromProps(props, state) {
		if (props.dataList.allData.length !== state.data.length || state.currentPage !== props.parsedFilter.page) {
			return {
				data: props.dataList.allData,
				currentPage: parseInt(props.parsedFilter.page) - 1,
				totalPages: props.dataList.totalPages,
				totalRecords: 0,
				start: 0,
				end: 0
			}
		}
		return null;
	}

	state = {
		bonusItem: {
			bonusType: "",
			bonusAmount: "",
			status: false
		},

		filterItem: {
			provider: "",
			gameType: "",
			gameName: ""
		},
		AllFilterType: [],
		AllFilterProvider: [],
		AllType: [],
		AllProvider: [],
		modal: false,

		// ///////////////////////////////////////////////////////////////////////
		data: [],
		totalPages: 0,
		currentPage: 0,
		totalRecords: 0,
		start: 0,
		end: 0,

		update: false,
		removeModal: false,
		selectId: "",

		columns: [
			{
				name: "Id",
				selector: "order",
				sortable: false,
				minWidth: "50px",
				cell: (row, index) => (
					<> {index + 1} </>
				)
			}, {
				name: "Bonus Type",
				selector: "bonusType",
				sortable: false,
				minWidth: "100px"
			}, {
				name: "Bonus Amount",
				selector: "bonusAmount",
				sortable: false,
				minWidth: "100px"
			}, {
				name: "Status",
				selector: "status",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.status ? "light-success" : "light-danger"} pill> {row.status ? "Enable" : "Disable"}</Badge>
				)
			}, {
				name: "Actions",
				minWidth: "50",
				sortable: false,
				cell: row => (
					<ActionsComponent
						row={row}
						me={this}
					/>
				)
			},
		],
	}

	async componentDidMount() {
		this.props.getBonus(this.props.parsedFilter);
	}

	toggleModal = (key, isNew = false) => {
		if (isNew) {
			this.setState({
				modal: key,
				update: false,
				bonusItem: {
					bonusType: "",
					bonusAmount: "",
					status: false,
				}
			})
		} else {
			this.setState({ modal: key });
		}
	}

	updateBonusItem = (data) => {
		let bonusItem = this.state.bonusItem;
		bonusItem[data.key] = data.value;
		this.setState({ bonusItem });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let { bonusItem, update, totalRecords, selectId } = this.state;
		let { addNewBonus, parsedFilter, UpdateNewBonus } = this.props;
		let flag = this.validatorGameItem();
		if (flag) {
			if (update) {
				bonusItem._id = selectId;
				UpdateNewBonus(bonusItem, parsedFilter);
			} else {
				bonusItem.order = totalRecords;
				addNewBonus(bonusItem, parsedFilter);
			}
			this.toggleModal(false, true);
		}
	}

	validatorGameItem = () => {
		let data = this.state.bonusItem;
		if (data.bonusType === "") {
			toast.error("Please input correctly bonusType.");
			return false;
		}
		if (data.bonusAmount === "") {
			toast.error("Please input correctly bonusAmount.");
			return false;
		}
		return true;
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getGames } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
		let condition = {};
		if (this.state.filterItem.gameName) {
			condition.gameName = this.state.filterItem.gameName && this.state.filterItem.gameName;
		}
		if (this.state.filterItem.gameType) {
			condition.gameType = this.state.filterItem.gameType && this.state.filterItem.gameType;
		}
		if (this.state.filterItem.provider) {
			condition.provider = this.state.filterItem.provider && this.state.filterItem.provider;
		}
		getGames({ page, perPage: value }, condition);
	}

	rowEdit(row) {
		this.setState({
			update: true,
			modal: true,
			bonusItem: {
				bonusType: row.bonusType,
				bonusAmount: row.bonusAmount,
				status: row.status
			},
			selectId: row._id
		});
	}

	handlePagination = page => {
		let { parsedFilter, getGames } = this.props
		let { filterItem } = this.state;
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		let condition = {};
		if (filterItem.gameName) {
			condition.gameName = filterItem.gameName && filterItem.gameName;
		}
		if (filterItem.gameType) {
			condition.gameType = filterItem.gameType && filterItem.gameType;
		}
		if (filterItem.provider) {
			condition.provider = filterItem.provider && filterItem.provider;
		}
		getGames({ page: page.selected + 1, perPage }, condition);
		this.setState({ currentPage: page.selected })
	}

	toggleRemoveModal(row = {}) {
		this.props.DeleteBonus({ _id: row._id }, this.props.parsedFilter);
	}

	render() {
		let { bonusItem, modal, totalRecords, start, end, columns, totalPages, data } = this.state;
		return (
			<div id="admindata_table" className={`data-list list-view`}>
				<Modal isOpen={modal} toggle={() => this.toggleModal(false, true)} className="modal-dialog-centered" >
					<Form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={() => this.toggleModal(false, true)} className="bg-primary">
							{"Add New Bonus Item"}
						</ModalHeader>
						<ModalBody className="modal-dialog-centered  mt-1">
							<Row>
								<Col sm="12">
									<FormGroup className="form-label-group position-relative has-icon-left">
										<Input
											type="text"
											placeholder="Bonus Type"
											value={bonusItem.bonusType}
											disabled

										/>
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
										<Label>Bonus Name</Label>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup className="form-label-group position-relative has-icon-left">
										<Input
											min={1}
											max={99}
											type="number"
											placeholder="Percent"
											value={bonusItem.bonusAmount}
											onChange={e => this.updateBonusItem({ key: "bonusAmount", value: e.target.value })}
											required
										/>
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
										<Label>Game Amount</Label>
									</FormGroup>
								</Col>
								<Col md="6" sm="12" className="mt-0">
									<Label>STATUS</Label>
									<label className="react-toggle-wrapper">
										<Toggle
											checked={bonusItem.status}
											onChange={() => this.updateBonusItem({ key: "status", value: !bonusItem.status })}
											name="controlledSwitch"
											value="yes"
										/>
										<Button.Ripple
											color="primary"
											type="button"
											onClick={() => this.updateBonusItem({ key: "status", value: !bonusItem.status })}
											size="sm"
										>
											{bonusItem.status ? "Enable" : "Disable"}
										</Button.Ripple>
									</label>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" type="submit"> {"Submit"} </Button>
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
							me={this}
							total={totalRecords}
							start={start}
							end={end}
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
		dataList: state.config.bonus,
	}
}

export default connect(mapStateToProps, {
	addNewBonus,
	UpdateNewBonus,
	getBonus,
	DeleteBonus
})(PokerManager)