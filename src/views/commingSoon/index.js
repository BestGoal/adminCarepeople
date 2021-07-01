import React from "react"
import { Card, Row } from "reactstrap"
import csImg from "../../assets/img/pages/rocket.png"
import Countdown from "react-countdown-now"
import "../../assets/scss/pages/coming-soon.scss"

class ComingSoon extends React.Component {
	renderTimer = ({ days, hours, minutes, seconds }) => {
		return (
			<React.Fragment>
				<div className="clockCard px-1">
					<p>{days}</p>
					<p className="bg-amber clockFormat lead px-1 black"> Days </p>
				</div>
				<div className="clockCard px-1">
					<p>{hours}</p>
					<p className="bg-amber clockFormat lead px-1 black"> Hours </p>
				</div>
				<div className="clockCard px-1">
					<p>{minutes}</p>
					<p className="bg-amber clockFormat lead px-1 black"> Minutes </p>
				</div>
				<div className="clockCard px-1">
					<p>{seconds}</p>
					<p className="bg-amber clockFormat lead px-1 black"> Seconds </p>
				</div>
			</React.Fragment>
		)
	}

	render() {
		return (
			<Row className="m-0">
				<Card className="d-flex align-items-center justify-content-center mb-0 vh-100 vw-100">
					<h2 style={{ textAlign: "center" }}>We are launching soon</h2>
					<img src={csImg} alt="csImg" className="img-fluid width-150" />
					<div className="text-center getting-started pt-2 d-flex justify-content-center flex-wrap">
						<Countdown
							date={Date.now() + 10000000000}
							renderer={this.renderTimer}
						/>
					</div>
				</Card>
			</Row>
		)
	}
}

export default ComingSoon;