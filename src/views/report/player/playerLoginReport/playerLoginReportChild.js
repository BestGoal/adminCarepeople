import React, { Component } from "react";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, FormGroup, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../history";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { getPlayerData, getPlayerLoginReport } from "../../../../redux/actions/report/player/index";
import Select from "react-select";
import { selectedStyle, pagenation_set } from "../../../../configs/providerconfig";
import DatePicker from "../../../ui-elements/dateTimePicker/datepicker";

const CustomHeader = props => {
    let { playerList, filterData, handleFilter } = props;
    return (
        <>
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
                    <FormGroup className="mb-0">
                        <Label>Player List</Label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={playerList}
                            value={playerList.find(obj => obj.value === filterData.agentId)}
                            onChange={e => handleFilter(e.value, "agentId")}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="m-0 p-0">
                <Col xs='6' className='justify-content-start align-items-center flex' md="3">
                    <FormGroup>
                        <Label></Label>
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
        </>
    )
}

class PlayerLoginHistory extends Component {

    static getDerivedStateFromProps(props, state) {
        return {
            playerList: props.data.playerList,
            data: props.data.loginData.data,
            sortIndex: props.data.loginData.sortIndex,
            totalPages: props.data.loginData.totalPages,
            totalRecords: props.data.loginData.totalRecords,
        }
    }

    state = {
        playerList: [],
        filterData: {
            date: [
                `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
                `${new Date(new Date().valueOf() + 60 * 60 * 24 * 1000).toDateString()} ${new Date(new Date().valueOf() + 60 * 60 * 24 * 1000).toLocaleTimeString()}`
            ]
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
                name: "username",
                selector: "username",
                minWidth: "150px",
                sortable: true
            },
            {
                name: "action",
                selector: "action",
                minWidth: "150px",
                sortable: true
            },
            {
                name: "Date",
                selector: "date",
                minWidth: "150px",
                sortable: true
            },
            {
                name: "Additional Information",
                selector: "comment",
                minWidth: "300px",
                sortable: true,
            },
            {
                name: "ip",
                selector: "ip",
                minWidth: "150px",
                sortable: true,
            }
        ],
    }

    async componentDidMount() {
        await this.setState({
            filterData: {
                date: [
                    new Date(), new Date(new Date().valueOf() + 60 * 60 * 24 * 1000)
                ]
            }
        })
        this.props.getPlayerData();
        this.props.getPlayerLoginReport(this.props.parsedFilter, this.state.filterData);
    }

    handleFilter = async (value, bool) => {
        let filterData = this.state.filterData;
        if (value) {
            filterData[bool] = value;
        } else {
            delete filterData[bool];
        }
        this.setState({ filterData });
        this.props.getPlayerLoginReport(this.props.parsedFilter, filterData);
    }

    handlePagination = page => {
        let { parsedFilter } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        let urlPrefix = `${history.location.pathname}`
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        this.props.getPlayerLoginReport({ page: page.selected + 1, perPage }, this.state.filterData);
    }

    handleRowsPerPage = value => {
        let { parsedFilter } = this.props
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
        this.props.getPlayerLoginReport({ page, perPage: value }, this.state.filterData);
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
    }
}

export default connect(mapStateToProps, {
    getPlayerData,
    getPlayerLoginReport
})(PlayerLoginHistory)
