import React, {Component} from 'react';
import copy from 'copy-to-clipboard';
import { message } from 'antd';


class TrList extends Component {
    copyValue(text) {
        copy(text);
        message.success("复制到剪切板成功!");
    }

    render() {

        let items = this.props.items;
        return (
            items.map((item) =>
                <tr key={item.id}>
                    <td onClick={this.copyValue.bind(this, item.account)}>{item.account}</td>
                    <td onClick={this.copyValue.bind(this, item.pass)}>
                        ：<input type="password"
                                disabled="disabled"
                                value={item.pass}/>
                    </td>
                </tr>
            )
    )
    }
}


export default TrList;