/*
  应用根组件
*/
import React from "react"
import { message } from "antd"
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from "./pages/login/login.jsx"
import Admin from "./pages/admin/admin.jsx"

export default class App extends React.Component {

    handleClick = () => {
        message.success("成功啦...")
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </HashRouter>
        )
    }
}
