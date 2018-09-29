import React, {Component} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Divider, message} from 'antd';
import PopoverShow from "./PopoverShow";
import reqwest from 'reqwest';
import DialogModel from './DialogModel';


const data = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         id: i.toString(),
//         name: `Edrward ${i}`,
//         link: `Link ${i}`,
//         comment: `London Park no. ${i}`,
//     });
// }
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class KeepMainT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '',
            pagination: {pageSize: 11},
            handleId: ''
        };
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                editable: true,
            }, {
                title: 'Link',
                dataIndex: 'link',
                render: url => <a href={url} target="_blank">{url}</a>,
                editable: true,
            }, {
                title: 'Comment',
                dataIndex: 'comment',
                editable: true,
            }, {
                title: 'CreateDate',
                dataIndex: 'createDate',
            }, {
                title: 'account',
                dataIndex: 'id',
                render: data => <div>
                    <PopoverShow Id={data} showTile='点我'/>
                </div>,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    // console.log("record==>", record);
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.id)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.id)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <a onClick={() => this.edit(record.id)}>Edit</a>
                            )}

                            <Divider type="vertical"/>

                            <a onClick={() => this.actionDelete(record.id)}>Delete</a>
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };

    edit(id) {
        this.setState({editingKey: id});
    }

    save(form, id) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => id === item.id);
            this.updateKmMain(id, row);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({data: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    }

    cancel = () => {
        this.setState({editingKey: ''});
    };

    fetchKmList = (params = {}) => {
        console.log('params:', params);
        this.setState({loading: true});
        reqwest({
            url: '/api/main/appearKmList',
            method: 'get',
            // data: {
            //     results: 10,
            //     ...params,
            // },
            type: 'json',
            error: function (err) {
                console.log("appearKmList reqwest error", err);
            },
        }).then((data) => {
            console.log("data:=>", data);
            const pagination = {...this.state.pagination};
            pagination.total = data.total;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    }

    updateKmMain = (id, row) => {
        var url = '/api/main/updSingleKm';
        var data = {
            id: id,
            name: row.name,
            link: row.link,
            comment: row.comment,
        };
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    deleteKmMain = (id) => {
        const dataSource = [...this.state.data];
        this.setState({data: dataSource.filter(item => item.id !== id)});
        reqwest({
            url: '/api/main/delSingleKm',
            type: 'json',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                id: id,
            },
            error: function (err) {
                console.log("appearKiList reqwest error", err);
                message.error("删除失败!");
            },
            success: function (resp) {
                message.success("删除成功!");
            }
        })
    }

    actionDelete = (id) => {
        this.setState({
            handleId: id
        })
        this.showModal();
    }

    showModal = () => {
        //调用组件进行通信
        this.refs.ShowDialog.showModal();
    }

    handleOk = (e) => {
        // this.state.handleId;
        this.deleteKmMain(this.state.handleId);
    }

    handleCancel = (e) => {
        // console.log("handleCancel", this.state.handleId);
    }

    componentDidMount() {
        this.fetchKmList();
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <DialogModel
                    ref="ShowDialog"
                    popHandleCancel={this.handleCancel.bind(this)}
                    popHandleOk={this.handleOk.bind(this)}
                    infoText='确定要删除吗？!'
                    infoTitle='信息提示'/>

                <Table
                    components={components}
                    bordered
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    columns={columns}
                    rowClassName="editable-row"
                />

                <button>添加</button>
            </div>
        );
    }
}


export default KeepMainT;