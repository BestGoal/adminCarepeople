import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import GameChild from "./gameChild.js";
import queryString from "query-string"

class GameProvider extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="CMS" breadCrumbParent="Game Manager" />
        <Row>
          <Col sm="12">
            <GameChild parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default GameProvider