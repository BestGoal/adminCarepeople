import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { DollarSign } from "react-feather"
import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"

class DepositReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<DollarSign className="danger" size={22} />}
        stat="100 GGR"
        statTitle="DepositReceived"
        options={subscribersGained}
        series={subscribersGainedSeries}
        type="area"
      />
    )
  }
}
export default DepositReceived
