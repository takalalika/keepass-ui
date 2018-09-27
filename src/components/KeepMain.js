import React, {Component} from 'react';
import {Table, Divider} from 'antd';
import reqwest from 'reqwest';
import PopoverShow from "./PopoverShow";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '10%',
}, {
    title: 'Link',
    dataIndex: 'link',
    render: url => <a href={url} target="_blank">{url}</a>,
    width: '10%',
}, {
    title: 'Comment',
    dataIndex: 'comment',
    width: '10%',
}, {
    title: 'CreateDate',
    dataIndex: 'createDate',
    width: '10%',
}, {
    title: 'account',
    dataIndex: 'id',
    render: data => <div>
        <PopoverShow Id={data} showTile='点我'/>
    </div>,
    width: '10%',
}, {
    title: 'action',
    dataIndex: 'action',
    width: '10%',
    render: (text, record) => (
        <span>
      <a href="#">Edit</a>
      <Divider type="vertical"/>
      <a href="#">Delete</a>
    </span>
    ),
}];

class KeepMain extends Component {
    state = {
        data: [],
        pagination: {pageSize: 11},
        loading: false,
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    // fetch = (params = {}) => {
    //     console.log('params:', params);
    //     this.setState({loading: true});
    //     reqwest({
    //         url: 'https://randomuser.me/api',
    //         method: 'get',
    //         data: {
    //             results: 10,
    //             ...params,
    //         },
    //         type: 'json',
    //     }).then((data) => {
    //         const pagination = {...this.state.pagination};
    //         // Read total count from server
    //         // pagination.total = data.totalCount;
    //         pagination.total = 200;
    //         this.setState({
    //             loading: false,
    //             data: data.results,
    //             pagination,
    //         });
    //     });
    // }
// {/*<PopoverShow Id={this.data.id} showTile={data}/>*/}

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({loading: true});
        reqwest({
            url: 'http://127.0.0.1:8080/api/main/appearKmList',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = {...this.state.pagination};
            pagination.total = data.total;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

export default KeepMain;