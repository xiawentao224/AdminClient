import React, { Component } from 'react'

import "./index.css"
import { Link, withRouter } from "react-router-dom"
import logo from "../../assets/images/logo.png"
import { Menu } from 'antd';
import menuList from "../../config/menuConfig"

const { SubMenu } = Menu;


/*
  左侧导航组件
*/
class LeftNav extends Component {

    /*
      根据指定menu数据数组生成<Menu.Item>和<SubMenu>的数组
      map + 函数递归
    */
    getMenuNodes = (menuList) => {

        //请求的路径
        const path = this.props.location.pathname

        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }


            /*
              判断当前item的key是否是我需要的openKey
              查找item的所有children中cItem的key,看是否有一个跟请求的path匹配
            */
            const cItem = item.children.find(cItem => cItem.key === path)
            if (cItem) {
                this.openKey = item.key
            }

            return (  //有下一级的菜单项

                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            )

        })
    }

    /*
      第一次render()之前执行一次
      为第一次render()做一些同步的准备工作
    */

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        //得到当前请求的路由路径
        const selectKey = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>

                {/*
                  defaultSelectedKey:总是根据第一次指定的key进行显示
                  selectedKey:总是根据最新指定的key进行显示
                */}

                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                    {/* <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to="/home">
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="/products" icon={<QrcodeOutlined />} title="商品">
                        <Menu.Item key="/category" icon={< BarsOutlined />}>
                            <Link to="/category">
                                品类管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product" icon={<AccountBookOutlined />}>
                            <Link to="/product">
                                商品管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user" icon={<UserOutlined />}>
                        <Link to="/user">
                            用户管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<SafetyCertificateOutlined />}>
                        <Link to="/role">
                            角色管理
                        </Link>
                    </Menu.Item>
                    <SubMenu key="/charts" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="/charts/bar" icon={< BarChartOutlined />}>
                            <Link to="/charts/bar">
                                柱形图
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/line" icon={< LineChartOutlined />}>
                            <Link to="/charts/line">
                                折线图
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/charts/pie" icon={< PieChartOutlined />}>
                            <Link to="/charts/pie">
                                饼图
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}

/* 
  向外暴露  使用高阶组件withRouter()来包装非路由组件
  新组件向LeftNav传递3个特别属性：history/location/match
  结果：LeftNav可以操作路由相关语法了
*/
export default withRouter(LeftNav)

/*
  2个问题
  1.默认选中对应的menuItem
  2.有可能需要默认打开某个SubMenu:访问的是某个二级菜单项对应的path
*/

