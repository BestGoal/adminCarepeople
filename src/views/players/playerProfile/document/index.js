import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label, Input, FormGroup,Form,Button,Col,Row,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap"
import Select from "react-select"
import { ChevronDown, Link } from "react-feather";
import { status_options, selectedStyle } from "../../../../configs/providerconfig"
import { getKYCData, profile_update } from "../../../../redux/actions/players/index";
import DataTable from "react-data-table-component";
import { Root } from "../../../../authServices/rootconfig";

export class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: {
                _id: "",
                playernote: "",
                status: "",
                kyc_status: "",
                kyc_data: []
            },
            columns: [
                {
                  name: "id",
                  selector: "pid",
                  sortable: true,
                  minWidth: "100px",
                  cell: (row, index) => (
                    <div>
                      {Root.prefix}{index+1}
                    </div>
                  )
                },
                {
                    name: "Name",
                    selector: "kyc_name",
                    sortable: true,
                    minWidth: "150px",
                  },
                {
                  name: "Image",
                  selector: "kyc_image_url",
                  sortable: true,
                  minWidth: "100px",
                  cell: row =>(
                    <>
                      {row.avatar !== "" ? <img style={{width:"50px",height:"50px",backgroundSize:"100% 100%"}} src={Root.imageurl + row.kyc_image_url} alt="" />: ""}
                    </>  
                  )
                },
                {
                  name: "Upload Date",
                  selector: "kyc_date",
                  sortable: true,
                  minWidth: "150px",
                }
            ],
            modal:false,
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        if(prevProps.profile !== this.props.profile){
            this.setState({ userData: this.props.profile.data });
        }
    }

    changeUserData(key, value){
        let userData = this.state.userData;
        userData[key] = value;
        this.setState({ userData })
    }
  
    handleSubmit = () =>{
        let userData = this.state.userData;
        let sendData = {
            _id: userData._id,
            playernote: userData.playernote,
            status: userData.status,
            kyc_status: userData.kyc_status,
        }
        this.props.profile_update(sendData);
    }

    toggleModal(key){
        this.setState({modal: key})
    }

    render() {
        let userData = this.state.userData;
        return (
            <>
                <Form>
                    <Row className = "mt-2">
                        <Col sm="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="textarea"
                                    placeholder="Player Note"
                                    value={userData.playernote}
                                    onChange={e => this.changeUserData( 'playernote', e.target.value )}
                                    style={{height:"200px"}}
                                />
                                <div className="form-control-position" >
                                    <Link size={15} />
                                </div>
                                <Label>Player Note</Label>
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label>Player Status</Label>
                                <Select
                                    className="React"
                                    classNamePrefix="select"
                                    options={status_options}
                                    value={status_options.find(obj => obj.value === userData.status)}
                                    onChange={e => this.changeUserData( 'status', e.value )}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label>Player KYC Status</Label>
                                <Select
                                    className="React"
                                    classNamePrefix="select"
                                    options={status_options}
                                    value={status_options.find(obj => obj.value === userData.kyc_status)}
                                    onChange={e => this.changeUserData( 'kyc_status', e.value )}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col style = {{justifyContent: "flex-end", display: "flex"}}>
                        <Button color="primary" onClick = {()=>this.toggleModal(true)}> Add KYC Data </Button>
                        <Button className = "ml-1" color="primary" onClick = {() => this.handleSubmit()}> Submit </Button>
                    </Col>
                </Row>
                <div id="admindata_table" className={`data-list list-view`}>
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.userData.kyc_data}
                        pagination
                        paginationServer
                        noHeader
                        subHeader
                        responsive
                        pointerOnHover
                        selectableRowsHighlight
                        onSelectedRowsChange={data => this.setState({ selectedRows: data.selectedRows }) }
                        customStyles={selectedStyle}
                        sortIcon={<ChevronDown />}
                    />
                </div>
                
                <Modal isOpen={this.state.modal} toggle={()=>this.toggleModal(false)} className="modal-dialog-centered">
                    <ModalHeader toggle={()=>this.toggleModal(false)} className="bg-primary">
                        {"Image Cropper"}
                    </ModalHeader>
                    <ModalBody className="mt-1 p-3" style={{position: "relative", height: 280}}>
                        {/* <ImageCropper image={userImage} cropdata={this.state.cropdata} imageHandler={(url, img) => this.cropImageChange(url, img)} /> */}
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col xs="12 justify-content-start">
                                <input 
                                    id="cropper-image"
                                    type="file"
                                    style = {{display: "none"}}
                                    onChange = {e => this.ChooseImage(e)}
                                />
                                {/* <Button.Ripple color="success" className="mr-1" onClick={()=>document.getElementById("cropper-image").click()} > Upload </Button.Ripple>
                                <Button.Ripple color="success" className="mr-1" onClick={()=>this.finishCropper()} > Save </Button.Ripple>
                                <Button className="ml-1" color="danger" outline onClick={()=>this.toggleModal(false)}> Cancel </Button> */}
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.Players.profile,
})

const mapDispatchToProps = {
    getKYCData,
    profile_update
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
