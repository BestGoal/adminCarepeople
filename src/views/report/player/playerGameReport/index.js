import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import PlayerGameReport from "./playerGameReportChild"
import queryString from "query-string"

class AllAgent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Player" breadCrumbParent="Game Report" />
				<Row>
					<Col sm="12">
						<PlayerGameReport parsedFilter={queryString.parse(this.props.location.search)} />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default AllAgent