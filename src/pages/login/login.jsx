import React, { Component } from 'react'
import logo from "../../assets/images/logo.png"
import "./login.css"
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from "../../api"
import storageUtils from "../../utils/storageUtils"
import { Redirect } from "react-router-dom"
import memoryUtils from "../../utils/memoryUtils"

class Login extends Component {

    // handleSubmit = e => {
    //     //阻止事件的默认行为：阻止表单的提交
    //     console.log("a");
    //     // e.preventDefault();

    //     //取出输入的相关的数据
    //     // const form = this.props.form
    //     // const values = form.getFieldsValue()
    //     // const username = form.getFieldValue("username")
    //     // const password = form.getFieldValue("password")

    //     // console.log(values, username, password)

    //     //对表单所有字段进行统一验证
    //     this.props.form.validateFields(async (err, { username, password }) => {
    //         if (!err) {
    //             //alert('发送登录的ajax请求,username=${values.username},password=${values.password}')
    //             const result = await reqLogin(username, password)
    //             //登陆成功
    //             if (result.status === 0) {
    //                 //将user信息保存到local
    //                 const user = result.data
    //                 //localStorage.setItem("user_key", JSON.stringify(user))
    //                 storageUtils.saveUser(user)

    //                 //跳转到管理界面admin
    //                 this.props.history.replace("/admin")
    //                 message.success("登录成功！")
    //             } else {    //登录失败
    //                 message.error(result.msg)
    //             }

    //         } else {
    //             //alert("验证失败!")
    //         }
    //     })
    // }


    
    //对表单所有字段进行统一验证
    onFinish = async (values) => {
        console.log(values);
        const { username, password } = values;
        let result = await reqLogin(username, password)
        const { status, msg } = result;
        console.log(result);
        if (status === 0) {
            //将user信息保存到local中
            storageUtils.saveUser(result.data)
            //保存到内存中
            memoryUtils.user = result.data
            this.props.history.replace("/")
            message.success("登录成功！")
        } else {
            message.error(msg, 2)
        }
    }



    validatePwd = (rules, value, callback) => {
        value = value.trim()
        // （1）必须输入
        // （2）必须大于等于4位
        // （3）必须小于等于12位
        // （4）必须是英文，数字或下划线组成
        //  (5) 自定义验证
        if (!value) {
            return Promise.reject("密码必须输入")
        } else if (value.length < 4) {
            return Promise.reject("密码不能小于4位")
        } else if (value.length > 12) {
            return Promise.reject("密码不能大于12位")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject("密码必须是英文，数字或下划线组成")
        } else {
            return Promise.resolve()
        }
    }

    render() {

        //读取保存的user，如果存在，直接跳转到管理界面
        //const user = JSON.parse(localStorage.getItem("user_key") || "{}")
        const user = memoryUtils.user
        if (user._id) {
            //this.props.history.replace("/login")  //事件回调函数中进行路由跳转
            return <Redirect to="/" />  //自动跳转到指定的路由路径
        }

        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目：后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>

                    <Form onFinish={this.onFinish} className="login-form">
                        <Form.Item name="username" initialValue="" rules={[
                            // （1）必须输入
                            // （2）必须大于等于4位
                            // （3）必须小于等于12位
                            // （4）必须是英文，数字或下划线组成
                            //  (5) 声明式验证
                            { required: true, whitespace: true, message: '用户名是必须的' },
                            { min: 4, message: "用户名不能小于4位" },
                            { max: 12, message: "用户名不能大于12位" },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文，数字或下划线组成" }
                        ]}>
                            <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                placeholder="用户名" />
                        </Form.Item>

                        <Form.Item name="password" initialValue="" rules={[
                            // （1）必须输入
                            // （2）必须大于等于4位
                            // （3）必须小于等于12位
                            // （4）必须是英文，数字或下划线组成
                            //  (5) 自定义验证 
                            { validator: this.validatePwd }
                        ]}>
                            <Input
                                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                type="password"
                                placeholder="密码" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        )
    }
}



const WrapperForm = (Login)

export default WrapperForm     //<Form(Login)/>

/*
  理解Form组件：包含<Form>的组件称为<Form>组件
  Login里包含了<Form>组件，所以称为<Form>组件
  利用Form.create()包装Form组件生成一个新的组件
  新组件会向Form组件(Login)传递一个强大的属性：属性名：form，属性值对象

  高阶函数：
  定义：接收的参数是函数或者返回值是函数
  常见的：数组遍历相关的方法/定时器/Promise/高阶组件
  作用：实现一个更加强大，动态的功能

  高阶组件：
  本质是一个函数
  函数接收一个组件，返回一个新的组件
  Form.create()返回的就是一个高阶组件
*/

//const WrapperForm = Form.create()(Login)
/*  这样做的目的是利用高阶组件给Form组件Login传递了一个非常强的form对象，form对象有很多方法我们
可以利用 */

//export default WrapperForm   //暴露一个<Form(Login)/>组件

/*
  用户名/密码的合法性要求
    （1）必须输入
    （2）必须大于等于4位
    （3）必须小于等于12位
    （4）必须是英文，数字或下划线组成
*/

/*
  组件：组件类，本质就是一个构造函数
  组件对象：组件类的实例，也就是构造函数的实例
*/
