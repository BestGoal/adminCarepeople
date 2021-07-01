import React, { Component } from "react";
import { connect } from "react-redux";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, FormGroup, Label, Table } from "reactstrap";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import Select from "react-select";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { getAgentData, getAgentTransactionReport } from "../../../../redux/actions/report/agent";
import { selectedStyle, pagenation_set, paymentType } from "../../../../configs/providerconfig";
import { history } from "../../../../history";
import DatePicker from "../../../ui-elements/dateTimePicker/datepicker"

const CustomHeader = props => {
    let { agentList, filterData, handleFilter, agentTotalTransaction } = props;
    return (
        <Row>
            <Col md='4' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label> Date </Label>
                    <DatePicker
                        onChange={date => handleFilter([date.start, date.end], "date")}
                    />
                </FormGroup>
            </Col>
            <Col md='4' sm='6' xs='12'>
                <FormGroup>
                    <Label>Agent List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={agentList}
                        value={agentList.find(obj => obj.value === (filterData.agentId ? filterData.agentId : ""))}
                        onChange={e => handleFilter(e.value, "agentId")}
                    />
                </FormGroup>
            </Col>
            <Table responsive bordered >
                <thead >
                    <tr>
                        <th>Currency</th>
                        <th>Total Deposit Amount</th>
                        <th>Total Withdrawal Amount</th>
                        <th>Net(Deposit - Withdrawal)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"EUR"}</td>
                        <td>{agentTotalTransaction.allDepositMoney}</td>
                        <td>{agentTotalTransaction.allWithdrawMoney}</td>
                        <td>{agentTotalTransaction.allDepositMoney - agentTotalTransaction.allWithdrawMoney}</td>
                    </tr>
                </tbody>
            </Table>
            <Col xs='6' className='justify-content-start align-items-center flex mt-1' md="3">
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
            agentList: props.data.agentList,
            data: props.data.transactionData.data,
            sortIndex: props.data.transactionData.sortIndex,
            totalPages: props.data.transactionData.totalPages,
            totalRecords: props.data.transactionData.totalRecords,
        }
    }

    state = {
        agentList: [],
        data: [],
        filterData: {
            date: [ new Date(), new Date(new Date().valueOf() + 60 * 60 * 24 * 1000)]
        },
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
                name: "username",
                selector: "user",
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
                name: "transactionId",
                selector: "transactionId",
                minWidth: "150px",
                sortable: true
            },
            {
                name: paymentType.DEPOSIT,
                selector: "paymentType",
                minWidth: "60px",
                sortable: true,
                cell: row => (
                    <>{row.paymentType === paymentType.DEPOSIT ? row.amount : 0}</>
                )
            },
            {
                name: paymentType.WITHDRAWL,
                selector: "paymentType",
                minWidth: "60px",
                sortable: true,
                cell: row => (
                    <>{row.paymentType === paymentType.WITHDRAWL ? row.amount : 0}</>
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
        this.props.getAgentData();
        this.props.getAgentTransactionReport(this.props.parsedFilter, this.state.filterData);
    }

    handleFilter = async (value, bool) => {
        let filterData = this.state.filterData;
        if (value) {
            filterData[bool] = value;
        } else {
            delete filterData[bool];
        }
        this.setState({ filterData });
        this.props.getAgentTransactionReport(this.props.parsedFilter, filterData);
    }

    handlePagination = page => {
        let { parsedFilter } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        let urlPrefix = `${history.location.pathname}`
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        this.props.getAgentTransactionReport({ page: page.selected + 1, perPage }, this.state.filterData);
    }

    handleRowsPerPage = value => {
        let { parsedFilter } = this.props
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
        this.props.getAgentTransactionReport({ page, perPage: value }, this.state.filterData);
    }

    render() {
        let { agentList, filterData, columns, data, totalPages, totalRecords, sortIndex } = this.state;
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
                            agentList={agentList}
                            filterData={filterData}
                            index={sortIndex}
                            total={totalRecords}
                            handleFilter={this.handleFilter}
                            handleRowsPerPage={this.handleRowsPerPage}
                            agentTotalTransaction={this.props.agentTotalTransaction}
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
        data: state.report.agent_history,
        agentTotalTransaction: state.report.agent_history.agentTotalTransaction
    }
}

export default connect(mapStateToProps, {
    getAgentData,
    getAgentTransactionReport
})(AgentTransactionHistory)
