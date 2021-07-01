import React, { Component } from "react";
import { connect } from "react-redux";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, FormGroup, Label, Table } from "reactstrap";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import Select from "react-select";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../history";
import { getPlayerData, getPlayerBetReport } from "../../../../redux/actions/report/player";
import { selectedStyle, pagenation_set, paymentType } from "../../../../configs/providerconfig";
import DatePicker from "../../../ui-elements/dateTimePicker/datepicker";

const CustomHeader = props => {
    let { playerList, filterData, handleFilter, totalData } = props;
    return (
        <Row>
            <Col md='4' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label> Date </Label>
                    <DatePicker
                        onChange={date => { handleFilter([date.start, date.end], "date") }}
                    />
                </FormGroup>
            </Col>
            <Col md='4' sm='6' xs='12'>
                <FormGroup>
                    <Label>Player List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={playerList}
                        value={playerList.find(obj => obj.value === (filterData.player ? filterData.player : ""))}
                        onChange={e => handleFilter(e.value, "player")}
                    />
                </FormGroup>
            </Col>
            <Table responsive bordered >
                <thead >
                    <tr>
                        <th>Total DEBIT Amount</th>
                        <th>Total CREDIT Amount</th>
                        <th>Net(credit - debit)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalData.allWithdrawMoney}</td>
                        <td>{totalData.allDepositMoney}</td>
                        <td>{(totalData.allWithdrawMoney - totalData.allDepositMoney).toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
            <Col xs='6' className='justify-content-start align-items-center flex' md="3">
                <FormGroup>
                    <UncontrolledDropdown className="data-list-rows-dropdown d-block">
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
                </FormGroup>
            </Col>
        </Row>
    )
}

class AgentTransactionHistory extends Component {
    static getDerivedStateFromProps(props) {
        return {
            playerList: props.data.playerList,
            data: props.data.betReportData.data,
            sortIndex: props.data.betReportData.sortIndex,
            totalPages: props.data.betReportData.totalPages,
            totalRecords: props.data.betReportData.totalRecords,
        }
    }

    state = {
        playerList: [],
        filterData: {
            date: [new Date(), new Date(new Date().valueOf() + 60 * 60 * 24 * 1000)]
        },
        data: [],
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [],

        columns: [
            {
                name: "id",
                selector: "_id",
                sortable: true,
                minWidth: "50px"
            },
            {
                name: "Date",
                selector: "createdAt",
                minWidth: "200px",
                sortable: true
            },
            {
                name: "player",
                selector: "player",
                minWidth: "200px",
                sortable: true
            },
            // {
            //     name: "Discription",
            //     selector: "comment",
            //     minWidth: "300px",
            //     sortable: true
            // },
            {
                name: "amounttype",
                selector: "amountType",
                minWidth: "100px",
                sortable: true
            },
            {
                name: "transactionId",
                selector: "transactionId",
                minWidth: "150px",
                sortable: true
            },
            {
                name: paymentType.DEBIT,
                selector: "paymentType",
                minWidth: "60px",
                sortable: true,
                cell: row => (
                    <>{row.paymentType === paymentType.DEBIT ? row.amount : 0}</>
                )
            },
            {
                name: paymentType.CREDIT,
                selector: "paymentType",
                minWidth: "60px",
                sortable: true,
                cell: row => (
                    <>{row.paymentType === paymentType.CREDIT ? row.amount : 0}</>
                )
            },
            {
                name: "lastbalance",
                selector: "lastbalance",
                minWidth: "150px",
                sortable: true,
            },
            {
                name: "updatedbalance",
                selector: "updatedbalance",
                minWidth: "150px",
                sortable: true,
            }
        ],
    }

    componentDidMount() {
        this.props.getPlayerData();
        this.props.getPlayerBetReport(this.props.parsedFilter, this.state.filterData);
    }

    handleFilter = async (value, bool) => {
        let filterData = this.state.filterData;
        if (value) {
            filterData[bool] = value;
        } else {
            delete filterData[bool];
        }
        this.setState({ filterData });
        this.props.getPlayerBetReport(this.props.parsedFilter, filterData);
    }

    handlePagination = page => {
        let { parsedFilter } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        let urlPrefix = `${history.location.pathname}`
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        this.props.getPlayerBetReport({ page: page.selected + 1, perPage }, this.state.filterData);
    }

    handleRowsPerPage = value => {
        let { parsedFilter } = this.props
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
        this.props.getPlayerBetReport({ page, perPage: value }, this.state.filterData);
    }

    render() {
        let { playerList, filterData, columns, data, totalPages, totalRecords, sortIndex } = this.state;
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
                            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
                            activeClassName="active"
                            pageCount={totalPages}
                            forcePage={
                                this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0
                            }
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
                            playerList={playerList}
                            filterData={filterData}
                            index={sortIndex}
                            total={totalRecords}
                            handleFilter={this.handleFilter}
                            handleRowsPerPage={this.handleRowsPerPage}
                            totalData={this.props.totalData}
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
        data: state.report.player_history,
        totalData: state.report.player_history.playerTotalBetReport
    }
}

export default connect(mapStateToProps, {
    getPlayerData,
    getPlayerBetReport
})(AgentTransactionHistory)
