import React, { Component } from "react";
import {
	UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, 
	FormGroup, Label, Form, Badge
} from "reactstrap";
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Edit2, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import confirm from "reactstrap-confirm";
import { addNewGame, getGames, UpdateGame, DeleteGame, gameImageUpdate } from "../../../redux/actions/config/games";
import { getAllGameTypes, getAllGameProviders } from "../../../redux/actions/config/system";
import { selectedStyle, pagenation_set, SuperAgent } from "../../../configs/providerconfig";
import { history } from "../../../history";
import { Root } from "../../../authServices/rootconfig";

const ActionsComponent = props => {
	return (
		<div className="data-list-action">
			<Edit className="cursor-pointer mr-1" size={20} onClick={() => props.me.toggleEditModal(false, props.row)} />
			<Trash className="cursor-pointer mr-1" size={20} onClick={() => props.me.toggleRemoveModal(props.row)} />
		</div>
	)
}

const CustomHeader = props => {
	let { AllFilterType, filterGameProvider, sortIndex, me, filterItem, total, userData } = props;
	return (
		<Row>
			<Col xs="6" md="4">
				<FormGroup className="mb-0">
					<Label>Game Types</Label>
					<Select
						className="React"
						classNamePrefix="select"
						value={AllFilterType.find(obj => obj.value === filterItem.gameType)}
						options={AllFilterType}
						onChange={e => me.changeFilterGameType(e.value)}
					/>
				</FormGroup>
			</Col>
			<Col xs="6" md="4">
				<FormGroup className="mb-0">
					<Label>Game Providers</Label>
					<Select
						className="React"
						classNamePrefix="select"
						value={filterGameProvider.find(obj => obj.value === filterItem.provider)}
						options={filterGameProvider}
						onChange={e => me.handleFilter({ key: "provider", value: e.value })}
					/>
				</FormGroup>
			</Col>
			<Col xs="12" md="4">
				<FormGroup>
					<div className="filter-section mt-1">
						<Input
							style={{ maxWidth: 'none' }}
							type="text"
							className="border-white"
							placeholder="Game Name"
							onChange={e => me.handleFilter({ key: "gameName", value: e.target.value })}
						/>
					</div>
				</FormGroup>
			</Col>
			<Col xs="12" className="d-flex justify-content-between">
				<UncontrolledDropdown className="data-list-rows-dropdown">
					<DropdownToggle color="" className="sort-dropdown">
						<span className="align-middle mx-50">
							{`${sortIndex[0]} - ${sortIndex[1]} of ${total}`}
						</span>
						<ChevronDown size={15} />
					</DropdownToggle>
					<DropdownMenu tag="div" right>
						{
							pagenation_set.map((item, i) => (
								<DropdownItem tag="a" key={i} onClick={() => me.handleRowsPerPage(item)}>{item} </DropdownItem>
							))
						}
					</DropdownMenu>
				</UncontrolledDropdown>
				{
					userData.permission === SuperAgent &&
						<div className="d-flex justify-content-end">
							<Button.Ripple color="success" className="mr-1" onClick={() => me.toggleEditModal(true)}>
								<span className="align-middle">{"Add Game"}</span>
							</Button.Ripple>
						</div>
				}
			</Col>
		</Row>
	)
}

class PokerManager extends Component {

	static getDerivedStateFromProps(props) {
		return {
			data: props.dataList.data,
			totalPages: props.dataList.totalPages,
			totalRecords: props.dataList.totalRecords,
			sortIndex: props.dataList.sortIndex
		}
	}

	state = {
		gameItem: {
			gameId: "",
			gameName: "",
			gameType: "",
			provider: "",
			LAUNCHURLID: "",
			imageUrl: "",
			status: true
		},

		filterItem: {
			provider: "",
			gameType: "",
			gameName: ""
		},

		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],

		AllGameType: [],
		AllFilterType: [],

		AllGameProvider: [],
		AllChooseProvider: [],
		filterGameProvider: [],

		update: false,
		isModal: false,
		imgModal: false,

		selectId: "",
		currentRow: {},

		gameImage: null,
		gameImageFile: null,

		columns: [
			{
				name: "Id",
				selector: "order",
				sortable: false,
				minWidth: "50px",
				cell: (row) => (
					<> {row.order} </>
				)
			}, {
				name: "Game Type",
				selector: "gameType",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<>{row.gameType && row.gameType.name}</>
				)
			}, {
				name: "Provider Name",
				selector: "provider",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<>{row.provider && row.provider?.providerName}</>
				)
			}, {
				name: "Agregator",
				selector: "provider",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<>{row.provider && row.provider?.Agregator}</>
				)
			}, {
				name: "Game Name",
				selector: "gameName",
				sortable: false,
				minWidth: "100px",
			}, {
				name: "Game Image",
				selector: "imageUrl",
				sortable: false,
				minWidth: "200px",
				cell: row => (
					<img
						src={row.isonline ? row.imageUrl : Root.imageurl + row.imageUrl}
						height="100"
						width="150"
						alt={row.imageUrl}
						onClick={() => this.imgChangeModal(row)}
					/>
				)
			}, {
				name: "Status",
				selector: "status",
				sortable: false,
				minWidth: "100px",
				cell: row => (
					<Badge color={row.status ? "light-success" : "light-danger"} pill> {row.status ? "Enable" : "Disable"}</Badge>
				)
			}, {
				name: this.props.userData.permission === SuperAgent ? "Actions" : "",
				minWidth: this.props.userData.permission === SuperAgent ? "50" : "0",
				sortable: false,
				cell: row => (
					<>
						{
							this.props.userData.permission === SuperAgent &&
								<ActionsComponent row={row} me={this} />
						}
					</>
				)
			},
		],
	}

	componentDidMount() {
		this.props.getAllGameTypes();
		this.props.getAllGameProviders();
		this.props.getGames(this.props.parsedFilter, {});
	}

	componentDidUpdate(prevProps) {
		if (this.props.allGameTypes !== prevProps.allGameTypes) {
			let AllFilterType = [...[{ value: "", label: "All" }], ...this.props.allGameTypes]
			this.setState({ AllGameType: this.props.allGameTypes, AllFilterType });
		}
		if (this.props.allGameProviders !== prevProps.allGameProviders) {
			this.setState({ AllGameProvider: this.props.allGameProviders, filterGameProvider: [{ value: "", label: "All" }] });
		}
	}

	async changeFilterGameType(gameType) {
		await this.setFilterGameProviders(gameType);
		await this.handleFilter({ key: "gameType", value: gameType });
	}

	handleFilter = async (data) => {
		let condition = {};
		let { filterItem } = this.state

		filterItem[data.key] = data.value
		if (!filterItem["gameType"] || filterItem["gameType"] === "" || data.key === "gameType") {
			filterItem["provider"] = "";
		}

		if (filterItem.gameType) {
			condition.gameType = filterItem.gameType;
		}
		if (filterItem.provider) {
			condition.provider = filterItem.provider;
		}
		if (filterItem.gameName) {
			condition.gameName = filterItem.gameName;
		}

		this.setState({ filterItem });
		this.props.getGames(this.props.parsedFilter, condition);
	}

	setFilterGameProviders = (gameType) => {
		let { AllGameProvider } = this.state;
		let newFilterProviderData = [{ value: "", label: "All" }];
		for (let i in AllGameProvider) {
			if (AllGameProvider[i].gameType === gameType) {
				newFilterProviderData.push(AllGameProvider[i]);
			}
		}
		this.setState({ filterGameProvider: newFilterProviderData });
	}

	toggleEditModal = (isNew = true, row = {}) => {
		if (isNew) {
			this.setState({
				isModal: true,
				update: false,
				gameItem: {
					gameId: "",
					gameName: "",
					gameType: "",
					provider: "",
					LAUNCHURLID: "",
					imageUrl: "",
					status: true
				}
			})
		} else {
			let AllChooseProvider = [];
			let AllGameProvider = this.state.AllGameProvider;
			for (let i in AllGameProvider) {
				if (AllGameProvider[i].gameType === row.gameType._id) {
					AllChooseProvider.push(AllGameProvider[i]);
				}
			}
			let gameItem = {
				gameName: row.gameName,
				LAUNCHURLID: row.LAUNCHURLID,
				imageUrl: row.imageUrl,
				status: row.status,
				gameType: row.gameType._id,
				provider: row.provider._id
			}
			this.setState({
				isModal: true,
				update: true,
				gameItem,
				selectId: row._id,
				AllChooseProvider
			});
		}
	}

	updateGameItem = (data) => {
		let { AllGameProvider, gameItem } = this.state;
		gameItem[data.key] = data.value;
		if (data.key === "gameType") {
			let AllChooseProvider = [];
			for (let i in AllGameProvider) {
				if (AllGameProvider[i].gameType === data.value) {
					AllChooseProvider.push(AllGameProvider[i]);
				}
			}
			this.setState({ AllChooseProvider })
		}
		this.setState({ gameItem });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let { filterItem, gameItem, update, selectId } = this.state;
		let { addNewGame, parsedFilter, UpdateGame } = this.props;
		let flag = this.validatorGameItem(gameItem);
		if (flag) {
			let condition = {};
			if (filterItem.gameType) {
				condition.gameType = filterItem.gameType;
			}
			if (filterItem.provider) {
				condition.provider = filterItem.provider;
			}
			if (filterItem.gameName) {
				condition.gameName = filterItem.gameName;
			}
			if (update) {
				gameItem._id = selectId;
				UpdateGame(gameItem, parsedFilter, condition);
			} else {
				addNewGame(gameItem, parsedFilter, condition);
			}
			this.setState({ isModal: false });
		}
	}

	validatorGameItem = (data) => {
		if (data.gameId === "") {
			toast.error("Please input correctly gameId.");
			return false;
		}
		if (data.gameName === "") {
			toast.error("Please input correctly gameName.");
			return false;
		}
		if (data.LAUNCHURLID === "") {
			toast.error("Please input correctly LAUNCHURLID.");
			return false;
		}
		if (data.provider === "") {
			toast.error("Please input correctly provider.");
			return false;
		}
		if (data.gameType === "") {
			toast.error("Please input correctly gameType.");
			return false;
		}
		if (data.imageUrl === "") {
			toast.error("Please input correctly imageUrl.");
			return false;
		}
		return true;
	}

	handlePagination = page => {
		let { parsedFilter, getGames } = this.props
		let { filterItem } = this.state;
		let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
		let urlPrefix = history.location.pathname
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		let condition = {};
		if (filterItem.gameName) {
			condition.gameName = filterItem.gameName && filterItem.gameName;
		}
		if (filterItem.gameType) {
			condition.gameType = filterItem.gameType && filterItem.gameType;
		}
		if (filterItem.provider) {
			condition.provider = filterItem.provider && filterItem.provider;
		}
		getGames({ page: page.selected + 1, perPage }, condition);
	}

	handleRowsPerPage = value => {
		let { parsedFilter, getGames } = this.props
		let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`);
		let condition = {};
		if (this.state.filterItem.gameName) {
			condition.gameName = this.state.filterItem.gameName && this.state.filterItem.gameName;
		}
		if (this.state.filterItem.gameType) {
			condition.gameType = this.state.filterItem.gameType && this.state.filterItem.gameType;
		}
		if (this.state.filterItem.provider) {
			condition.provider = this.state.filterItem.provider && this.state.filterItem.provider;
		}
		getGames({ page, perPage: value }, condition);
	}

	async toggleRemoveModal(row = {}) {
		let flag = await confirm({
			title: (<> Delete game.</>),
			message: "Will you remove this item realy ?",
			confirmText: "Ok",
			cancelColor: "link text-danger"
		});
		if (flag) {
			let { filterItem } = this.state;
			if (flag) {
				let condition = {};
				if (filterItem.gameType) {
					condition.gameType = filterItem.gameType;
				}
				if (filterItem.provider) {
					condition.provider = filterItem.provider;
				}
				if (filterItem.gameName) {
					condition.gameName = filterItem.gameName;
				}
				this.props.DeleteGame({ _id: row._id }, this.props.parsedFilter, condition);
			}
		}
	}

	ChooseImage(e) {
		this.setState({ gameImageFile: e.target.files[0] });
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			this.setState({ gameImage: fileReader.result });
		}
		fileReader.readAsDataURL(e.target.files[0])
	}

	imgChangeModal = row => {
		this.setState({
			imgModal: true,
			currentRow: row,
			gameImage: row.isonline ? row.imageUrl : Root.imageurl + row.imageUrl
		})
	}

	uploadImage() {
		if (this.state.gameImageFile) {
			let fpdata = new FormData();

			fpdata.append('gameImage', this.state.gameImageFile);
			fpdata.append('id', this.state.currentRow._id);

			let { filterItem } = this.state;
			let condition = {};
			if (filterItem.gameType) {
				condition.gameType = filterItem.gameType;
			}
			if (filterItem.provider) {
				condition.provider = filterItem.provider;
			}
			if (filterItem.gameName) {
				condition.gameName = filterItem.gameName;
			}

			this.props.gameImageUpdate(fpdata, this.props.parsedFilter, condition);
			this.setState({ currentRow: {}, gameImageFile: null, gameImage: null, imgModal: false })
		} else {
			toast.error("Please change file.");
		}
	}

	render() {
		let { AllFilterType, AllGameType, filterGameProvider, AllChooseProvider, sortIndex, isModal, update, gameItem, filterItem, totalRecords,
			columns, totalPages, data, imgModal, gameImage
		} = this.state;

		return (
			<div id="admindata_table" className={`data-list list-view`}>
				<Modal isOpen={isModal} toggle={() => this.setState({ isModal: false })} className="modal-dialog-centered" >
					<Form onSubmit={this.handleSubmit}>
						<ModalHeader toggle={() => this.setState({ isModal: false })} className="bg-primary">
							{"Add Game Providers"}
						</ModalHeader>
						<ModalBody className="modal-dialog-centered  mt-1">
							<Row>
								<Col sm="12">
									<FormGroup className="mb-0">
										<Label for="gametypes">Game Types</Label>
										<Select
											className="React"
											classNamePrefix="select"
											value={AllGameType.find(obj => obj.value === gameItem.gameType)}
											options={AllGameType}
											onChange={e => this.updateGameItem({ key: "gameType", value: e.value })}
										/>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup className="mb-0">
										<Label for="gametypes">Game Providers</Label>
										<Select
											className="React"
											classNamePrefix="select"
											value={AllChooseProvider.find(obj => obj.value === gameItem.provider)}
											name="currentGameProvider"
											options={AllChooseProvider}
											onChange={e => this.updateGameItem({ key: "provider", value: e.value })}
										/>
									</FormGroup>
								</Col>
								{
									!update &&
									<Col sm="12">
										<FormGroup className="form-label-group position-relative has-icon-left">
											<Input
												type="text"
												placeholder="Game Id"
												value={gameItem.gameId}
												onChange={e => this.updateGameItem({ key: "gameId", value: e.target.value })}
												required
											/>
											<div className="form-control-position" >
												<Edit2 size={15} />
											</div>
											<Label>Game Id</Label>
										</FormGroup>
									</Col>
								}
								<Col sm="12">
									<FormGroup className="form-label-group position-relative has-icon-left">
										<Input
											type="text"
											placeholder="Game Name"
											value={gameItem.gameName}
											onChange={e => this.updateGameItem({ key: "gameName", value: e.target.value })}
											required
										/>
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
										<Label>Game Name</Label>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup className="form-label-group position-relative has-icon-left">
										<Input
											type="text"
											placeholder="imageUrl"
											value={gameItem.imageUrl}
											onChange={e => this.updateGameItem({ key: "imageUrl", value: e.target.value })}
											required
										/>
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
										<Label>Image Url</Label>
									</FormGroup>
								</Col>
								<Col sm="12">
									<FormGroup className="form-label-group position-relative has-icon-left">
										<Input
											type="text"
											placeholder="LAUNCHURLID"
											value={gameItem.LAUNCHURLID}
											onChange={e => this.updateGameItem({ key: "LAUNCHURLID", value: e.target.value })} required />
										<div className="form-control-position" >
											<Edit2 size={15} />
										</div>
										<Label>LAUNCHURLID</Label>
									</FormGroup>
								</Col>
								<Col md="6" sm="12" className="mt-0">
									<Label>STATUS</Label>
									<label className="react-toggle-wrapper">
										<Toggle
											checked={gameItem.status}
											onChange={() => this.updateGameItem({ key: "status", value: !gameItem.status })}
											name="controlledSwitch"
											value="yes"
										/>
										<Button.Ripple
											color="primary"
											type="button"
											onClick={() => this.updateGameItem({ key: "status", value: !gameItem.status })}
											size="sm"
										>
											{gameItem.status ? "Enable" : "Disable"}
										</Button.Ripple>
									</label>
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							{
								update ? <Button color="primary" type="submit">{"Update"}</Button> : <Button color="primary" type="submit">{"Save"}</Button>
							}
						</ModalFooter>
					</Form>
				</Modal>

				<Modal isOpen={imgModal} toggle={() => this.setState({ imgModal: false })} className="modal-dialog-centered" >
					<ModalHeader toggle={() => this.setState({ imgModal: false })} className="bg-primary">Image Change</ModalHeader>
					<ModalBody className="modal-dialog-centered  mt-1">
						<Col>
							<img src={gameImage} style={{ width: "100%" }} alt="" />
							<input
								id="cropper-image"
								type="file"
								style={{ display: "none" }}
								onChange={e => this.ChooseImage(e)}
							/>
						</Col>
					</ModalBody>
					<ModalFooter>
						<Button.Ripple color="success" className="mr-1" onClick={() => document.getElementById("cropper-image").click()} > Upload </Button.Ripple>
						<Button.Ripple color="success" className="mr-1" onClick={() => this.uploadImage()} > Save </Button.Ripple>
						<Button.Ripple color="danger" onClick={() => this.setState({ imgModal: false })}> Cancel </Button.Ripple>
					</ModalFooter>
				</Modal>

				<DataTable
					columns={columns}
					data={data}
					pagination
					paginationServer
					paginationComponent={() => (
						<ReactPaginate
							previousLabel={<ChevronLeft size={15} />}
							nextLabel={<ChevronRight size={15} />}
							breakLabel="..."
							breakClassName="break-me"
							pageCount={totalPages}
							containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
							activeClassName="active"
							forcePage={this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0}
							onPageChange={page => this.handlePagination(page)}
						/>
					)}
					noHeader
					responsive
					pointerOnHover
					customStyles={selectedStyle}
					subHeader
					subHeaderComponent={
						<CustomHeader
							AllFilterType={AllFilterType}
							filterGameProvider={filterGameProvider}
							sortIndex={sortIndex}
							total={totalRecords}
							filterItem={filterItem}
							userData={this.props.userData}
							me={this}
						/>
					}
					sortIcon={<ChevronDown />}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.config.games,
		allGameTypes: state.config.system.allGameTypes,
		allGameProviders: state.config.system.allGameProviders,
		userData: state.auth.userData
	}
}

export default connect(mapStateToProps, {
	getAllGameTypes,
	getAllGameProviders,
	getGames,
	addNewGame,
	UpdateGame,
	DeleteGame,
	gameImageUpdate
})(PokerManager)