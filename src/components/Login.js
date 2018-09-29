import React, {Component} from 'react';
import '../css/Login.css';
import BackGround from '../images/fromBack.png';
import OpenEye from '../images/eye.png';
import CloseEye from '../images/closeeye.png';
import lock from '../images/lockIcon.png';
import DialogModel from "./DialogModel";


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
        if (inputValue === '123456') {
            const {onloginIn} = this.props;
            onloginIn("text");
            this.props.history.push("/app");

        } else {
            this.showModal()
        }
    }

    showModal = () => {
        //调用组件进行通信
        this.refs.ShowDialog.showModal();
    }

    handleOk = (e) => {
        var input = this.refs.password;
        input.value = "";
        input.focus();
    }

    handleCancel = (e) => {
    }

    render() {
        return (
            <div>
                <DialogModel
                    ref="ShowDialog"
                    popHandleCancel={this.handleCancel.bind(this)}
                    popHandleOk={this.handleOk.bind(this)}
                    infoText='密码验证错误!'
                    infoTitle='信息提示'/>

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