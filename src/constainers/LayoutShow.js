import {connect} from 'react-redux';
import {loginIn,loginOut} from "../action/action";
import LayoutIndex from "../components/LayoutIndex";


const mapStateToProps = state => ({
    stateOflogin: state.stateOflogin
})


const mapDispatchToProps = dispatch => {
    return {
        onLoginOut: date => {
            dispatch(loginOut(date));
        },
        onloginIn: date => {
            dispatch(loginIn(date));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutIndex)