import React, { Component } from 'react'
import { Redirect, Switch, Route } from "react-router-dom"
import memoryUtils from "../../utils/memoryUtils"
import { Layout } from 'antd';
import LeftNav from "../../component/left-nav"
import Header from "../../component/header"

import Home from "../home/home.jsx"
import Category from "../category/category.jsx"
import Product from "../product/product.jsx"
import Role from "../role/role.jsx"
import User from "../user/user.jsx"
import Bar from "../charts/bar.jsx"
import Line from "../charts/line.jsx"
import Pie from "../charts/pie.jsx"

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {

        //读取保存的user，如果不存在，直接跳转到登录界面
        //const user = JSON.parse(localStorage.getItem("user_key") || "{}")
        const user = memoryUtils.user
        if (!user._id) {
            //this.props.history.replace("/login")  //事件回调函数中进行路由跳转
            return <Redirect to="/login" />  //自动跳转到指定的路由路径
        }

        return (
            <Layout style={{ height: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ background: "white" }}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: "center", color: "rgba(0,0,0,0.5)" }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
