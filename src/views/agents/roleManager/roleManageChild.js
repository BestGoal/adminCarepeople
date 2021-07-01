import React, { Component } from "react"
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form } from "reactstrap"
import DataTable from "react-data-table-component"
import Select from "react-select"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { ChevronDown, ChevronLeft, ChevronRight, Trash, Edit } from "react-feather"
import { connect } from "react-redux"
import { addNewpermission, getAllpermission, updatePermission, deletePermission } from "../../../redux/actions/agent/role"
import { selectedStyle, pagenation_set } from "../../../configs/providerconfig"
import { toast } from "react-toastify"

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.rowEdit(props.row)} />
      <Trash className="cursor-pointer mr-1" size={20} onClick={() => props.rowDelete(props.row, props.parsedFilter)} />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <Row className="p-1">
      <Col xs="6" md="3">
        <UncontrolledDropdown className="data-list-rows-dropdown">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {`${props.index[0]} - ${props.index[1]} of ${props.total}`}
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
      {/* <Col xs="6" md="9" className="mt-1 text-right">
        <Button.Ripple color="success" onClick={() => props.handleSidebar()} >
          <Plus size={15} />
          <span className="">Add New</span>
        </Button.Ripple>
      </Col> */}
    </Row>
  )
}

class RoleManageChild extends Component {

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
    totalRecords: 0,
    totalPages: 0,
    sortIndex: [],
    allPermissionList: [],
    saveData: {
      pid: "1",
      name: ""
    },
    update: false,
    modal: false,
    columns: [
      {
        name: "id",
        selector: "row",
        sortable: false,
        minWidth: "50px",
        cell: (row, index) => (
          <div>{index + 1}</div>
        )
      },
      {
        name: "pid",
        selector: "pid",
        sortable: false,
        minWidth: "100px",
      },
      {
        name: "name",
        selector: "name",
        sortable: false,
        minWidth: "100px",
      },
      {
        name: "Actions",
        minWidth: "50",
        sortable: false,
        cell: row => (
          <ActionsComponent
            me={this}
            row={row}
            parsedFilter={this.props.parsedFilter}
            rowEdit={this.rowEdit}
            rowDelete={this.props.deletePermission}
          />
        )
      },
    ]
  }

  componentDidMount() {
    this.props.getAllpermission(this.props.parsedFilter);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataList !== this.props.dataList) {
      let allPermissionData = this.props.dataList.data;
      let newData = [];
      let saveData = this.state.saveData;
      for (let i = 0; i < allPermissionData.length; i++) {
        let temp = {
          label: allPermissionData[i].name,
          value: allPermissionData[i]._id
        }
        newData.push(temp);
      }
      if (this.state.allPermissionList !== newData) {
        if (newData && newData.length) {
          saveData.pid = newData[0].value;
        }
        this.setState({ allPermissionList: newData });
      }
    }
  }

  toggleModal = () => {
    let saveData = this.state.saveData;
    let allPermissionList = this.state.allPermissionList;
    saveData = {
      name: "",
      pid: allPermissionList && allPermissionList.length ? allPermissionList[0].value : "1"
    }
    this.setState({ modal: !this.state.modal, update: false, saveData });
  }

  updatePermssionData(key, value) {
    let { saveData } = this.state;
    saveData[key] = value;
    this.setState({ saveData });
  }

  rowEdit(row) {
    this.setState({
      modal: true,
      update: true,
      saveData: {
        name: row.name,
        _id: row._id,
        pid: row.pid
      },
    });
  }

  handleRowsPerPage = value => {
    let { parsedFilter } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
    this.props.getAllpermission({ page, perPage: value });
  }

  handlePagination = page => {
    let { parsedFilter } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
    let urlPrefix = history.location.pathname
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
    this.props.getAllpermission({ page: page.selected + 1, perPage });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { update, saveData } = this.state;
    const { addNewpermission, updatePermission, parsedFilter } = this.props;
    if (!saveData.name) {
      toast.error("please input correct name.");
      return;
    }
    if (!update) {
      addNewpermission(saveData, parsedFilter);
    } else {
      updatePermission(saveData, parsedFilter);
    }
    this.setState({ modal: false, update: false, saveData: { name: "", pid: "1" } });
  }

  render() {
    let { saveData, update, allPermissionList, columns, data, totalPages, totalRecords, sortIndex, modal } = this.state;
    return (
      <div id="admindata_table" className={`data-list list-view`}>
        <Modal isOpen={modal} toggle={this.toggleModal} className="modal-dialog-centered"   >
          <Form onSubmit={this.handleSubmit} >
            <ModalHeader toggle={this.toggleModal} className="bg-primary">
              {update ? "Update Permission" : "Create New Permission"}
            </ModalHeader>
            <ModalBody className="modal-dialog-centered  mt-1 d-block">
              <Col md="12">
                <FormGroup>
                  <Label for="country">All Permissions</Label>
                  <Select
                    className="React"
                    classNamePrefix="select"
                    options={allPermissionList}
                    value={allPermissionList.find(obj => obj.value === saveData.pid)}
                    defaultValue={allPermissionList[0]}
                    onChange={e => this.updatePermssionData('pid', e.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <Label>Permission Name</Label>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={saveData.name}
                    onChange={e => this.updatePermssionData('name', e.target.value)}
                    required
                  />
                  <div className="form-control-position" >
                    <Edit size={15} />
                  </div>
                </FormGroup>
              </Col>
            </ModalBody>
            <ModalFooter>
              <Col md="12" className="text-right">
                <Button color="primary" type="submit">{update ? "Update" : "Accept"}</Button>
              </Col>
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
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          rowindex
          noHeader
          subHeader
          responsive
          pointerOnHover
          selectableRowsHighlight
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              index={sortIndex}
              total={totalRecords}
              handleRowsPerPage={this.handleRowsPerPage}
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
    dataList: state.agent.permission
  }
}

export default connect(mapStateToProps, {
  getAllpermission,
  addNewpermission,
  updatePermission,
  deletePermission
})(RoleManageChild)