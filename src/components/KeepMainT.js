import React, {Component} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import PopoverShow from "./PopoverShow";
import reqwest from 'reqwest';


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
        this.state = {data, editingKey: ''};
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
                editable: true,
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
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <a onClick={() => this.edit(record.key)}>Edit</a>
                            )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({editingKey: key});
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
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

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({loading: true});
        reqwest({
            url: 'http://127.0.0.1:8080/api/main/appearKmList',
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

    componentDidMount() {
        this.fetch();
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
            <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
                rowClassName="editable-row"
            />
        );
    }
}


export default KeepMainT;