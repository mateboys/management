<template>
    <div>
        <div class="center fr">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" @mouseover="isShow(true)" @mouseleave="isShow(false)"
                    >欢迎您,{{ info }}<i class="el-icon-arrow-down el-icon--right" ref="icon"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <p class="date fr">
            今天是你在阿里的第
            <span class="tips">{{ days }}</span
            >天
        </p>
        <div class="clear"></div>
    </div>
</template>

<script>
import { get } from '@/utils/http';
import { removeTkoen } from '@/utils/auth';
export default {
    data() {
        return {
            info: sessionStorage.getItem('nickname'),
            time: 0,
        };
    },
    created() {
        this.workTime();
    },
    methods: {
        handleCommand(item) {
            if (item === 'exit') {
                removeTkoen();
                this.$router.push({ path: '/login' });
            }
        },
        isShow(event) {
            event
                ? (this.$refs.icon.classList.value = 'el-icon-arrow-up el-icon--right')
                : (this.$refs.icon.classList.value = 'el-icon-arrow-down el-icon--right');
            // this.$refs.icon.classList.value == 'el-icon-arrow-down el-icon--right'
            //     ? (this.$refs.icon.classList.value = 'el-icon-arrow-up el-icon--right')
            //     : (this.$refs.icon.classList.value = 'el-icon-arrow-down el-icon--right');
            // console.log(this.$refs.icon);
        },
        /**
         * 获取入职时间
         * author:刘希航 <mateboy@foxmail.com>
         */
        workTime() {
            get('/in').then(res => {
                this.time = res.time;
            });
            // get("in").then(({time}) => {
            //    this.time=time
            // });
        },
    },
    computed: {
        days() {
            let now = new Date();
            let target = this.time ? new Date(this.time) : new Date();
            return Math.floor((now - target) / 1000 / 60 / 60 / 24);
        },
    },
};
</script>

<style lang="less" scoped>
.center {
    margin-right: 20px;
}
.date {
    margin-right: 50px;
    .tips {
        font-size: 24px;
        color: #5696ff;
    }
}
</style>
