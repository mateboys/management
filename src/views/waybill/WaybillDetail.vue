<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="card">
            <el-row :gutter="24">
                <el-col :span="18" class="info" style="text-align: left">
                    <span> 运单编号:WX2000090520010508 </span>
                    <span>创建时间:2022-08-24</span>
                    <span>审核员:刘希航</span>
                </el-col>
                <el-col :span="6" style="text-align: right">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="未发货"></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="card">
            <h1>基础信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>客户名称:中科南京移动通信与计算创新研究院</p>
                    <p>起始城市:口罩</p>
                    <p>数量:9(吨)</p>
                </el-col>
                <el-col :span="6">
                    <p>是否是易燃晚爆物品:不是</p>
                    <p>结算方式:现付</p>
                    <p>运费:12000元</p>
                </el-col>
                <el-col :span="6">
                    <p>发货单据:暂未上传</p>
                    <p>接货单据:暂未上传</p>
                    <p>所属业务员:刘希航</p>
                </el-col>
                <el-col :span="6">
                    <p>客户下间时间:2022-06-05</p>
                    <p>是否需要接货:不需要</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>运输信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>车牌号:京A12345</p>
                    <p>司机姓名:王五</p>
                </el-col>
                <el-col :span="6">
                    <p>司机电话:17551056293</p>
                    <p>司机地址:北京市朝阳区</p>
                </el-col>
                <el-col :span="6">
                    <p>司机身份证号:257896547854123698</p>
                    <p>所属公司:晶上运输公司</p>
                </el-col>
                <el-col :span="6">
                    <p>预计运输时间:8天</p>
                    <p>违约金:5000</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <h1>经办人员信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>业务员:张三</p>
                </el-col>
                <el-col :span="6">
                    <p>审核员:李四</p>
                </el-col>
                <el-col :span="6">
                    <p>制单员:王五</p>
                </el-col>
                <el-col :span="6">
                    <p>备注:无备注</p>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
/**
 * <keep-alive></keep-alive> 保持组件状态 缓存组件
 * 1.可以是组件component
 * 2.可以是router-view
 */
import BreadCrumb from '@/components/BreadCrumb';
import { mapMutations } from 'vuex';
export default {
    methods: {
        ...mapMutations(['changeIsFromDetail']),
        back() {
            this.$router.push('/waybill/list');
        },
    },
    components: {
        BreadCrumb,
    },
    beforeRouteLeave(to, from, next) {
        if (to.path == '/waybill/list') {
            //做一个标记
            this.changeIsFromDetail(true);
            // to.meta.keepAlive = true;
        } else {
            this.changeIsFromDetail(false);
            // to.meta.keepAlive = false;
        }
        next();
    },
};
</script>

<style lang="less" scoped>
.info span {
    line-height: 40px;
    text-align: left;
    margin: 0 8px;
}
.product-detail p {
    text-align: left;
    line-height: 40px;
    padding: 10px;
}
h1 {
    text-align: left;
    margin: 20px 0;
}
.card {
    margin-top: 20px;
}
</style>
