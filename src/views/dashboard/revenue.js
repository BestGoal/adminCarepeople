import React from "react"
import * as FC from "react-icons/fc";
import Select from "react-select"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import Datepicker from "../ui-elements/dateTimePicker/datepicker"
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard"
import { getAgentData } from "../../redux/actions/report/agent/index"
import { getRevenueLoad } from "../../redux/actions/dashboard/index"

const day = 86400000;
const Dates = new Date();
const Dates1 = new Date(Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-' + Dates.getDate());
const dataArray = [
    { title: "Today", index: 0 },
    { title: "Yesterday", index: 1 },
    { title: "This Week", index: 2 },
    { title: "Last Week", index: 3 },
    { title: "This Month", index: 4 },
    { title: "Last Month", index: 5 },
]

class Revenue extends React.Component {
    state = {
        filterItem: {
            rangePicker: [new Date(), new Date(new Date().valueOf() + day * 1)],
        },
        activeindex: 0,
    }

    componentDidMount() {
        this.props.getAgentData()
        this.props.getRevenueLoad(this.state.filterItem);
    }

    getdate(data) {
        var start = null;
        var end = null;
        switch (data) {
            case 0:
                start = new Date();
                end = new Date(new Date().valueOf() + day * 1);
                break;
            case 1:
                start = new Date(new Date().valueOf() - day * 1);
                end = new Date();
                break;
            case 2:
                start = new Date(Dates.valueOf() - (day * Dates.getDay()));
                end = new Date(new Date().valueOf() + day * 1);
                break;
            case 3:
                start = new Date(Dates.valueOf() - (day * (Dates.getDay() + 7)));
                end = new Date(Dates - (day * Dates.getDay()));
                break;
            case 4:
                start = new Date(Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-01 00:00:00');
                end = new Date(new Date().valueOf() + day * 1);
                break;
            case 5:
                if (Dates.getMonth() === 0) {
                    end = new Date(Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-01 00:00:00');
                    start = new Date(end - 31 * day);
                } else {
                    start = new Date(Dates.getFullYear() + '-' + (Dates.getMonth()) + '-01 00:00:00');
                    end = new Date(Dates.getFullYear() + '-' + (Dates.getMonth() + 1) + '-01 00:00:00');
                }
                break;
            default:
                start = new Date(Dates1 - day);
                end = Dates1;
                break;
        }
        let filterItem = this.state.filterItem;
        filterItem.rangePicker = [start, end];
        this.setState({ filterItem, activeindex: data });
        this.props.getRevenueLoad(this.state.filterItem);
    }

    datepickerChange(e) {
        let filterItem = this.state.filterItem;
        filterItem.rangePicker = [e.start, e.end];
        this.setState({ filterItem });
        this.props.getRevenueLoad(this.state.filterItem);
    }

    muser_Change = (value) => {
        let filterItem = this.state.filterItem
        if (value) {
            filterItem['user'] = value
        } else {
            delete filterItem['user']
        }
        this.setState({ filterItem });
        this.props.getRevenueLoad(this.state.filterItem);
    }

    render() {
        let {
            TotalDepositOfAgent, TotalWithdrawalOfAgent, TotalBetAmount, TotalWinAmount, TotalPlayerBalance, TotalAgentbalance,
            TotalPlayerMakingDeposit, TotalPlayerMakingWithdrawal } = this.props.dashboardData;
        return (
            <React.Fragment>
                <Row className="d-flex">
                    {
                        dataArray.map((item, i) => {
                            return (
                                <Col md="2" sm="6" xs={6} key={i} className="d-flex justify-content-center mt-1">
                                    <Button color="info" className={this.state.activeindex === item.index ? "revenubuttonactive dash-dt" : "dash-dt"} onClick={() => this.getdate(item.index)} outline >
                                        {item.title}
                                    </Button>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Col md="6" sm="12" className="mt-1">
                        <Select
                            className="React"
                            classNamePrefix="select"
                            options={this.props.agentList}
                            value={this.props.agentList.find(obj => obj.value === (this.state.filterItem.user ? this.state.filterItem.user : ""))}
                            onChange={e => this.muser_Change(e.value)}
                        />
                    </Col>
                    <Col md="6" sm="12" className="mt-1" >
                        <Datepicker onChange={date => { this.datepickerChange(date) }} />
                    </Col>
                </Row>
                <Col md="12" sm="12" className="mt-1">
                    <Row>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="primary"
                                icon={<FC.FcProcess className="primary" size={22} />}
                                statTitle="Total Deposit of Agent"
                                stat={TotalDepositOfAgent}
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="success"
                                icon={<FC.FcRemoveImage className="success" size={22} />}
                                stat={TotalWithdrawalOfAgent}
                                statTitle="Total Withdrawals of Agent"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                icon={<FC.FcMoneyTransfer className="success" size={22} />}
                                stat={TotalBetAmount}
                                hideChart
                                iconRight
                                statTitle="Total Bet Amount"
                                type="area"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                icon={<FC.FcMoneyTransfer className="danger" size={22} />}
                                stat={TotalWinAmount}
                                hideChart
                                iconRight
                                statTitle="Total win Amount"
                                type="area"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="warning"
                                icon={<FC.FcProcess className="warning" size={22} />}
                                stat={(TotalBetAmount - TotalWinAmount).toFixed(2)}
                                statTitle="Net Profit of Platform "
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="warning"
                                icon={<FC.FcMoneyTransfer className="warning" size={22} />}
                                stat={TotalAgentbalance}
                                statTitle="Agent Balance"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="danger"
                                icon={<FC.FcCurrencyExchange className="warning" size={22} />}
                                stat={TotalPlayerBalance}
                                statTitle="Players Balance"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12">
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="warning"
                                icon={<FC.FcDebt className="warning" size={22} />}
                                stat={TotalPlayerMakingDeposit}
                                statTitle="Players Marking Deposits"
                            />
                        </Col>
                        <Col lg="3" md="6" sm="12" >
                            <StatisticsCard
                                hideChart
                                iconRight
                                iconBg="warning"
                                icon={<FC.FcDataRecovery className="warning" size={22} />}
                                stat={TotalPlayerMakingWithdrawal}
                                statTitle="Players Making Withdrawals"
                            />
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

const mapstops = (state) => {
    return {
        agentList: state.report.agent_history.agentList,
        dashboardData: state.dashboard.dashboardData
    }
}

export default connect(mapstops, {
    getAgentData,
    getRevenueLoad
})(Revenue)