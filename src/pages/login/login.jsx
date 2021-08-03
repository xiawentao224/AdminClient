import React, { Component } from 'react'
import logo from "./images/logo.jfif"
import "./login.less"

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目：后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <div>Form组件界面</div>
                </div>
            </div>
        )
    }
}
