<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-input placeholder="请输入订单号或客户名称" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="14" :offset="4" class="operate">
                    <el-button type="primary" @click="visible = true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="订单号" fixed="left"> </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1" type="warning">待审核</el-tag>
                        <el-tag v-if="scope.row.status == 2">已审核</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status == 4" type="danger">审核拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间" width="120"> </el-table-column>
                <el-table-column prop="name" label="客户名称" width="200"> </el-table-column>
                <el-table-column prop="start" label="起始城市" width="120"> </el-table-column>
                <el-table-column prop="end" label="目的城市" width="120"> </el-table-column>
                <el-table-column prop="cargo" label="货物名称"> </el-table-column>
                <el-table-column prop="count" label="件数"> </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="price" label="运费"> </el-table-column>
                <el-table-column prop="from" label="来源"> </el-table-column>
                <el-table-column prop="pay" label="支付状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.pay == 1" type="warning">未支付</el-tag>
                        <el-tag v-if="scope.row.pay == 2" type="success">已支付</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="mt fr mb"
            >
            </el-pagination>
        </el-card>
        <orders-modal :visible="visible" @hide="visible = false" @reload="loadData"></orders-modal>
    </div>
</template>

<script>
// import breadCrumb from '@/mixins/breadCrumb';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { post } from '@/utils/http';
import OrdersModal from './OrdersModal.vue';
import { mapMutations } from 'vuex';
export default {
    components: {
        BreadCrumb,
        OrdersModal,
    },
    data() {
        return {
            visible: false,
            loading: false,
            tableData: [], //表格数据
            total: 0,
            params: {
                page: 1,
                pageSize: 10,
                keyword: '',
            },
            select: [],
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.loading = true;
            const res = await post('/orderList', this.params);
            console.log(res);
            this.tableData = res.data.list;
            this.total = res.data.total;
            console.log('tabeData', this.tableData);
            this.loading = false;
        },
        handleSizeChange(pageSize) {
            this.params.pageSize = pageSize; //每页条数
            this.loadData();
        },
        handleCurrentChange(page) {
            this.params.page = page; //当前页
            this.loadData();
        },
        handleSelectionChange(selection) {
            console.log(selection);
            this.select = selection;
        },
        operate(type) {
            console.log(type);
            let nos = this.select.map(item => item.id); //获取选中的订单号
            this.$notify({
                title: '提示',
                message: `您选择了${nos.length}条订单`,
                type: 'success',
            });
        },
        deletes(id) {
            this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    post('/orderDelete', { id }).then(res => {
                        console.log(res);
                        for (let item in this.tableData) {
                            if (this.tableData[item].id == id) {
                                this.tableData.splice(item, 1);
                                // console.log('item', item);
                            }
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        // this.loadData();实际使用场景
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除',
                    });
                });
            console.log(id);
        },
        ...mapMutations(['setRow']),
        edit(row) {
            this.setRow(row);
            console.log( this.$store.state.row );
            this.visible=true
        },
    },
};
</script>

<style lang="less" scoped>
.operate {
    text-align: right;
}
</style>
