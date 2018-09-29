import React, {Component} from 'react';

import {Modal} from 'antd';


class DialogModel extends Component {

    constructor() {
        super()
        this.state = {
            visible: false
        }
    }


    showModal = () => {

        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });

        this.props.popHandleOk(e);
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });

        this.props.popHandleCancel(e);
    }

    render() {
        return (
            <Modal
                title={this.props.infoTitle}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>{this.props.infoText}</p>
            </Modal>
        )
    }

}

export default DialogModel;