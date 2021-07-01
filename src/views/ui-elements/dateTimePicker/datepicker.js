import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'

class Datepicker extends Component {

    onCallback(start, end) {
        this.props.onChange({ start: `${start._d.toDateString()}, ${start._d.toLocaleTimeString()}`, end: `${end._d.toDateString()}, ${end._d.toLocaleTimeString()}` });
    }

    render() {
        return (
            <DateRangePicker
                initialSettings={{
                    timePicker: true,
                    timePicker24Hour: true,
                    timePickerSeconds: true,
                    startDate: new Date(),
                    endDate: new Date(),
                    locale: {
                        format: 'YYYY/MM/DD hh:mm:ss',
                    }
                }}
                onCallback={(start, end) => this.onCallback(start, end)}
            >
                <input type="text" className="form-control" />
            </DateRangePicker>
        )
    }
}

export default Datepicker