import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import BonusChild from "./bonusChild.js";
import queryString from "query-string"

class GameProvider extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Config" breadCrumbParent="Bonus Manage" />
        <Row>
          <Col sm="12">
            <BonusChild parsedFilter={queryString.parse(this.props.location.search)} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default GameProvider