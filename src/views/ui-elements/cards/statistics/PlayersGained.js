import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"
import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"

class PlayersGained extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Users className="primary" size={22} />}
        stat="50.6k"
        statTitle="Players Gained"
        options={subscribersGained}
        series={subscribersGainedSeries}
        type="area"
      />
    )
  }
}
export default PlayersGained
