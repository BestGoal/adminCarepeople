import React, { Component } from "react"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import Select from "react-select"
import { connect } from "react-redux"
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, FormGroup, Label, Table } from "reactstrap";
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"
import { history } from "../../../../history"
import { getPlayerData, getPlayerGameReport } from "../../../../redux/actions/report/player"
import { getBigProviderData, getSubProviders, deleteSubProviders, getProviderData, getSubGames, deleteSubGames } from "../../../../redux/actions/report/agent"
import { selectedStyle, pagenation_set } from "../../../../configs/providerconfig"
import DatePicker from "../../../ui-elements/dateTimePicker/datepicker"

const ocb = {
    id: "60312699d4d3fc3714867237",
    name: "OCB Poker"
}

const CustomHeader = props => {
    let { bigProviderList, playerList, providerList, gameList, filterData, handleFilter, totalData, totalRake, ogMoney } = props;
    return (
        <Row>
            <Col md='3' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label> Date </Label>
                    <DatePicker onChange={date => { handleFilter([date.start, date.end], "date") }} />
                </FormGroup>
            </Col>
            <Col md='3' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label>Main Provider List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={bigProviderList}
                        value={bigProviderList.find(obj => obj.value === (filterData.bigprovider ? filterData.bigprovider : ""))}
                        onChange={e => handleFilter(e.value, "bigprovider")}
                    />
                </FormGroup>
            </Col>
            <Col md='3' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label>Provider List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={providerList}
                        value={providerList.find(obj => obj.value === (filterData.provider ? filterData.provider : ""))}
                        onChange={e => handleFilter(e.value, "provider")}
                    />
                </FormGroup>
            </Col>
            <Col md='3' sm='6' xs='12'>
                <FormGroup className="mb-0">
                    <Label>Game List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={gameList}
                        value={gameList.find(obj => obj.value === (filterData.game ? filterData.game : ""))}
                        onChange={e => handleFilter(e.value, "game")}
                    />
                </FormGroup>
            </Col>
            <Col sm='6' xs='12'>
                <FormGroup>
                    <Label>Player List</Label>
                    <Select
                        className="React"
                        classNamePrefix="select"
                        options={playerList}
                        value={playerList.find(obj => obj.value === (filterData.player ? filterData.player : ''))}
                        onChange={e => handleFilter(e.value, "player")}
                    />
                </FormGroup>
            </Col>
            <Table responsive bordered >
                <thead >
                    <tr>
                        <th>Total Bet Amount</th>
                        <th>Total Win Amount</th>
                        <th>Net(win/lose)</th>
                        {
                            (filterData.provider === ocb.id || filterData.bigprovider === ocb.name) && <th>Rake + Tournament Fee</th>
                        }
                        {
                            (filterData.provider === "603e6c54e10dfc1b1c7e548c" || filterData.bigprovider === "OG") && <th>OG remain money</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalData.betAmount}</td>
                        <td>{totalData.winAmount}</td>
                        <td>{(totalData.betAmount - totalData.winAmount).toFixed(2)}</td>
                        {
                            (filterData.provider === ocb.id || filterData.bigprovider === ocb.name) && <th>{totalRake}</th>
                        }
                        {
                            (filterData.provider === "603e6c54e10dfc1b1c7e548c" || filterData.bigprovider === "OG") && <td>{ogMoney}</td>
                        }
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

class PlayerGameReportChild extends Component {

    static getDerivedStateFromProps(props) {
        return {
            playerList: props.data.playerList,
            gameList: props.gameList,
            data: props.data.betData.data,
            sortIndex: props.data.betData.sortIndex,
            totalPages: props.data.betData.totalPages,
            totalRecords: props.data.betData.totalRecords,
        }
    }

    state = {
        bigProviderList: [],
        playerList: [],
        providerList: [],
        gameList: [],

        filterData: {
            date: [
                String(new Date().toLocaleDateString() + " 00:00:00"),
                String(new Date().toLocaleDateString() + " 23:59:59")
            ]
        },
        data: [],
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [],

        columns: [
            {
                name: "GAMEID",
                selector: "_id",
                sortable: true,
                minWidth: "150px",
                cell: row => (
                    <> {row._id.GAMEID} </>
                )
            },
            {
                name: "GAMENAME",
                selector: "_id",
                sortable: true,
                minWidth: "100px",
                cell: row => (
                    <> {row.gameName} </>
                )
            },
            {
                name: "PROVIDER",
                selector: "provider",
                sortable: true,
                minWidth: "100px"
            },
            {
                name: "TYPE",
                selector: "type",
                sortable: true,
                minWidth: "100px"
            },
            {
                name: "TOTAL BET",
                selector: "bet",
                sortable: true,
                minWidth: "100px",
                cell: row => (
                    <>{
                        (row.betAmount.length ? (
                            row.betAmount[0].amount - (row.cancelAmount.length ? row.cancelAmount[0].amount : 0)
                        ) : (
                            0 - (row.cancelAmount.length ? row.cancelAmount[0].amount : 0)
                        )).toFixed(2)
                    }</>
                )
            },
            {
                name: "TOTAL WIN",
                selector: "bet",
                sortable: true,
                minWidth: "100px",
                cell: row => (
                    <>{(row.winAmount.length ? row.winAmount[0].amount : 0).toFixed(2)}</>
                )
            }
        ],
    }

    componentDidMount() {
        this.props.getPlayerData();
        this.props.getBigProviderData();
        this.props.getPlayerGameReport(this.props.parsedFilter, this.state.filterData);
    }

    handleFilter = async (value, bool) => {
        let filterData = this.state.filterData;
        if (value) {
            filterData[bool] = value;
            if (bool === "bigprovider") {
                delete filterData["game"];
                delete filterData["provider"];
                this.props.getSubProviders(value);
                this.props.deleteSubGames();
            }
            if (bool === "provider") {
                delete filterData["game"];
                this.props.getSubGames(value);
            }
        } else {
            delete filterData[bool];
            if (bool === "bigprovider") {
                delete filterData["provider"];
                delete filterData["game"];
                this.props.deleteSubProviders();
                this.props.deleteSubGames();
            }
            if (bool === "provider") {
                delete filterData["game"];
                this.props.deleteSubGames();
            }
        }
        this.setState({ filterData });
        this.props.getPlayerGameReport(this.props.parsedFilter, filterData);
    }

    handlePagination = page => {
        let parsedFilter = this.props.parsedFilter;
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        let urlPrefix = `${history.location.pathname}`
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        this.props.getPlayerGameReport({ page: page.selected + 1, perPage }, this.state.filterData);
    }

    handleRowsPerPage = value => {
        let parsedFilter = this.props.parsedFilter;
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
        this.props.getPlayerGameReport({ page, perPage: value }, this.state.filterData);
    }

    render() {
        let { bigProviderList, providerList } = this.props;
        let { playerList, gameList, filterData, columns, data, totalPages, totalRecords, sortIndex } = this.state;
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
                            bigProviderList={bigProviderList}
                            providerList={providerList}

                            gameList={gameList}
                            filterData={filterData}
                            index={sortIndex}
                            total={totalRecords}
                            totalData={this.props.playerTotalGame}
                            totalRake={this.props.rake}
                            ogMoney={this.props.ogMoney}
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
        bigProviderList: state.report.agent_history.bigProviderList,
        providerList: state.report.agent_history.providerList,

        gameList: state.report.agent_history.gameList,
        playerTotalGame: state.report.player_history.playerTotalGame,
        rake: state.report.player_history.rake,
        ogMoney: state.report.player_history.ogMoney
    }
}

export default connect(mapStateToProps, {
    getPlayerData,
    getBigProviderData,
    getSubProviders,
    deleteSubProviders,

    getProviderData,
    getSubGames,
    deleteSubGames,
    getPlayerGameReport
})(PlayerGameReportChild)