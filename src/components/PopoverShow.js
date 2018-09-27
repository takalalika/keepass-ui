import React, {Component} from 'react';
import {Popover} from 'antd';
import KeepInfo from "./KeepInfo";


class PopoverShow extends Component {
    state = {
        clicked: false,
        hovered: false,
    };

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false,
        });
    }

    handleHoverChange = (visible) => {
        this.setState({
            hovered: visible,
            clicked: false,
        });
    }

    handleClickChange = (visible) => {
        this.setState({
            clicked: visible,
            hovered: false,
        });
    }

    render() {

        let id = this.props.Id;
        const hoverContent = (
            <div>
                <KeepInfo Id={id}/>
            </div>
        );
        const clickContent = (
            <div>
                <KeepInfo Id={id}/>
            </div>
        );

        return (
            <Popover
                style={{width: 500}}
                content={hoverContent}
                title="title"
                trigger="hover"
                visible={this.state.hovered}
                onVisibleChange={this.handleHoverChange}
            >
                <Popover
                    content={(
                        <div>
                            {clickContent}
                            <a onClick={this.hide}>Close</a>
                        </div>
                    )}
                    title="title"
                    trigger="click"
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}
                >
                    <a>{this.props.showTile}</a>
                </Popover>
            </Popover>
        );
    }
}

export default PopoverShow;