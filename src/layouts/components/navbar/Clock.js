import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { Root } from "../../../authServices/rootconfig"

class Clock extends React.Component {

    _isMounted = false;
    state = {
        time: "",
        type: ""
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(() => {
            Root.socket.on("servertime", (serverTime) => {
                let time = serverTime.time.split(" ");
                if (this._isMounted) {
                    this.setState({
                        time: time[0],
                        type: time[1]
                    })
                }
            })
        }, 3000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="header-time-bar">
                <div className="header-clock-time">
                    <FontAwesomeIcon color="#1a9a65" icon={faClock} />
                    <h1 className='header-clock-hour'>&nbsp;{this.state.time}&nbsp;</h1><span className="header-clock-def">{this.state.type}&nbsp;</span>
                </div>
            </div>
        )
    }
}
export default Clock;