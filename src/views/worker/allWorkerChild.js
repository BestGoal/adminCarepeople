import React, { Component } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { connect } from "react-redux";
import { ChevronDown, ChevronLeft, ChevronRight, Edit } from "react-feather";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Badge, FormGroup, Label } from "reactstrap";
import Sidebar from "./dataListSidebar";
import { history } from "../../history";
import { Root } from "../../authServices/rootconfig";
import { getAllWorker } from "../../redux/actions/user/index";
import { pagenation_set, selectedStyle, status_options } from "../../configs/providerconfig";

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.editRow(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let { condition } = props;
	let tempAllData = [{ value: "", label: "All" }];
	let statusList = [...tempAllData, ...status_options];

	return (
		<div className="p-0">
			<Row>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label>firstName</Label>
						<Input
							type="text"
							placeholder="Enter firstName"
							value={condition.firstName ? condition.firstName : ""}
							onChange={e => props.handleFilter(e.target.value, "firstName")}
						/>
					</FormGroup>
				</Col>
				<Col md='3' sm='6' xs='6'>
					<FormGroup className="mb-0">
						<Label>lastName</Label>
						<Input
							type="text"
							placeholder="Enter lastName"
							value={condition.lastName ? condition.lastName : ""}
							onChange={e => props.handleFilter(e.target.value, "lastName")}
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
			</Row>

			<Row className="mt-1">
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
		currentRow: {},

		columns: [
			{
				name: "Actions",
				minWidth: "100px",
				sortable: false,
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
				name: "firstName",
				selector: "firstName",
				sortable: true,
				minWidth: "150px",
			},
			{
				name: "lastName",
				selector: "lastName",
				sortable: true,
				minWidth: "150px",
			},
			{
				name: "email",
				selector: "email",
				sortable: true,
				minWidth: "150px",
			},
			{
				name: "Status",
				selector: "status",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.status === "allow" ? "light-success" : "light-danger"} pill>
						{row.status}
					</Badge>
				)
			},
			{
				name: "work_status",
				selector: "work_status",
				sortable: true,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.work_status === "approve" ? "light-success" : "light-danger"} pill>
						{row.work_status}
					</Badge>
				)
			},
			{
				name: "streetNumber",
				selector: "streetNumber",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "streetName",
				selector: "streetName",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "city",
				selector: "city",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "province",
				selector: "province",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "country",
				selector: "country",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "zipcode",
				selector: "zipcode",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "phoneNumber",
				selector: "phoneNumber",
				sortable: true,
				minWidth: "220px",
			},

			{
				name: "apartNumber",
				selector: "apartNumber",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "jobPosition",
				selector: "jobPosition",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "mailing",
				selector: "mailing",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "school",
				selector: "school",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "degree",
				selector: "degree",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "study_type",
				selector: "study_type",
				sortable: true,
				minWidth: "220px",
			},
			{
				name: "study_year",
				selector: "study_year",
				sortable: true,
				minWidth: "220px",
			}
		]
	}

	componentDidMount() {
		this.props.getAllWorker(this.props.parsedFilter, this.state.condition);
	}

	handleSidebar = (boolean) => {
		this.setState({ sidebar: boolean })
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getAllWorker } = this.props;
		let page = parsedFilter.page ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
		this.setState({ rowsPerPage: value })
		getAllWorker({ page, perPage: value }, this.state.condition);
	}

	handlePagination = page => {
		let { parsedFilter, getAllWorker } = this.props;
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		getAllWorker({ page: page.selected + 1, perPage }, this.state.condition);
	}

	handleFilter = (value, bool) => {
		let condition = this.state.condition;
		if (value) {
			condition[bool] = value;
		} else {
			delete condition[bool];
		}
		this.setState({ condition });
		this.props.getAllWorker(this.props.parsedFilter, condition);
	}

	editRow = (row) => {
		this.setState({ currentRow: row, sidebar: true })
	}
	
	handleSidebar = (key) => {
		this.setState({ sidebar: key })
	}

	render() {
		let { columns, data, totalPages, sidebar, totalRecords, sortIndex, currentRow, condition } = this.state;
		return (
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
					currentRow={currentRow}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.agent.agent,
	}
}

export default connect(mapStateToProps, {
	getAllWorker,
})(ListViewConfig)