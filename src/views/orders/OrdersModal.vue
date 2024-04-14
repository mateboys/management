<template>
    <div>
        <el-dialog :title="title" :visible="visible" width="50%" :before-close="cancel">
            <el-row :gutter="24">
                <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="起始城市" prop="start">
                            <el-input v-model.trim="ruleForm.start"></el-input>
                        </el-form-item>
                        <el-form-item label="目的城市" prop="end">
                            <el-input v-model.trim="ruleForm.end"></el-input>
                        </el-form-item>
                        <el-form-item label="货物名称" prop="cargo">
                            <el-input v-model.trim="ruleForm.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="件数" prop="count">
                            <el-input v-model.number="ruleForm.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model.trim="ruleForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="运费" prop="price">
                            <el-input v-model.trim="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="订单来源" prop="from">
                            <el-select v-model="ruleForm.from" placeholder="请选择支付方式" filterable>
                                <el-option label="移动端" value="移动端"></el-option>
                                <el-option label="PC端" value="PC端"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否支付" prop="pay">
                            <el-radio-group v-model="ruleForm.pay">
                                <el-radio :label="1">未支付</el-radio>
                                <el-radio :label="2">已支付</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { post } from '@/utils/http';
import { mapState, mapMutations } from 'vuex';
export default {
    props: ['visible'],
    computed: {
        ...mapState(['row']),
    },
    watch: {
        visible() {
            const { name, start, end, cargo, count, unit, price, from, pay } = this.row;
            this.ruleForm = {
                name, //客户名称
                from, //订单来源
                pay, //是否支付
                unit, //单位
                start, //起始城市
                end, //目的城市
                cargo, //货物名称
                count, //件数
                price, //运费
            };
            this.title = name ? '编辑订单' : '添加订单';
        },
    },
    methods: {
        ...mapMutations(['clearRow']),
        close() {
            this.$refs.ruleForm.resetFields(); //重置表单
            this.$emit('hide'); //触发父组件的close事件
            this.clearRow(); //清空vuex中的row
        },
        cancel() {
            this.close();
            this.$message({
                message: '您已取消编辑',
                type: 'warning',
            });
        },
        save() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    post('addOrder', this.ruleForm).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                            });
                            this.close();
                            this.$emit('reload'); //触发父组件的reload事件
                        } else {
                            this.$message({
                                message: '操作失败',
                                type: 'error',
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
    },
    data() {
        return {
            title: '',
            ruleForm: {
                name: '', //客户名称
                from: 'PC端', //订单来源
                pay: 1, //是否支付
                unit: '吨', //单位
                start: '', //起始城市
                end: '', //目的城市
                cargo: '', //货物名称
                count: '', //件数
                price: '', //运费
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                start: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                end: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                cargo: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                pay: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                count: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^[0-9]*$/, //只能是数字
                        message: '输入内容只能为数字',
                        trigger: 'blur',
                    },
                ],
                unit: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
                from: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'change',
                    },
                ],
                price: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
};
</script>

<style lang="less" scoped></style>
