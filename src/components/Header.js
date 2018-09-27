import React, {Component} from 'react';
import '../css/header.css';

class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="head_logo"></div>
                <div className="head_search"></div>
                <div className="head_info"></div>
            </div>
        )
    }

}