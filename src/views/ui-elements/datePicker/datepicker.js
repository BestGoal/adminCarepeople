import React, { Component } from 'react'
import { DateRangePicker } from 'react-date-range';
import Moment from 'react-moment';
import { Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from "reactstrap"
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';

export class datepicker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            datemodal: false,
            selectionRange: {
                startDate: new Date(new Date()),
                endDate: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
                key: 'selection',
            },
        }
    }

    datetoggleModal = () => {
        this.setState(prevState => ({
            datemodal: !prevState.datemodal
        }))
    }

    DateChange_action = (e) => {
        e.preventDefault();
        this.datetoggleModal()
        this.props.onChange({ start: this.state.selectionRange.startDate, end: this.state.selectionRange.endDate })
    }

    render() {
        let datestring = new Date(this.state.selectionRange.startDate).toDateString() + " ~ " + new Date(this.state.selectionRange.endDate).toDateString()
        return (
            <div className="w-100">
                <Label className="font-weight-bold w-100" style={{ fontSize: "1rem" }} onClick={() => this.datetoggleModal()}>
                    <Input placeholder="Select Date" disabled={true} type="text" value={datestring} />
                    {/* <Moment  date={(new Date(this.state.selectionRange.startDate))} /> ~  */}
                    {/* <Moment  date={(new Date(this.state.selectionRange.endDate))} /> */}
                </Label>
                <Modal isOpen={this.state.datemodal} toggle={this.datetoggleModal} className="modal-dialog-centered modal-lg" >
                    <Form className="" action="#" onSubmit={(e) => this.DateChange_action(e)}>
                        <ModalHeader toggle={this.datetoggleModal} className="bg-primary">
                            Date Range
                        </ModalHeader>
                        <ModalBody className="modal-dialog-centered justify-content-center d-flex">
                            <DateRangePicker ranges={[this.state.selectionRange]} onChange={(e) => this.setState({ selectionRange: e.selection })}
                                showSelectionPreview={true} moveRangeOnFirstSelection={false} months={1} />
                        </ModalBody>
                        <ModalFooter className="justify-content-center align-items-center">
                            <Button color="primary" type="submit">
                                Accept
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default datepicker