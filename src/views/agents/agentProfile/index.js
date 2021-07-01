import React from "react"
import { Col, Input, Button, Card, CardBody, FormGroup, Form, Row, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap"
import { connect } from "react-redux"
import Select from "react-select"
import { status_options, gender, countryList, currency } from "../../../configs/providerconfig"
import { getProfileInfo, agentProfileUpdate } from "../../../redux/actions/agent/profile"
import ImageCropper from "../../ui-elements/imageCropper/index";
import { Root } from "../../../authServices/rootconfig";
import { history } from "../../../history"

class AgentProfile extends React.Component {

    state = {
        show: false,

        userImage: null,
        avatarImage: null,
        cropImage: null,
        croperImageUrl: "",

        userId: "",
        cropdata: {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            cropShape: 'round',
            cropSize: {
                width: 280,
                height: 280
            }
        },

        userData: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            country: countryList[0].value,
            currency: currency[0].value,
            gender: gender[0].value,
            status: status_options[1].value,
            permission: { name: "" },
            company: "",
            address_1: "",
            address_2: "",
            city: "",
            postcode: "",
            state: "",
            phone: "",
            fax: "",
            website: ""
        },
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.id) {
            this.setState({ userId: this.props.location.state.id })
            this.props.getProfileInfo(this.props.location.state.id)
        } else {
            history.goBack();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let userData = this.props.currentProfile;
            let userImage = userData.avatar ? userData.avatar : "";
            if (userData !== this.state.userData) {
                this.setState({ userData });
            }
            if (userImage !== this.state.userImage) {
                this.setState({ userImage: Root.imageurl + userImage, avatarImage: Root.imageurl + userImage });
            }
        }
    }

    toggleModal(show) {
        this.setState({ show })
    }

    ChooseImage(e) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ userImage: fileReader.result, cropImage: fileReader.result });
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    cropImageChange(url, cropImage) {
        this.setState({ croperImageUrl: url, cropImage })
    }

    finishCropper() {
        this.toggleModal(false);
        this.setState({ avatarImage: this.state.croperImageUrl, userImage: this.state.croperImageUrl });
    }

    updateUserData(key, value) {
        let userData = this.state.userData;
        userData[key] = value;
        this.setState({ userData });
    }

    saveProfile = (e) => {
        e.preventDefault();
        const fpdata = new FormData();
        let userData = this.state.userData;
        if (this.state.cropImage) {
            fpdata.append('avatarImageFile', this.state.cropImage);
        }
        let sendData = {
            _id: userData._id,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            country: userData.country,
            currency: userData.currency,
            gender: userData.gender,
            status: userData.status,
            company: userData.company,
            address_1: userData.address_1,
            address_2: userData.address_2,
            city: userData.city,
            postcode: userData.postcode,
            state: userData.state,
            phone: userData.phone,
            fax: userData.fax,
            website: userData.website,
            cropImage: null
        }
        fpdata.append('data', JSON.stringify(sendData));
        this.props.agentProfileUpdate(fpdata, this.state.userId);
    }

    render() {
        let { show, userImage, avatarImage, userData } = this.state;
        return (
            <React.Fragment>
                <Form onSubmit={this.saveProfile} >
                    <Card>
                        <CardBody className="pt-1">
                            <h2 className="mt-3" style={{ color: "#00cfe8", textAlign: "center" }}> {`${userData.username}'s Profile Info`}</h2>
                            <Row className="mt-3">
                                <Col md={3} sm={12}>
                                    <Row>
                                        <Col md="12">
                                            <img
                                                src={avatarImage}
                                                style={{ width: "100%", cursor: "pointer", borderRadius: "50%" }}
                                                onClick={() => this.toggleModal(true)}
                                                alt=""
                                            />
                                        </Col>
                                        <Col md="12" className="mt-2" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                                            <Button.Ripple color="success" className="mr-1" onClick={() => this.toggleModal(true)}> Change Avatar </Button.Ripple>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={9} sm={12}>
                                    <Row>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>User Name *</Label>
                                                <Input
                                                    placeholder="User Name"
                                                    onChange={e => this.updateUserData("username", e.target.value)}
                                                    value={userData.username || ""}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>First Name*</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={userData.firstname || ""} 
                                                    onChange={e => this.updateUserData('firstname', e.target.value)}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Last Name*</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={userData.lastname || ""}
                                                    onChange={e => this.updateUserData('lastname', e.target.value)}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Email *</Label>
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={userData.email || ""}
                                                    onChange={e => this.updateUserData('email', e.target.value)}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Country</Label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    options={countryList}
                                                    value={countryList.find(obj => obj.value === userData.country)}
                                                    defaultValue={countryList[0]}
                                                    onChange={e => this.updateUserData('country', e.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Currency</Label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    options={currency}
                                                    value={currency.find(obj => obj.value === userData.currency)}
                                                    defaultValue={currency[0]}
                                                    onChange={e => this.updateUserData('currency', e.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>gender</Label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    options={gender}
                                                    value={gender.find(obj => obj.value === userData.gender)}
                                                    defaultValue={gender[0]}
                                                    onChange={e => this.updateUserData('gender', e.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Status</Label>
                                                <Select
                                                    className="React"
                                                    classNamePrefix="select"
                                                    options={status_options}
                                                    value={status_options.find(obj => obj.value === userData.status)}
                                                    defaultValue={status_options[0]}
                                                    onChange={e => this.updateUserData('status', e.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Permission</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Permission"
                                                    value={userData.permission ? userData.permission.name : ""}
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Company</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    onChange={e => this.updateUserData('company', e.target.value)}
                                                    value={userData.company || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Address (line 1)</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Address (line 1)"
                                                    onChange={e => this.updateUserData('address_1', e.target.value)}
                                                    value={userData.address_1 || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Address (line 2)</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Address (line 2)"
                                                    onChange={e => this.updateUserData('address_2', e.target.value)}
                                                    value={userData.address_2 || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>City</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="City"
                                                    onChange={e => this.updateUserData('city', e.target.value)}
                                                    value={userData.city || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Postal Code</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="PostCode"
                                                    onChange={e => this.updateUserData('postcode', e.target.value)}
                                                    value={userData.postcode || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>State</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="State"
                                                    onChange={e => this.updateUserData('state', e.target.value)}
                                                    value={userData.state || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Phone</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="Phone Number"
                                                    onChange={e => this.updateUserData('phone', e.target.value)}
                                                    value={userData.phone || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Fax</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="Fax Number"
                                                    onChange={e => this.updateUserData('fax', e.target.value)}
                                                    value={userData.fax || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4" sm="6">
                                            <FormGroup>
                                                <Label>Website</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Website Url"
                                                    onChange={e => this.updateUserData('website', e.target.value)}
                                                    value={userData.website || ""}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12} className="p-2 d-flex justify-content-end">
                                    <Button.Ripple color="success" type="submit" className="mr-1"> Save </Button.Ripple>
                                    <Button.Ripple color="danger" onClick={() => history.goBack()} > Back </Button.Ripple>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>

                <Modal isOpen={show} toggle={() => this.toggleModal(false)} className="modal-dialog-centered">
                    <ModalHeader toggle={() => this.toggleModal(false)} className="bg-primary">
                        {"Image Cropper"}
                    </ModalHeader>
                    <ModalBody className="mt-1 p-3" style={{ position: "relative", height: 280 }} >
                        <ImageCropper image={userImage} cropdata={this.state.cropdata} imageHandler={(url, img) => this.cropImageChange(url, img)} />
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col xs="12 justify-content-start">
                                <input
                                    id="cropper-image"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={e => this.ChooseImage(e)}
                                />
                                <Button.Ripple color="success" className="mr-1" onClick={() => document.getElementById("cropper-image").click()} > Upload </Button.Ripple>
                                <Button.Ripple color="success" className="mr-1" onClick={() => this.finishCropper()} > Save </Button.Ripple>
                                <Button className="ml-1" color="danger" outline onClick={() => this.toggleModal(false)}> Cancel </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const getPropsDatatoState = (state) => {
    return {
        currentProfile: state.agent.profile.profileData,
    }
}

export default connect(getPropsDatatoState, {
    getProfileInfo,
    agentProfileUpdate
})(AgentProfile)