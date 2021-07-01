import React from "react";
import { Edit } from "react-feather";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import confirm from "reactstrap-confirm";
import { Trash } from 'react-feather';
import { Root } from "../../../authServices/rootconfig";
import { Row, Col, CardHeader, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { createSliderItem, updateSliderItem, Slider_delete, sliderOrderUpdate } from "../../../redux/actions/cms/sliderManage";
import Demo from "./sliderModal";

class CasinoSlider extends React.Component {
	state = {
		modal: false,
		selectrow: {},

		items: [],
	}

	changeModalKey = (bool, key = false) => {
		this.setState({ modal: bool, isNew: key, selectrow: {} });
	}

	updateSliderItem = (fpImg, editdata) => {
		if (fpImg) {
			if (fpImg.type.split("/")[0] !== 'image') {
				toast.warning('Please select only image file.');
			}
		}
		let fpdata = new FormData();
		fpdata.append('fpImgFile', fpImg);
		fpdata.append('text', editdata.text);
		fpdata.append('gameid', editdata.gameid);
		fpdata.append('status', editdata.status);
		if (this.state.isNew) {
			fpdata.append('id', editdata._id);
			this.props.updateSliderItem(fpdata);
		} else {
			fpdata.append('type', this.props.type);
			this.props.createSliderItem(fpdata);
		}
	}

	EditChange = (item) => {
		let data = {};
		data = Object.assign({}, item, { gameid: item.gameid._id });
		this.changeModalKey(true, true);
		this.setState({ selectrow: data });
	}

	handleItemsMove = async (row) => {
		let flag = await confirm({
			title: (<> Delete Slider.</>),
			message: "Will you remove this item really ?",
			confirmText: "Ok",
			cancelColor: "link text-danger"
		});
		if (flag) {
			this.props.Slider_delete(row._id);
		}
	}

	onDragEnd = result => {
		let allData = this.props.allSliderImage;
		if (!result.destination || allData.length <= 1) {
			return;
		}
		let firstData = allData[result.source.index];
		let secondData = allData[result.destination.index];
		let sendData = [
			{ _id: firstData._id, order: secondData.order },
			{ _id: secondData._id, order: firstData.order },
		]
		this.props.sliderOrderUpdate(sendData);
	}

	render() {
		return (
			<Col md="12">
				<CardHeader className="p-0 m-0">
					<Row>
						<Col md="6">
							<h4 className='text-uppercase'>{this.props.title}</h4>
						</Col>
						{/* <Button.Ripple color="success" onClick={() => this.changeModalKey(true)} >
							<span>Add</span>
						</Button.Ripple> */}
					</Row>
				</CardHeader>
				<CardBody className="p-0 m-0">
					<Demo
						modal={this.state.modal}
						size={"md"}
						changeModalKey={this.changeModalKey}
						updateSliderItem={this.updateSliderItem}
						cropSize={{ height: 100 }}
						editdata={this.state.selectrow}
					/>
					{
						this.props.allSliderImage && this.props.allSliderImage.length > 0 ?
							<ListGroup id="list-group-dnd">
								<DragDropContext onDragEnd={this.onDragEnd}>
									<Droppable droppableId="droppable">
										{(provided) => (
											<div ref={provided.innerRef}>
												{
													this.props.allSliderImage.map((item, index) => (
														<Draggable key={item._id} draggableId={item._id} index={index} >
															{(provided) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	className="drag-wrapper"
																>
																	<ListGroupItem>
																		<Row className="d-flex justify-content-between p-1">
																			<img className="img-fluid" src={Root.imageurl + item.image} alt={item.image} style={{ width: "160px", height: "40px" }} />
																			{/* <Col> {item.text}</Col>
																			<Col> {item.gameid.gameName} </Col>
																			<Col>
																				<img className="img-fluid" src={item.gameid.imageUrl && (
																					item.gameid.isonline ? item.gameid.imageUrl : Root.imageurl + item.gameid.imageUrl
																				)} alt={item.gameid.imageUrl} style={{ width: "50px", height: "40px" }} />
																			</Col> */}
																			<div classNam="d-flex justify-content-center">
																				<div className="cursor-pointer mr-1" onClick={() => this.EditChange(item)}>
																					<Edit size={20} />
																				</div>
																				<div className="cursor-pointer mr-1" onClick={() => this.handleItemsMove(item)}>
																					<Trash size={20} />
																				</div>
																			</div>
																		</Row>
																	</ListGroupItem>
																</div>
															)}
														</Draggable>
													))
												}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</ListGroup>
							: null
					}
				</CardBody>
			</Col>
		)
	}
}



export default connect(null, {
	createSliderItem,
	updateSliderItem,
	Slider_delete,
	sliderOrderUpdate
})(CasinoSlider)