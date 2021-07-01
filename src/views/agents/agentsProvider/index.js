import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import queryString from "query-string"
import AgentProviderChild from "./agentProviderChild"

class AgentProvider extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs breadCrumbTitle="Agents" breadCrumbParent="Agent Provider" />
                <Row>
                    <Col sm="12">
                        <AgentProviderChild parsedFilter={queryString.parse(this.props.location.search)} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default AgentProvider