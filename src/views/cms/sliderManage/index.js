import React from "react"
import Breacrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { connect } from "react-redux"
import { Row } from "reactstrap"
import CasinoSlider from "./casinoSlider"
import { getAllSliders } from "../../../redux/actions/cms/sliderManage"

class DndHorizontal extends React.Component {

	state = {
		Sliders: [
			{ type: "1", title: "Home Page Slider" },
			{ type: "2", title: "LiveCasino slider" },
			{ type: "3", title: "Casino slider" },
			{ type: "4", title: "Poker slider" }
		]
	}

	componentDidMount() {
		this.props.getAllSliders();
	}

	render() {
		return (
			<React.Fragment>
				<Breacrumbs breadCrumbTitle="CMS" breadCrumbParent="Slider" />
				<Row>
					{
						this.state.Sliders.map((item, i) => (
							<CasinoSlider key={i} title={item.title} type={item.type} allSliderImage={this.props.allSliderImage[item.type]} />
						))
					}
				</Row>
			</React.Fragment>
		)
	}
}

const mapstops = (state) => {
	return {
		allSliderImage: state.cms.fpMng.allSliderImage
	}
}

export default connect(mapstops, {
	getAllSliders
})(DndHorizontal)