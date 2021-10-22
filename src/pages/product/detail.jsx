import React, { Component } from 'react'
import {
    Card,
    Icon,
    List,
} from "antd"

import { ArrowLeftOutlined } from "@ant-design/icons"
import LinkButton from "../../component/link-button"
import "./detail.css"
import memoryUtils from "../../utils/memoryUtils"
import { Redirect } from "react-router-dom"
import { BASE_IMG } from "../../utils/Constants"
import { reqCategory } from "../../api/index"

/*
  商品详情路由组件
*/
export default class Detail extends Component {

    state = {
        categoryName: "",  //分类名称
    }

    //根据分类id获取分类名称
    getCategory = async (categoryId) => {
        const result = await reqCategory(categoryId)
        if (result.status === 0) {
            const categoryName = result.data.name
            this.setState({
                categoryName
            })
        }
    }

    componentDidMount() {
        const product = memoryUtils.product
        if (product._id) {
            this.getCategory(product.categoryId)
        }
    }

    render() {

        const { categoryName } = this.state

        const product = memoryUtils.product
        if (!product || !product._id) {
            return <Redirect to="/product" />
        }

        const title = (
            <span>
                <LinkButton onClick={() => { this.props.history.goBack() }}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className="detail">
                <List>
                    <List.Item>
                        <span className="detail-left">商品名称：</span>
                        <span className="detail-right">{product.name}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品描述：</span>
                        <span className="detail-right">{product.desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品价格：</span>
                        <span className="detail-right">{product.price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">所属分类：</span>
                        <span className="detail-right">{categoryName}</span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品图片：</span>
                        <span className="detail-right">
                            {/* {  此视频所提供的图片连接均已失效
                                product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
                            } */}
                            <img className="detail-img" src="http://localhost:5000/upload/image-1563347343433.jpg" alt="img" />
                            <img className="detail-img" src="http://localhost:5000/upload/image-1563347343433.jpg" alt="img" />
                            <img className="detail-img" src="http://localhost:5000/upload/image-1563347343433.jpg" alt="img" />
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className="detail-left">商品详情：</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
