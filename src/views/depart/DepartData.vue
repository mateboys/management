<template>
    <div>
        <bread-crumb></bread-crumb>
        <transition name="fade" :appear="true">
            <el-card class="mt">
                <el-row :gutter="24">
                    <el-col :span="15">
                        <el-row :gutter="24">
                            <el-col :span="8"><el-input></el-input></el-col>
                            <el-col :span="8"> <el-input></el-input></el-col>
                            <el-col :span="8"> <el-input></el-input></el-col>
                        </el-row>
                        <transition name="fade" :appear="true">
                            <el-row :gutter="24" class="mt" v-show="show">
                                <el-col :span="8"><el-input></el-input></el-col>
                                <el-col :span="8"> <el-input></el-input></el-col>
                                <el-col :span="8"> <el-input></el-input></el-col>
                            </el-row>
                        </transition>
                    </el-col>
                    <el-col :span="3" class="tl">
                        <el-dropdown>
                            <span class="el-dropdown-link" @click="expand">
                                {{ show ? '收起' : '展开'
                                }}<i :class="`el-icon-arrow-${show ? 'up' : 'down'} el-icon--right`" ref="icon"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown"> </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="6" class="tr">
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary">重置</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </transition>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb';
export default {
    components: {
        BreadCrumb,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        expand() {
            this.show = !this.show;
            //控制箭头方法 有点小菜
            // this.$refs.icon.classList.value = this.show
            //     ? 'el-icon-arrow-up el-icon--right'
            //     : 'el-icon-arrow-down el-icon--right';
            // console.log(this.$refs.icon);
        },
    },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
    color: #409eff;
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 15px;
}
.fade-enter-active,
.fade-leave-active {
    transition: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: scale(0.1); //放大倍数
}
</style>
