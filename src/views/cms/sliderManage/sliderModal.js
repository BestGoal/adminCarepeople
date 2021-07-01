import React from 'react';
import {CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, FormGroup, Input, Label } from "reactstrap";
import Toggle from "react-toggle"
import { Root } from "../../../authServices/rootconfig";

class SliderModal extends React.Component {
    
    state = {
        editdata: {
            text: "",
            gameid: "",
            status: true
        },
        imageSrc: "",
        blob: null
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.editdata !== prevState.editdata && this.props.editdata._id) {
            this.setState({ editdata: this.props.editdata, imageSrc: Root.imageurl + this.props.editdata.image})
        }
    }

    onChange = (data,bool) => {
        this.setState({ editdata: {...this.state.editdata,[bool]:data} });
    }

    onFileChange = async( e )=> {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await this.readFile(file)
            this.setState({imageSrc: imageDataUrl, blob: file })
        }
    }
    
    readFile = (file)=> {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    cropfileupload = () => {
        this.props.changeModalKey(false)
        this.props.updateSliderItem(this.state.blob, this.state.editdata);
        this.setState({
            editdata: {
                gameid: "",
                image: "",
                order: "",
                status: true,
                text: "",
                type: "",
                _id: "",
            },
            imageSrc: "",
            blob: null
        })
    }

    closeModal() {
        this.setState({
            editdata: {
                gameid: "",
                image: "",
                order: "",
                status: true,
                text: "",
                type: "",
                _id: "",
            },
            imageSrc: "",
            blob: null
        })
        this.props.changeModalKey(false)
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={() => this.closeModal()} className={`modal-dialog-centered modal-${this.props.size}`} fade={true} >
                <ModalHeader toggle={() => this.closeModal()}>
                    Slider Upload
                </ModalHeader>
                <ModalBody>
                    <Col md="12"  className="text-center">
                        <CustomInput type="file" label="image select" id="fp_imgupload_logoimgssss" accept="image/*" onChange={this.onFileChange} name="fp_imgupload_logoimgssss" />
                    </Col>
                    <Col md="12" className="text-center mt-1">
                        {
                            this.state.imageSrc && <img src={this.state.imageSrc} style={{width:"100%", height:this.props.cropSize.height }} alt="Cropped" />
                        } 
                    </Col>
                    <Col md="12" className="mt-2">
                        <FormGroup >
                        <Label>Slider Text</Label>
                        <Input type="text"  placeholder="Slider Text" value={this.state.editdata.text} onChange={e => this.onChange(e.target.value,"text")}
                            required />
                        </FormGroup>
                    </Col>
                    <Col md="12" >
                        <FormGroup>
                        <Label>Game Item Link: Enter Game ID</Label>
                        <Input type="text" placeholder="Game Item Link" value={this.state.editdata.gameid}onChange={e => this.onChange(e.target.value,"gameid")} required />
                        </FormGroup>
                    </Col>
                    <Col md="6" sm="12" className="mt-0">
                        <Label>STATUS</Label>
                        <label className="react-toggle-wrapper">
                            <Toggle checked={this.state.editdata.status} onChange={ () => this.onChange(!this.state.editdata.status, 'status' )} name="controlledSwitch" value="yes" />
                            <Button.Ripple color="primary" onClick={ () => this.onChange(!this.state.editdata.status, 'status' )} size="sm" >
                                {this.state.editdata.status ? "Enable": "Disable"}
                            </Button.Ripple>
                        </label>
                        </Col>
                </ModalBody>
                <ModalFooter className="text-center justify-content-center">
                    <Button color="primary" onClick={()=>this.cropfileupload()}>{this.props.editdata._id ? "Update": "Add"}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default SliderModal;