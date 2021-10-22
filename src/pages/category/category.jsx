import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal, Form, Input } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import LinkButton from "../../component/link-button"
import { reqAddCategory, reqCategorys, reqUpdateCategory } from "../../api"

/*
  分类管理
*/
export default class Category extends Component {

    formRef = React.createRef()

    state = {
        categorys: [],    //所有分类的数组
        loading: false,    //是否正在请求加载中
        showStatus: 0,    //0:不显示，1：显示添加，2：显示修改
    }

    /*
      初始化所有列信息的数组
    */
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 400,
                render: (category) => <LinkButton onClick={() => {
                    this.category = category   //保存当前分类，其他地方都可以读取到
                    console.log(this.category.name)
                    this.setState({ showStatus: 2 })
                }}>修改分类</LinkButton>
            },
        ];
    }

    /*
      异步获取分类列表显示
    */
    getCategorys = async () => {
        //显示loading
        this.setState({ loading: true })
        //发异步ajax请求
        const result = await reqCategorys()
        //隐藏loading
        this.setState({ loading: false })
        if (result.status === 0) {   //成功了
            //取出分类列表
            const categorys = result.data
            //更新状态categorys数据
            this.setState({
                categorys
            })
        } else {
            message.error("获取分类列表失败了")
        }
    }

    /*
      点击确定的回调：去添加/修改分类
    */
    handleOk = () => {

        // //进行表单验证
        // this.form.validateFields(async (err, values) => {
        //     if (!err) {
        //         //验证通过后，得到输入数据
        //         const { categoryName } = values
        //         //发添加分类的请求
        //         const result = await reqAddCategory(categoryName)

        //         this.setState({ showStatus: 0 })

        //         //根据响应结果，做不同处理
        //         if (result.status === 0) {
        //             //重新获取分类列表显示
        //             this.getCategorys()
        //             message.success("添加分类成功")
        //         } else {
        //             message.error("添加分类失败")
        //         }
        //     }
        // })

        //进行表单验证
        this.formRef.current.validateFields().then(async values => {
            console.log(values)
            const { categoryName } = values
            const { showStatus } = this.state
            let result

            if (showStatus === 1) {
                //发添加分类的请求
                result = await reqAddCategory(categoryName)
            } else {
                //发修改分类的请求
                const categoryId = this.category._id
                result = await reqUpdateCategory({ categoryId, categoryName })
            }

            this.setState({ showStatus: 0 })

            const action = showStatus === 1 ? "添加" : "修改"

            //根据响应结果，做不同处理
            if (result.status === 0) {
                //重新获取分类列表显示
                this.getCategorys()
                message.success(action + "分类成功")
            } else {
                message.error(action + "分类失败")
            }
        }).catch(error => {
            const { showStatus } = this.state
            const action = showStatus === 1 ? "添加" : "修改"
            message.error(action + "分类失败")
        })

    }

    /*
      点击取消的回调
    */
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    //第一次render()前调用，为第一次渲染准备数据
    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {

        //取出状态数据
        const { categorys, loading, showStatus } = this.state

        // //读取更新的分类名称
        // const category = this.category || {}

        //Card右上角的结构
        const extra = (
            <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card extra={extra}>
                <Table
                    rowKey="_id"
                    columns={this.columns}
                    dataSource={categorys}
                    bordered
                    loading={loading}
                    pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                />

                <Modal title={showStatus === 1 ? "添加分类" : "修改分类"}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>

                    <Form
                        ref={this.formRef}
                    >
                        <Form.Item name="categoryName" initialValue="" rules={[
                            { required: true, message: '分类名称必须输入' }
                        ]}>
                            <Input type="text" placeholder="请输入分类名称" />
                        </Form.Item>
                    </Form>

                </Modal>
            </Card>
        )
    }
}
