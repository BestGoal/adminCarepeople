import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import GameProvider from "./providerChild"
import queryString from "query-string"

class Casinoprovider extends React.Component {

	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Config" breadCrumbParent="Provider" />
				<Row>
					<Col sm="12">
						<GameProvider parsedFilter={queryString.parse(this.props.location.search)} />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default Casinoprovider