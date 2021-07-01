import React from 'react';
import JqxTreeGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';
import { Row, Col, Table, FormGroup } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { connect } from "react-redux";
import { getAllTreeAgent, getUsersForTreeAgent } from "../../../redux/actions/agent/index"

const source = {
	dataType: 'json',
	hierarchy: {
		keyDataField: { name: 'id' },
		parentDataField: { name: 'pid' }
	},
	id: 'id',
	localData: []
};

class App extends React.PureComponent {

	constructor(props) {
		super(props);
		this.myTreeGrid = React.createRef();
		const dataAdapter = new jqx.dataAdapter(source);
		this.state = {
			columns: [
				{ dataField: 'username', text: 'username', width: 150 },
				{ dataField: 'subAgent', text: 'sub-agents', width: 100 },
				{ dataField: 'balance', text: 'balance', width: 100 },
				{ dataField: 'player', text: 'players', width: 100 },
				{ dataField: 'total', text: 'Total Balance', width: 100 },
				{ dataField: 'id', text: 'id', hidden: true },
				{ dataField: 'pid', text: 'pid', hidden: true },
			],
			source: dataAdapter,
			selectitem: null,
			action: ""
		}
	}

	componentDidMount() {
		this.props.getAllTreeAgent()
	}

	onRowClick(e) {
		this.setState({ selectitem: e.args.row });
		this.props.getUsersForTreeAgent({ userid: e.args.row.id });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userList !== this.props.userList) {
			source.localData = this.props.userList;
			const dataAdapter = new jqx.dataAdapter(source);
			this.setState({ source: dataAdapter });
		}
	}

	render() {
		return (
			<React.Fragment>
				<Breadcrumbs breadCrumbTitle="Agents" breadCrumbParent="Tree Overview" />
				<Row>
					<Col sm="6">
						<h4>Total Agent: {this.props.allTotalAgent} </h4>
						<h4>Total Player: {this.props.allTotalPlayer} </h4>
						<h4>Total Amount: {this.props.allTotalBalance} EUR </h4>
					</Col>
					<Col sm="6">
						<FormGroup>
							<h4>{this.state.selectitem && this.state.selectitem.username + "'s players"}</h4>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<JqxTreeGrid
							ref={this.myTreeGrid}
							source={this.state.source}
							columns={this.state.columns}
							onRowClick={(e) => this.onRowClick(e)}
						/>
					</Col>
					<Col>
						<Table responsive bordered >
							<thead >
								<tr>
									<th>No </th>
									<th>Username </th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.allUserData.map((item, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{item.username}</td>
											<td>{item.balance.toFixed(2)}</td>
										</tr>
									))
								}
							</tbody>
						</Table>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}


const mapStateToProps = (state) => ({
	userList: state.agent.tree_agent.allData,
	allTotalBalance: state.agent.tree_agent.allTotalBalance,
	allTotalPlayer: state.agent.tree_agent.allTotalPlayer,
	allTotalAgent: state.agent.tree_agent.allTotalAgent,
	allUserData: state.agent.tree_agent.allUserData
})

const mapDispatchToProps = {
	getAllTreeAgent, getUsersForTreeAgent
}

export default connect(mapStateToProps, mapDispatchToProps)(App)