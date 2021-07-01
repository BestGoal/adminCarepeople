import React from "react"
import { Col, Input, Button, Card, CardBody, FormGroup, Form } from "reactstrap"
import { connect } from "react-redux"
import { changepassword } from "../../redux/actions/auth/loginActions"
import { Lock, Settings } from "react-feather"
import { toast } from "react-toastify"

class ChangePassword extends React.Component {

    state = {
        current_pass: "",
        new_pass: "",
        confirm_pass: "",
        cisValid: null,
        nisValid: null,
        fisValid: null
    }

    save_password = (e) => {
        e.preventDefault()
        if (this.state.current_pass.length > 0) {
            this.setState({ cisValid: true });
        } else if (this.state.current_pass.length === 0) {
            this.setState({ cisValid: false });
            toast.error("Please input current password");
            return;
        }

        if (this.state.new_pass.length > 0) {
            this.setState({ nisValid: true })
        } else if (this.state.new_pass.length === 0) {
            this.setState({ nisValid: false })
            toast.error("Please input new password");
            return;
        }
        if (this.state.confirm_pass.length > 0) {
            this.setState({ fisValid: true })
        } else if (this.state.confirm_pass.length === 0) {
            this.setState({ fisValid: false })
            toast.error("Please input confirm password");
            return;
        }

        if (this.state.confirm_pass !== this.state.new_pass) {
            this.setState({ nisValid: false })
            this.setState({ fisValid: false })
            toast.error("Please input confirm password to correct.");
        } else {
            let user = {
                password: this.state.new_pass
            }
            this.props.changepassword(user);
            this.setState({ new_pass: "", current_pass: "", confirm_pass: "" });
        }
    }

    reset() {
        this.setState({ new_pass: "", current_pass: "", confirm_pass: "" });
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.save_password} >
                    <Card>
                        <CardBody className="pt-1" style={{ color: "white" }}>
                            <Col lg="12" md="12" xs="12" style={{ padding: "4vw" }}>
                                <h2 style={{ color: "#00cfe8", textAlign: "center", marginBottom: "3vw" }}> Change Password</h2>
                                <FormGroup className="has-icon-left form-label-group position-relative">
                                    <Input
                                        type="password"
                                        placeholder="CurrentPassword"
                                        required
                                        valid={this.state.cisValid === true}
                                        invalid={this.state.cisValid === false}
                                        value={this.state.current_pass}
                                        onChange={e => this.setState({ current_pass: e.target.value })}
                                    />
                                    <div className="form-control-position">
                                        <Lock size={15} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="has-icon-left form-label-group position-relative">
                                    <Input
                                        type="password"
                                        placeholder="newPassword"
                                        valid={this.state.nisValid === true}
                                        invalid={this.state.nisValid === false}
                                        required
                                        value={this.state.new_pass}
                                        onChange={e => this.setState({ new_pass: e.target.value })}
                                    />
                                    <div className="form-control-position">
                                        <Settings size={15} />
                                    </div>
                                </FormGroup>
                                <FormGroup className="has-icon-left form-label-group position-relative">
                                    <Input
                                        type="password"
                                        placeholder="confirmPassword"
                                        required
                                        valid={this.state.fisValid === true}
                                        invalid={this.state.fisValid === false}
                                        value={this.state.confirm_pass}
                                        onChange={e => this.setState({ confirm_pass: e.target.value })}
                                    />
                                    <div className="form-control-position">
                                        <Settings size={15} />
                                    </div>
                                </FormGroup>
                                <Button.Ripple color="success" type="submit" className="mr-1"> Save </Button.Ripple>
                                <Button.Ripple color="danger" onClick={this.reset} > Reset </Button.Ripple>
                            </Col>
                        </CardBody>
                    </Card>
                </Form>
            </React.Fragment>
        )
    }
}

export default connect(null, { changepassword })(ChangePassword)