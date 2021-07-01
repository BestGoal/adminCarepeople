import React, { Component } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../history";
import { connect } from "react-redux";
import { Root } from "../../../authServices/rootconfig";
import { getAllAgent } from "../../../redux/actions/jackpot/index";
import { pagenation_set, selectedStyle } from "../../../configs/providerconfig";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, FormGroup, Label } from "reactstrap";

const CustomHeader = props => {
	let state = props.state.condition
	return (
		<>
			<Row>
				<Col md='3' sm='6' xs='12'>
					<FormGroup className="mb-0">
						<Label for="basicInput">Username</Label>
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
		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],

		condition: {},

		columns: [
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
				name: "Jackpot 1",
				selector: "jackpotData",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<>
						{row.jackpotData && row.jackpotData.length ? row.jackpotData[0].charge + "/" + row.jackpotData[0].price : "0/0"}
					</>
				)
			},
			{
				name: "Jackpot 2",
				selector: "jackpotData",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<>
						{row.jackpotData && row.jackpotData.length ? row.jackpotData[1].charge + "/" + row.jackpotData[1].price : "0/0"}
					</>
				)
			},
			{
				name: "Jackpot 3",
				selector: "jackpotData",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<>
						{row.jackpotData && row.jackpotData.length ? row.jackpotData[2].charge + "/" + row.jackpotData[2].price : "0/0"}
					</>
				)
			},
			{
				name: "Jackpot 4",
				selector: "jackpotData",
				sortable: true,
				minWidth: "150px",
				cell: row => (
					<>
						{row.jackpotData && row.jackpotData.length ? row.jackpotData[3].charge + "/" + row.jackpotData[3].price : "0/0"}
					</>
				)
			},
		]
	}

	componentDidMount() {
		this.props.getAllAgent(this.props.parsedFilter, {})
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

	render() {
		let { columns, data, totalPages, totalRecords, sortIndex } = this.state;
		return (
			<>
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
		dataList: state.jackpot.agentData
	}
}

export default connect(mapStateToProps, {
	getAllAgent
})(ListViewConfig)