import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AgentLoginReport from "./agentLoginReport"
import queryString from "query-string"

class AllAgent extends React.Component{
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Agent" breadCrumbParent="Login Report" />
        <Row>
          <Col sm="12">
            <AgentLoginReport parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AllAgent