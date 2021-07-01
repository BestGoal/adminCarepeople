import React, { Component } from "react"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import {
    UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, FormGroup, Label, Modal, ModalHeader, ModalBody, 
    ModalFooter, Form
} from "reactstrap"
import { ChevronDown, ChevronLeft, ChevronRight, Archive } from "react-feather"
import { connect } from "react-redux"
import Select from 'react-select'
import { history } from "../../../history"
import { Root } from "../../../authServices/rootconfig"
import { getAllAgent, getProviderData, sendProviderData, getProviderAgentData } from "../../../redux/actions/agent/agent-provider"
import { updateJackpotInfo } from "../../../redux/actions/jackpot/index"
import { pagenation_set, selectedStyle } from "../../../configs/providerconfig"

const CustomHeader = props => {
    let state = props.me.state.condition
    return (
        <div >
            <Row>
                <Col md="3" xs='12' className='mt-1'>
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
                <Col md='3' sm='6' xs='12'>
                    <FormGroup className="mb-0">
                        <Label>Username</Label>
                        <Input type="text" placeholder="Enter UserName" value={state.username ? state.username : ""} onChange={e => props.handleFilter(e.target.value, "username")} />
                    </FormGroup>
                </Col>
                <Col md='3' sm='6' xs='12'>
                    <FormGroup className="mb-0">
                        <Label for="basicInput">Email</Label>
                        <Input type="text" placeholder="Enter Email" value={state.email ? state.email : ""} onChange={e => props.handleFilter(e.target.value, "email")} />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

class AgentProviderChild extends Component {

    static getDerivedStateFromProps(props) {
        return {
            data: props.dataList.data,
            totalPages: props.dataList.totalPages,
            totalRecords: props.dataList.totalRecords,
            sortIndex: props.dataList.sortIndex,
            providerData: props.dataList.providerData
        }
    }

    state = {
        currentData: {},
        selectedData: [],
        currentProviderData: [],
        providerData: [],

        data: [],
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [],

        condition: {},
        providerModal: false,

        columns: [
            {
                name: "Actions",
                minWidth: "50px",
                cell: row => (
                    <Archive className="cursor-pointer" size={20} onClick={() => this.setCurrentRow(row)} />
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
                minWidth: "50px",
                cell: row => (
                    <>
                        {row.avatar !== "" ? <img className="avatar" src={Root.imageurl + row.avatar} alt="" /> : ""}
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
                name: "Parent Name",
                selector: "parent",
                sortable: true,
                minWidth: "150px"
            },
            {
                name: "Permission",
                selector: "permission",
                sortable: true,
                minWidth: "150px"
            }
        ]
    }

    componentDidMount() {
        this.props.getAllAgent(this.props.parsedFilter, {})
        this.props.getProviderData()
    }

    componentDidUpdate(prevProps) {
        if(this.props.dataList.currentProviderData !== prevProps.dataList.currentProviderData) {
            let providerData = this.state.providerData
            let currentProviderData = this.props.dataList.currentProviderData
            let newData = [];
            for (let key in currentProviderData) {
                let tempIndex = providerData.findIndex(item => item.value === key);
                newData.push(providerData[tempIndex])
            }
            this.setState({ currentProviderData: newData })
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

    setCurrentRow = async (currentData) => {
        // if (currentData._id !== this.props.userinfo._id) {
            await this.props.getProviderAgentData({ id: currentData._id })
            this.setState({ currentData, providerModal: true })
        // }
    }

    ExpireProviderData = () => {
        this.setState({ currentData: {}, providerModal: false })
    }

    ProviderManageSubmit = (e) => {
        e.preventDefault()
        let selectedData = this.state.selectedData
        let data = {}
        for(let i = 0 ; i < selectedData.length ; i ++) {
            data[selectedData[i].value] = true;
        }
        let sendData = {
            id: this.state.currentData._id,
            data
        }
        this.props.sendProviderData(sendData);
        this.ExpireProviderData();
    }

    render() {
        let { providerModal, columns, data, totalPages, totalRecords, sortIndex, providerData, currentProviderData } = this.state
        return (
            <>
                <Modal isOpen={providerModal} toggle={this.ExpireProviderData} className="modal-dialog-centered" size="lg" >
                    <Form action="#" onSubmit={this.ProviderManageSubmit}>
                        <ModalHeader toggle={this.ExpireProviderData} className="bg-primary">Provider Manage</ModalHeader>
                        <ModalBody className="modal-dialog-centered d-block">
                            <Select
                                defaultValue={currentProviderData}
                                isMulti
                                name="colors"
                                options={providerData}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(e) => this.setState({ selectedData: e })}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit"> Accept </Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                <div className="data-list">
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
                                me={this}
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
        dataList: state.agent.provider,
        userinfo: state.auth.userData
    }
}

export default connect(mapStateToProps, {
    getAllAgent,
    updateJackpotInfo,
    getProviderData,
    sendProviderData,
    getProviderAgentData
})(AgentProviderChild)