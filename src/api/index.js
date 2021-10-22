/*
  包含应用中所有请求接口的函数：接口请求函数
  函数的返回值都是promise对象
*/
import ajax from "./ajax"
import jsonp from "jsonp"    //axios不能发送jsonp请求
import { message } from "antd"
//const BASE = "http://localhost:5000"
const BASE = ""

//请求登录
/* export const reqLogin = (username, password) => (
    ajax({
        methed: "post",
        url: BASE + "/login",
        data: {    //data是对象，默认使用json格式的请求体携带参数数据
            username,
            password
        }
        // data: qs.stringify({ username, password })
    })
) */

//请求登录
export const reqLogin = (username, password) => ajax.post(BASE + "/login", { username, password })

//发送jsonp请求得到天气信息
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        //执行器函数：内部去执行异步任务，
        //成功了调用resolve(),失败了不调用reject(),直接提示错误
        const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`

        jsonp(url, {}, (error, data) => {
            if (!error && data.status === 1000) {    //成功的
                const weather = data.data.forecast[0].type
                resolve(weather)
            } else {      //失败的
                console.log(data)
                message.error("获取天气信息失败")
            }
        })
    })
}


/* const name = "admin"
const pwd = "admin"
reqLogin(name, pwd).then(result => {
    //const result = response.data
    console.log("请求成功了", result)
}) */
//将实参数据赋值形参变量


//获取分类信息
//export const reqCategorys = () => ajax.get(BASE + "/manage/category/list")
/*export const reqCategorys = () => ajax({
    //method:"GET",
    url: BASE + "/manage/category/list"
})*/
export const reqCategorys = () => ajax(BASE + "/manage/category/list")

//添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + "/manage/category/add", {
    categoryName
})

//修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post(BASE + "/manage/category/update", {
    categoryId,
    categoryName
})

//根据分类id获取分类
export const reqCategory = (categoryId) => ajax(BASE + "/manage/category/info", {
    params: {
        categoryId
    }
})

/* 获取商品分页列表 */
export const reqProducts = (pageNum, pageSize) => ajax(BASE + "/manage/product/list", {
    params: {    //包含所有query参数的对象
        pageNum,
        pageSize
    }
})

/* 根据name/desc搜索产品分页列表*/
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType,  //它的值是"productName"或者"productDesc"
}) => ajax(BASE + "/manage/product/search", {
    //method:"GET",
    params: {
        pageNum,
        pageSize,
        [searchType]: searchName,
    }
})

/* 对商品进行上架/下架处理 */
export const reqUpdateStatus = (productId, status) => ajax(BASE + "/manage/product/updateStatus", {
    method: "POST",
    data: {
        productId,
        status
    }
})