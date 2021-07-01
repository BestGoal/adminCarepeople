import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AllAgentChild from "./allAgentChild"
import queryString from "query-string"

class AllAgent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Agents" breadCrumbParent="Agent List" />
				<Row>
					<Col sm="12">
						<AllAgentChild parsedFilter={queryString.parse(this.props.location.search)} />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default AllAgent