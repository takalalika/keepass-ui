import React, {Component} from 'react';
import '../css/KeepInfo.css';
import reqwest from 'reqwest';
import TrList from "./TrList";

class KeepInfo extends Component {
    state = {
        data: [],
        loading: false,
    };
    fetch = (params = {}) => {
        let id = this.props.Id;
        this.setState({loading: true});
        reqwest({
            url: 'http://127.0.0.1:8080/api/info/appearKiList',
            type: 'json',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                id: id,
                ...params,
            },
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // },
            error: function (err) {
                console.log("appearKiList reqwest error", err);
            },
        }).then((data) => {
            this.setState({
                loading: false,
                data: data.results,
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        let items = this.state.data;
        return (
            <div>
                <div className="info_detail">
                    <table>
                        <tbody>
                        <TrList items={items}/>
                        {/*<tr>*/}
                        {/*<td onClick={this.copyValue.bind(this, '${data.kmId}')}>{data.kmId}</td>*/}
                        {/*<td onClick={this.copyValue.bind(this, '${data.pass}')}>*/}
                        {/*：<input type="password"*/}
                        {/*disabled="disabled"*/}
                        {/*value={data.pass}/>*/}
                        {/*</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*<td id="account02">test002</td>*/}
                        {/*<td>：<input type="password" disabled="disabled" value="123456"/></td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*<td id="account03">test003</td>*/}
                        {/*<td>：<input type="password" disabled="disabled" value="123456"/></td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default KeepInfo;