import React, { Component } from 'react'
import "./index.css"
import memoryUtils from "../../utils/memoryUtils.js"
import { Modal } from 'antd';
import storageUtils from "../../utils/storageUtils.js"
import { withRouter } from "react-router-dom"
import menuList from "../../config/menuConfig.js"
import { formateDate } from "../../utils/dateUtils"
import { reqWeather } from "../../api"
import LinkButton from "../../component/link-button"

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        weather: "",       //天气文本
    }

    /*
      退出登录
    */
    logout = () => {
        //显示确认提示
        Modal.confirm({
            title: '确认退出吗?',
            onOk: () => {
                //确认后，删除存储的用户信息
                //local中的
                storageUtils.removeUser()
                //内存中的
                memoryUtils.user = {}
                //跳转到登录界面
                this.props.history.replace("/login")
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    /*
      根据当前请求的path得到对应的title
    */
    getTitle = () => {
        let title = ""
        const path = this.props.location.pathname

        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }

    /*
      获取天气信息显示
    */
    getWeather = async () => {
        //发请求
        const weather = await reqWeather("重庆")
        //更新状态
        this.setState({
            weather
        })
    }

    //“挂载”生命周期函数
    componentDidMount() {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            //将currentTime更新为当前时间值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)

        //发送jsonp请求获取天气信息显示
        this.getWeather()
    }

    //"卸载"生命周期函数
    componentWilUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const user = memoryUtils.user

        const { currentTime, weather } = this.state
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username} &nbsp;&nbsp;
                    {/* 组件的标签体作为标签的children属性传入 */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
