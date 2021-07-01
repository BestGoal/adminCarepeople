import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import PlayerLoginReport from "./playerLoginReportChild"
import queryString from "query-string"

class AllAgent extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Player" breadCrumbParent="Login Report" />
				<Row>
					<Col sm="12">
						<PlayerLoginReport parsedFilter={queryString.parse(this.props.location.search)} />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default AllAgent