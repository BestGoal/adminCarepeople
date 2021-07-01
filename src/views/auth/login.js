import React from "react"
import { Input, FormGroup, Col, Row } from "reactstrap"
import { Check, Mail, Unlock } from "react-feather"
import { connect } from "react-redux"
import { loginWithJWT } from "../../redux/actions/auth/loginActions"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../assets/scss/pages/authentication.scss"

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false
  }

  componentDidMount() {
    if (localStorage.getItem('remember')) {
      let users = localStorage.getItem("remember");
      users = JSON.parse(users);
      this.setState({ email: users.email, password: users.password })
    }
  }

  handleRemember = e => {
    this.setState({
      remember: e.target.checked
    })
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.remember) {
      let remember = {
        password: this.state.password,
        email: this.state.email
      }
      localStorage.setItem("remember", JSON.stringify(remember))
    }
    this.props.loginWithJWT(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <div className="login-container" id="container">
          <div className="form-container sign-in-container">
            <form action="/" onSubmit={this.handleLogin}>
              <h1 className="mb-1" style={{ color: "#757575" }}>Sign in</h1>
              <Row>
                <Col md="12">
                  <FormGroup className="position-relative has-icon-left">
                    <Input
                      type="text"
                      placeholder="Email/Username"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                      required
                    />
                    <div className="form-control-position">
                      <Mail size={15} />
                    </div>
                  </FormGroup>
                  <FormGroup className="position-relative has-icon-left">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                      required
                    />
                    <div className="form-control-position">
                      <Unlock size={15} />
                    </div>
                  </FormGroup>
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label="Remember me"
                    defaultChecked={false}
                    onChange={this.handleRemember}
                    className="float-left w-100 mb-1"
                  />
                  <button type="submit">Sign In</button>
                </Col>
              </Row>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="mb-1" style={{ color: "#000" }}>Welcome Back!</h1>
                <p style={{ color: "#fff" }}>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(null, { loginWithJWT })(Login)