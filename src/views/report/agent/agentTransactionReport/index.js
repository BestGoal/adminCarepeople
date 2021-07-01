import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AgentTransactionReport from "./agentTransactionReport"
import queryString from "query-string"

class AllAgent extends React.Component{
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs parsedFilter={queryString.parse(this.props)} breadCrumbTitle="Agent" breadCrumbParent="Transaction Report" />
        <Row>
          <Col sm="12">
            <AgentTransactionReport parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AllAgent