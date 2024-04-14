<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="getUrl(item.url)">{{
                item.name
            }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadList: [],
        };
    },
    created() {
        this.getBreadCrumb();
        this.getUrl();
    },
    watch: {
        //watch可以监听 data 计算属性 props $route
        $route() {
            this.getBreadCrumb();
        },
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || [];
        },
        getUrl(url) {
            console.log(this.$route.path);
            return this.$route.path == url ? '' : url;
        },
    },
};
</script>

<style lang="less" scoped></style>
