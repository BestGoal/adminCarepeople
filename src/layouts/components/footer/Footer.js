import React, { Component } from 'react'
import ScrollToTop from "react-scroll-up"
import { Button } from "reactstrap"
import { ArrowUp, Heart } from "react-feather"
import classnames from "classnames"

export class Footer extends Component {

	render() {
		let footerTypeArr = ["sticky", "static", "hidden"]
		let props = this.props;
		return (
			<footer
				className={classnames("footer footer-light", {
					"footer-static": props.footerType === "static" || !footerTypeArr.includes(props.footerType),
					"d-none": props.footerType === "hidden"
				})}
			>
				<p className="mb-0 clearfix">
					<span className="float-md-left d-block d-md-inline-block mt-25">
						COPYRIGHT © {new Date().getFullYear()}
						<a
							href="http://8866casino.net"
							target="_blank"
							rel="noopener noreferrer"
						>
							8866casino.net
						</a>
						All rights reserved
					</span>
					<span className="float-md-right d-none d-md-block">
						<span className="align-middle">Hand-crafted & Made with</span>{" Developer"}
						<Heart className="text-danger" size={15} />
					</span>
				</p>
				{props.hideScrollToTop === false ? (
					<ScrollToTop showUnder={160}>
						<Button color="primary" className="btn-icon scroll-top">
							<ArrowUp size={15} />
						</Button>
					</ScrollToTop>
				) : null}
			</footer>
		)
	}
}

export default Footer