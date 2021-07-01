import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label, Input, FormGroup,Form,Button,Col,Row} from "reactstrap"
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import { currency, countryList, gender } from "../../../../configs/providerconfig"
import { profile_update } from "../../../../redux/actions/players/index";

export class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: {
                _id: "",
                username: "",
                firstname: "",
                lastname: "",
                gender: "",
                country_birth: "",
                city_birth: "",
                birthday: "",
                company: "",
                currency: "",
                address_1: "",
                city: "",
                postcode: "",
                state: "",
                country: "",
                phone: "",
                email: "",
                balance: {
                    nickname: "",
                }
            },
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
  
    handleSubmit = e =>{
        e.preventDefault();
        let userData = this.state.userData;
        let sendData = {
            _id: userData._id,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            gender: userData.gender,
            country_birth: userData.country_birth,
            city_birth: userData.city_birth,
            birthday: userData.birthday,
            company: userData.company,
            currency: userData.currency,
            address_1: userData.address_1,
            city: userData.city,
            postcode: userData.postcode,
            state: userData.state,
            country: userData.country,
            phone: userData.phone,
            email: userData.email,
        }
        this.props.profile_update(sendData);
    }

    render() {
        let userData = this.state.userData;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm="3">
                        <FormGroup>
                            <Label>User Name *</Label>
                            <Input
                                type="text" 
                                placeholder="User Name"
                                onChange={e=>this.changeUserData('username', e.target.value)}
                                value = {userData.username}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Nick Name *</Label>
                            <Input
                                type="text" 
                                placeholder="Nick Name"
                                value = {userData.balance.nickname || ""}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input 
                                type="text" 
                                placeholder="First Name"
                                value = {userData.firstname}
                                required = {true}
                                onChange={e=>this.changeUserData('firstname', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input 
                                type="text" 
                                placeholder="First Name"
                                value = {userData.lastname}
                                required = {true}
                                onChange={e=>this.changeUserData('lastname', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Gender</Label>
                            <Select
                                className="React"
                                classNamePrefix="select"
                                options={gender}
                                value={gender.find(obj => obj.value === userData.gender)}
                                onChange={e => this.changeUserData( 'gender', e.value )}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Country Birth</Label>
                            <FormGroup>
                                <Select
                                    className="React"
                                    classNamePrefix="select"
                                    options={countryList}
                                    value={countryList.find(obj => obj.value === userData.country_birth)}
                                    onChange={e => this.changeUserData('country_birth', e.value)}
                                />
                            </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label for="address">City of Birth</Label>
                            <Input 
                                type="text" 
                                placeholder="Address"
                                value = {userData.country_birth}
                                onChange={e=>this.changeUserData('city_birth', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Birthday</Label>
                            <Flatpickr
                                className="form-control"
                                value={userData.birthday}
                                onChange={date => {
                                    this.changeUserData( 'birthday', date.toLocaleString() );
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Company</Label>
                            <Input 
                                type="text" 
                                placeholder="Company"
                                value = {userData.company}
                                onChange={e=>this.changeUserData('company', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label for="currency">Currency *</Label>
                            <Select
                                className="React"
                                classNamePrefix="select"
                                options={currency}
                                value={currency.find(obj => obj.value === userData.currency)}
                                onChange={e => this.changeUserData( 'currency', e.value )}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Address Line(1)</Label>
                            <Input 
                                type="text" 
                                placeholder="Address Line(1)"
                                onChange={e=>this.changeUserData('address_1', e.target.value)}
                                value = {userData.address_1}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>City</Label>
                            <Input 
                                type="text" 
                                placeholder="City"
                                onChange={e=>this.changeUserData('city', e.target.value)}
                                value = {userData.city}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Postal code</Label>
                            <Input 
                                type="number" 
                                placeholder="Post Code"
                                onChange={e=>this.changeUserData('postcode', e.target.value)}
                                value = {userData.postcode || ""}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>State</Label>
                            <Input 
                                type="text" 
                                placeholder="State"
                                onChange={e=>this.changeUserData('state', e.target.value)}
                                value = {userData.state}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Country</Label>
                            <Select
                                className="React"
                                classNamePrefix="select"
                                options={countryList}
                                value={countryList.find(obj => obj.value === userData.country)}
                                onChange={e => this.changeUserData( 'country', e.value )}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Mobile Phone</Label>
                            <Input 
                                type="number" 
                                placeholder="Mobile"
                                value = {userData.phone || ""}
                                onChange={e=>this.changeUserData('phone', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <FormGroup>
                            <Label>Email</Label>
                            <Input 
                                type="email" 
                                placeholder="Email"
                                value = {userData.email}
                                onChange={e=>this.changeUserData('email', e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col style = {{justifyContent: "flex-end", display: "flex"}}>
                        <Button color="primary" type="submit"> Update </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.Players.profile,
})

const mapDispatchToProps = {
    profile_update
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
