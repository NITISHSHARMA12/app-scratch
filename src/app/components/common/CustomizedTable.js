import React from "react";
import {Button, Col, Icon, Input, Row, Table, Tag} from "antd";
import {exportToExcel, exportToPDF} from "../../utils/export";
import moment from "moment";
import Highlighter from 'react-highlight-words';

export default class CustomizedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            searchText: '',
        };
        this.excelExport = this.excelExport.bind(this);
        this.pdfExport = this.pdfExport.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.columns != this.state.columns || newProps.dataSource != this.state.dataSource || newProps.loading != this.state.loading) {
            this.setState({...newProps});
        }
    }

    pdfExport() {
        let that = this;
        let excelColumns = [];
            that.state.columns.forEach(function(item) {
                if(!item.hideExport)
                    excelColumns.push({title: item.title, dataKey: item.title})
            });
        let dataArrayForExcel = [];
        that.state.dataSource.forEach(function (dataRow,index) {
            let dataObjectToPush = {};
            that.state.columns.forEach(function (column) {
                if (column.export) {
                    dataObjectToPush[column.title] = column.export(dataRow[column.dataIndex], dataRow,index);
                } else {
                    dataObjectToPush[column.title] = dataRow[column.dataIndex];
                }
            });
            dataArrayForExcel.push(dataObjectToPush);
        });
        exportToPDF(excelColumns, dataArrayForExcel, "Export" + moment(), true);
    }

    excelExport() {
        let that = this;
        let excelColumns = [];
        that.state.columns.forEach(function(item) {
            if(!item.hideExport)
                excelColumns.push(item.title)
        });
        let dataArrayForExcel = [];
        that.state.dataSource.forEach(function (dataRow,index) {
            let dataObjectToPush = {};
            that.state.columns.forEach(function (column) {
                if (column.export) {
                    dataObjectToPush[column.title] = column.export(dataRow[column.dataIndex], dataRow,index);
                } else {
                    dataObjectToPush[column.title] = dataRow[column.dataIndex];
                }
            });
            dataArrayForExcel.push(dataObjectToPush);
        });
        exportToExcel(excelColumns, dataArrayForExcel, "Export" + moment());
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (<Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>),
        onFilter: (value, record) =>
            record[dataIndex] != null ? record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ),
    });
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        let that = this;
        const columns = this.state.columns.map(item => {
                if (!item.render)
                    return {...item, ...that.getColumnSearchProps(item.dataIndex)}
                return {...item};
            }
        )
        return <div>
            {this.props.hideReport ? null :
                <Row>
                    <Col>
                        <Button.Group size="small">
                            <Button disabled={this.state.loading} type="primary" onClick={this.excelExport}><Icon
                                type="file-excel"/> Excel</Button>
                            <Button disabled={this.state.loading} type="primary" onClick={this.pdfExport}><Icon
                                type="file-pdf"/> PDF</Button>
                        </Button.Group>
                    </Col>
                </Row>}
            <Row>
                <Table pagination={{
                    position: 'both',
                    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
                    showSizeChanger: true,
                    showQuickJumper: true,
                    size: "small",
                    showTotal: function (total, range) {
                        return <Tag>Showing <b>{range[0]}</b> to <b>{range[1]}</b> of <b>{total}</b> items</Tag>
                    }
                }} {...this.state} columns={columns}/>
            </Row>
        </div>
    }

}
