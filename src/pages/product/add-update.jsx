import React, { Component } from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Select,
    Button,
} from "antd"

import { ArrowLeftOutlined } from "@ant-design/icons"
import LinkButton from "../../component/link-button"
import { reqCategorys } from "../../api"

const { Option } = Select;

//这里的layout指定了添加/修改商品页面中Form表单 前缀和输入框所占的格子数
//例如：商品名称：(输入框),labelCol指定了商品名称：占了8个格子，输入框占了16个格子
//指定form中所有item的布局
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};



/*
  商品添加/更新的路由组件
*/
export default class Detail extends Component {

    state = {
        categorys: []
    }


    getCategorys = async () => {
        const result = await reqCategorys()
        if (result.status === 0) {
            const categorys = result.data
            this.setState({
                categorys
            })
        }
    }

    //对价格进行自定义验证
    validatePrice = (rule, value, callback) => {
        if (value === "") {
            return Promise.reject("价格必须指定")
        } else if (value * 1 <= 0) {
            return Promise.reject("价格必须大于0")
        } else {
            return Promise.resolve()
        }
    }

    onFinish = (values) => {
        const { name, desc, price, categoryId } = values
        console.log("发送请求", name, desc, price, categoryId)
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {

        const { categorys } = this.state

        const title = (
            <span>
                <LinkButton onClick={() => { this.props.history.goBack() }}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>添加商品</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form onFinish={this.onFinish} {...layout} name="control-hooks">
                    <Form.Item name="name" label="商品名称：" rules={[{ required: true, message: "必须输入商品名称！" }]}>
                        <Input placeholder="商品名称" />
                    </Form.Item>
                    <Form.Item name="desc" label="商品描述：" rules={[{ required: true, message: "必须输入商品描述！" }]}>
                        <Input placeholder="商品描述" />
                    </Form.Item>
                    <Form.Item name="price" label="商品价格：" rules={[
                        { required: true, message: "必须输入商品价格！" },
                        { validator: this.validatePrice }
                    ]}>
                        <Input type="number" placeholder="商品价格" addonAfter="元" />
                    </Form.Item>
                    <Form.Item initialValue="" name="categoryId" label="商品分类：" rules={[{ required: true, message: "必须输入商品分类！" }]}>
                        <Select>
                            <Option value="">未选择</Option>
                            {
                                categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="imgs" label="商品图片：">
                        <div>商品图片组件</div>
                    </Form.Item>
                    <Form.Item name="detail" label="商品详情：">
                        <div>商品详情组件</div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Card >
        )
    }
}
