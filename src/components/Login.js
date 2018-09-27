import React, {Component} from 'react';
import '../css/Login.css';
import BackGround from '../images/fromBack.png';
import OpenEye from '../images/eye.png';
import CloseEye from '../images/closeeye.png';
import lock from '../images/lockIcon.png';
import { Modal } from 'antd';


var BackGroundStyle = {
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${BackGround})`
};

var CloseEyeStyle = {
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${OpenEye})`
};
var OpenEyeStyle = {
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${CloseEye})`
};


class Login extends Component {
    constructor() {
        super()
        this.state = {
            openEye: false,
            redirectToReferrer: false,
            visible: false
        }
    }

    showOffPassword() {
        this.setState({
            openEye: !this.state.openEye
        })
    }

    getLogin() {
        // var input = this.refs.password;
        // input.value = "";
        // input.focus();
        let inputValue = this.refs.password.value;
        if (inputValue ==='123456') {
            const {onloginIn} = this.props;
            onloginIn("text");
            this.props.history.push("/app");

        } else {
            this.showModal()
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

        var input = this.refs.password;
        input.value = "";
        input.focus();
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="信息提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>密码验证错误!</p>
                </Modal>
                <div style={BackGroundStyle} className="loginDiv">
                    <div className="inputBox">
                        <input ref="password" type={this.state.openEye ? "text" : "password"}></input>
                        <div onClick={this.showOffPassword.bind(this)}
                             style={this.state.openEye ? OpenEyeStyle : CloseEyeStyle} className="eye"></div>
                    </div>
                    <div onClick={this.getLogin.bind(this)} className="sub_button">
                        <img src={lock} alt={''} className="lock"/>
                        <div className="unlock">Unlock</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;