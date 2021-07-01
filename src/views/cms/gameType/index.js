import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import GameTypesManager from "./gameTypesManager.js";
import queryString from "query-string"

class GameTypes extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="CMS" breadCrumbParent="Game Types" />
        <Row>
          <Col sm="12">
            <GameTypesManager parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default GameTypes