/*
  引入的菜单选项前的图标
*/
import {
    UserOutlined,
    HomeOutlined,
    SafetyCertificateOutlined,
    QrcodeOutlined,
    BarsOutlined,
    AccountBookOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: "首页",
        key: "/home",
        icon: <HomeOutlined/>,
    },

    {
        title: "商品",
        key: "/products",
        icon: <QrcodeOutlined />,
        children: [
            {
                title: "品类管理",
                key: "/category",
                icon: < BarsOutlined />,
            },
            {
                title: "商品管理",
                key: "/product",
                icon: <AccountBookOutlined />,
            },
        ]
    },

    {
        title: "用户管理",
        key: "/user",
        icon: <UserOutlined />,
    },

    {
        title: "角色管理",
        key: "/role",
        icon: <SafetyCertificateOutlined />,
    },

    {
        title: "图形图表",
        key: "/charts",
        icon: <AreaChartOutlined />,
        children: [
            {
                title: "柱形图",
                key: "/charts/bar",
                icon: < BarChartOutlined />,
            },
            {
                title: "折线图",
                key: "/charts/line",
                icon: < LineChartOutlined />,
            },
            {
                title: "饼图",
                key: "/charts/pie",
                icon: < PieChartOutlined />,
            }
        ]
    },


]

export default menuList