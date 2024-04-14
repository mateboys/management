import Mock from 'mockjs';
/**
 * 模拟网络请求延时
 * author:刘希航 <mateboy@foxmail.com>
 */
Mock.setup({
    timeout: 500,
});
/**
 * 登录接口
 * author:刘希航 <mateboy@foxmail.com>
 * @param {String} url
 * @param {'get'|'post'} method
 * @param {Object} req
 */
Mock.mock('http://localhost:8080/login', 'post', req => {
    const { username, password } = JSON.parse(req.body);
    if (username === 'admin' && password === '123456') {
        return {
            code: 200,
            success: true,
            msg: '登录成功',
            nickname: '刘希航',
            //token:令牌
            token: '546L5qyj5oiR5Zac5qyi5L2g',
            role: 'administration',
        };
    } else {
        return {
            code: 100,
            msg: '账号或密码错误',
            data: {},
        };
    }
});
/**
 * 入职日期接口
 * author:刘希航 <mateboy@foxmail.com>
 */
Mock.mock('http://localhost:8080/in', 'get', () => {
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        time: '2021-09-05 00:00:00',
    };
});
/**
 * 菜单接口
 * author:刘希航 <mateboy@foxmail.com>
 */
const menuList = [
    {
        name: '首页',
        icon: 'el-icon-s-home',
        url: '/index',
    },
    {
        name: '订单管理',
        icon: 'el-icon-s-order',
        url: '/orders',
        children: [
            {
                name: '订单列表',
                icon: 'el-icon-user',
                url: '/orders/list',
            },
        ],
    },
    {
        name: '运单管理',
        icon: 'el-icon-menu',
        url: '/waybill',
        children: [
            {
                name: '运单录入',
                icon: 'el-icon-notebook-2',
                url: '/waybill/in',
            },
            {
                name: '运单列表',
                icon: 'el-icon-truck',
                url: '/waybill/list',
            },
        ],
    },
    {
        name: '发车管理',
        icon: 'el-icon-s-order',
        url: '/depart',
        children: [
            {
                name: '发车数据单',
                icon: 'el-icon-tickets',
                url: '/depart/data',
            },
        ],
    },
    {
        name: '承运商管理',
        icon: 'el-icon-user',
        url: '/carrier',
        children: [
            {
                name: '承运商列表',
                icon: 'el-icon-chat-square',
                url: '/carrier/list',
            },
            {
                name: '车辆列表',
                icon: 'el-icon-bank-card',
                url: '/carrier/trucks',
            },
            {
                name: '承运司机列表',
                icon: 'el-icon-bank-card',
                url: '/carrier/list',
            },
        ],
    },
    {
        name: '客户管理',
        icon: 'el-icon-chat-dot-square',
        url: '/customer',
    },
    {
        name: '财务管理',
        icon: 'el-icon-user',
        url: '/my',
        children: [
            {
                name: '客户对账单',
                icon: 'el-icon-chat-square',
                url: '/customer/info',
            },
            {
                name: '承运商对账单',
                icon: 'el-icon-bank-card',
                url: '/record',
            },
            {
                name: '承运司机列表',
                icon: 'el-icon-bank-card',
                url: '/record',
            },
        ],
    },
    {
        name: '个人中心',
        icon: 'el-icon-chat-dot-square',
        url: 'personal',
    },
];
Mock.mock('http://localhost:8080/menu', 'get', () => {
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: menuList,
    };
});
/**
 * 折线图表接口
 * author:刘希航
 */
Mock.mock('http://localhost:8080/line', 'get', () => {
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: {
            // 120, 132, 101, 134, 90, 230, 210
            '22-01': 120,
            '22-02': 132,
            '22-03': 101,
            '22-04': 134,
            '22-05': 90,
            '22-06': 230,
            '22-07': 210,
        },
    };
});
/**
 * 订单列表接口
 * author:刘希航
 */
Mock.mock('http://localhost:8080/orderList', 'post', req => {
    const { page, pageSize, keyword } = JSON.parse(req.body); // current page
    // current limit
    //2 100
    console.log('接口接收到参数', page, pageSize, keyword);
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    'id|+1': 10000, //订单号
                    'status|1': [1, 2, 3, 4], //订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                    date: Mock.Random.date(), //下单时间
                    'name|1': [
                        '诺来科技有限公司',
                        '光华股份有限公司',
                        '中科晶上通信技术有限公司',
                        '中科南京移动通信与计算创新研究院',
                        '华为科技有限公司',
                    ], //客户名称
                    start: Mock.Random.city(true), //起始城市
                    end: Mock.Random.city(true), //目的城市
                    'cargo|1': ['电子产品', '服装', '食品', '日用品', '化妆品', '建材', '生鲜'], //货物名称
                    count: Mock.Random.integer(1, 200), //件数
                    'unit|1': ['箱', '件', '吨'], //单位
                    price: Mock.Random.float(1000, 10000, 2, 2), //运费
                    'from|1': ['移动端', 'PC端'], //来源
                    'pay|1': [1, 2], //支付状态 1已支付 2未支付
                },
            ],
            total: 500,
        }),
    };
});
Mock.mock('http://localhost:8080/orderDelete', 'post', req => {
    const { page, pageSize, keyword } = JSON.parse(req.body); // current page
    // current limit
    //2 100
    console.log('接口接收到参数', page, pageSize, keyword);
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    'id|+1': 10000, //订单号
                    'status|1': [1, 2, 3, 4], //订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                    date: Mock.Random.date(), //下单时间
                    'name|1': [
                        '诺来科技有限公司',
                        '光华股份有限公司',
                        '中科晶上通信技术有限公司',
                        '中科南京移动通信与计算创新研究院',
                        '华为科技有限公司',
                    ], //客户名称
                    start: Mock.Random.city(true), //起始城市
                    end: Mock.Random.city(true), //目的城市
                    'cargo|1': ['电子产品', '服装', '食品', '日用品', '化妆品', '建材', '生鲜'], //货物名称
                    count: Mock.Random.integer(1, 200), //件数
                    'unit|1': ['箱', '件', '吨'], //单位
                    price: Mock.Random.float(1000, 10000, 2, 2), //运费
                    'from|1': ['移动端', 'PC端'], //来源
                    'pay|1': [1, 2], //支付状态 1已支付 2未支付
                },
            ],
            total: 500,
        }),
    };
});
// 订单管理-新建订单
Mock.mock('http://localhost:8080/addOrder', 'post', req => {
    const { name, start, end, cargo, count, unit, price, from, pay } = JSON.parse(req.body);
    console.log('接口接收到参数', name, start, end, cargo, count, unit, price, from, pay);
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: {
            id: Mock.Random.integer(10000, 99999), //订单号
        },
    };
});
//运单管理-运单列表
Mock.mock('http://localhost:8080/waybillList', 'post', req => {
    const { page, pageSize, waybillNo, name, startDate, endDate, status } = JSON.parse(req.body); // current page
    console.log('接口接收到参数', page, pageSize, waybillNo, name, startDate, endDate, status);
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    'no|+1': 10000, //运单号
                    date: Mock.Random.date(), //下单时间
                    'name|1': [
                        '诺来科技有限公司',
                        '光华股份有限公司',
                        '中科晶上通信技术有限公司',
                        '中科南京移动通信与计算创新研究院',
                        '华为科技有限公司',
                    ], //客户名称
                    'cargo|1': ['日用品', '纺织品', '生鲜', '建材', '电器'], //货物名称
                    count: Mock.Random.integer(1, 200), //件数
                    start: Mock.Random.city(true), //起始城市
                    end: Mock.Random.city(true), //目的城市
                    price: Mock.Random.float(1000, 10000, 2, 2), //运费
                    'needRecive|1': [1, 2], //是否需要接货 1是 2否
                    'plateNumber|1': ['苏A88888', '苏A66666', '苏A99999', '苏A77777', '苏A55555'], //车牌号
                    driver: Mock.Random.cname(), //司机姓名
                    'tel|1': ['13888888888', '13999999999', '13777777777', '13666666666', '13555555555'], //司机电话
                    'percent|1': [37, 22, 89, 65, 80, 74, 56],
                },
            ],
            total: 500,
        }),
    };
});
//根据token获取权限名字
Mock.mock('http://localhost:8080/getRole', 'get', () => {
    return {
        code: 200,
        success: true,
        msg: '请求成功',
        role: 'administration',
    };
});
