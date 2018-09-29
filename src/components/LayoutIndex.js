import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import '../../node_modules/antd/dist/antd.css';
import {
    Route,
    Link,
    Redirect,
    BrowserRouter,
    Switch,
} from 'react-router-dom';

import App from '../components/App';
import Login from '../constainers/LoginConstain';
import KeepMain from '../components/KeepMain';
import KeepInfo from "./KeepInfo";
import PopoverShow from "./PopoverShow";
import KeepMainT from "./KeepMainT";
import DeleTem from "./DeleTem";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true;
    },
    signout(cb) {
        this.isAuthenticated = false;
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

class LayoutIndex extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    render() {
        const {stateOflogin} = this.props;
        fakeAuth.isAuthenticated = stateOflogin;
        return (
            <BrowserRouter>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user"/><span>工作台</span></span>}
                            >
                                <Menu.Item key="3">
                                    <Link to="/app">App</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/alt">sele</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/del">DeleTem</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="message"/><span>chat</span></span>}
                            >
                                <Menu.Item key="6">chat 1</Menu.Item>
                                <Menu.Item key="8">chat 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <Icon type="file"/>
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#2060b6', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Switch>
                                <PrivateRoute exact path="/app" component={App}/>
                                <Route exact path="/login" component={Login}/>
                                <PrivateRoute exact path="/keepMain" component={KeepMain}/>
                                <PrivateRoute exact path="/" component={KeepInfo}/>
                                <PrivateRoute exact path="/show" component={PopoverShow}/>
                                <Route exact path="/alt" component={KeepMainT}/>
                                <Route exact path="/del" component={DeleTem}/>
                            </Switch>
                        </Content>
                        {/*<Footer style={{background: '#00ff36', textAlign: 'center'}}>*/}
                        {/*Ant Design ©2018 Created by Ant UED*/}
                        {/*</Footer>*/}
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default LayoutIndex;
