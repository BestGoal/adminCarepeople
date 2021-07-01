import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import RoleManageChild from "./roleManageChild"
import queryString from "query-string"

class RoleManager extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Agents"
          breadCrumbParent="Role Manager"
        />
        <Row>
          <Col sm="12">
            <RoleManageChild parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default RoleManager
