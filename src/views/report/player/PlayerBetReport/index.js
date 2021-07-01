import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import PlayerBetHistory from "./playerBetReportChild"
import queryString from "query-string"

class AllAgent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Player" breadCrumbParent="Bet Report" />
				<Row>
					<Col sm="12">
						<PlayerBetHistory parsedFilter={queryString.parse(this.props.location.search)} />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default AllAgent