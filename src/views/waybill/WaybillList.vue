<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6"><el-input placeholder="请输入客户名称" v-model="params.name"></el-input></el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="choseDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                    >
                    </el-date-picker
                ></el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(120)</el-radio-button>
                <el-radio-button label="3">运输中(70)</el-radio-button>
                <el-radio-button label="4">已完成(100)</el-radio-button>
                <el-radio-button label="5">运单异常(10)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号"></el-table-column>
                <el-table-column prop="date" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="cargo" label="货物名称"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="start" label="起始地"></el-table-column>
                <el-table-column prop="end" label="目的地"></el-table-column>
                <el-table-column prop="price" label="运费"></el-table-column>
                <el-table-column prop="needRecive" label="需要接货"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driver" label="司机"></el-table-column>
                <el-table-column prop="tel" label="司机电话"></el-table-column>
                <el-table-column prop="percent" label="运输进度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button size="mini" type="danger">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="fr mt mb"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="300"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { post } from '@/utils/http';
import { mapState, mapMutations } from 'vuex';

export default {
    components: {
        BreadCrumb,
    },
    // watch: {
    //     params: {
    //         handler(a, b) {
    //             console.log(a, b);
    //             console.log(this.params.date);
    //         },
    //         deep: true,
    //     },
    // },
    // updated() {
    //     this.params.startDate = this.choseDate[0];
    //     this.params.endDate = this.choseDate[1];
    //     // console.log('测试', this.params.startDate, this.params.endDate);
    // },s
    computed: mapState(['isFromDetail']),
    data() {
        return {
            tableData: [],
            choseDate: [],
            loading: false,
            params: {
                waybillNo: '',
                name: '',
                startDate: '',
                endDate: '',
                status: '1',
            },
            pageData: {
                page: 1,
                pageSize: 10,
            },
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        ...mapMutations(['changeIsFromDetail']),
        async loadData() {
            this.loading = true;
            this.params.startDate = this.choseDate[0] ? this.choseDate[0] : '';
            this.params.endDate = this.choseDate[1] ? this.choseDate[1] : '';
            const res = await post('/waybillList', { ...this.pageData, ...this.params });
            console.log(res);
            this.tableData = res.data.list;
            this.loading = false;
        },
        detail(no) {
            this.$router.push({ path: '/waybill/list/detail', query: { no } });
            // this.$router.push( '/waybill/list/detail?no=' + no)
        },
        reset() {
            this.params = {
                waybillNo: '',
                name: '',
                startDate: '',
                endDate: '',
                status: '1',
            };
            this.choseDate = [];
        },
        clearCache() {
            //清除缓存
            let vnode = this.$vnode;
            let parentVnode = vnode && vnode.parent;
            if (parentVnode && parentVnode.componentInstance && parentVnode.componentInstance.cache) {
                var key =
                    vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                          (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '')
                        : vnode.key;
                var cache = parentVnode.componentInstance.cache;
                var keys = parentVnode.componentInstance.keys;
                if (cache[key]) {
                    this.$destroy();
                    //remove key
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                            keys.splice(index, 1);
                        }
                    }
                    cache[key] = null;
                }
            }
        },
    },
    beforeRouteLeave(to, from, next) {
        // console.log('触发了routeLeave守卫');
        if (to.path == '/waybill/list/detail') {
            // from.meta.keepAlive = true;
            console.log('设计缓存了');
            this.changeIsFromDetail(true);
            // console.log('true,routeleave', from.meta.keepAlive);
        } else {
            // 如果去的不是详情页，就要清除缓存
            // console.log('false,routeleave', from.meta.keepAlive);
            // from.meta.keepAlive = false;
            //清除缓存
            console.log('清除缓存了', from.meta.keepAlive);
            this.clearCache();
            this.changeIsFromDetail(false);
        }
        next();
    },
    activated() {
        console.log('重新激活的使用', this.isFromDetail);
        //缓存页面时触发的生命周期
        //如果你上次是从详情页直接去的其他页面，主动加载一次数据
        if (!this.isFromDetail) {
            this.loadData();
            this.reset();
        }
    },
    deactivated() {
        console.log('失活的使用');
        //离开缓存页面时触发的生命周期
    },
};
</script>

<style lang="less" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100%;
    min-width: 150px;
}
</style>
