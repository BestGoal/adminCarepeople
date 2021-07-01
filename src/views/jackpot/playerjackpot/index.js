import React from "react"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import AllPlayersChild from "./allPlayersChild"
import queryString from "query-string"

class AllPlayers extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Jackpot" breadCrumbParent="Player Manager" />
				<AllPlayersChild parsedFilter={queryString.parse(this.props.location.search)} />
			</React.Fragment>
		)
	}
}

export default AllPlayers