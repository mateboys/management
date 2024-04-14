<template>
    <div>
        <el-container>
            <div class="side">
                <el-aside width="200px" class="aside">
                    <nav-left></nav-left>
                </el-aside>
            </div>
            <el-container>
                <el-header class="head">
                    <top-header></top-header>
                </el-header>
                <div class="mainDiv">
                    <el-main class="main">
                        <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </el-main>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader.vue';
export default {
    components: {
        NavLeft,
        TopHeader,
    },
};
</script>

<style lang="less" scoped>
.head {
    background-color: #fff;
    padding: 0;
    box-shadow: 0 2px 2px rgba(0, 21, 41, 0.1);
    line-height: 60px;
    z-index: 999;
}
.mainDiv {
    // z-index: 9999
    height: 90vh;
    overflow: scroll;
}
.side {
    background: #001529;
    // z-index: 9999;
    height: 100vh;
    width: 200px;
    // overflow-y: scroll;
}
.aside {
    background: #001529;
    height: 100%;
    // width: 220px;
    overflow-x: hidden;
    overflow-y: scroll;
    // overflow-y: scroll;
    // overflow: scroll;
    // position: fixed;
}
// 设置高度占满全屏  html,body,#app,.el-container,.el-aside都要设置height:100%;
html,
body,
#app,
.el-container {
    height: 100%;
}
.main {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f3f7fa;
    // z-index: -1;
}
.foot {
    // height: 60px;
    text-align: center;
    color: #999;
    font-size: 12px;
    line-height: 60px;
    z-index: -1;
}
</style>
