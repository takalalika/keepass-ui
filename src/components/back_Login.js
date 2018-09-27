import React, {Component} from 'react';
import '../css/Login.css';
import BackGround from '../images/fromBack.png';
import OpenEye from '../images/eye.png';
import CloseEye from '../images/closeeye.png';
import lock from '../images/lockIcon.png';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        // right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

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
            redirectToReferrer: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            this.openModal()
        }
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    ensure() {
        this.setState({modalIsOpen: false});
        var input = this.refs.password;
        input.value = "";
        input.focus();
    }

    render() {

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>错误信息!</h2>
                    <div>可能是密码错误!</div>
                    <button onClick={this.closeModal.bind(this)}>close</button>
                    <button onClick={this.ensure.bind(this)}>ok</button>
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