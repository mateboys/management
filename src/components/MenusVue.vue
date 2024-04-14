<template>
    <div>
        <el-submenu v-if="menu.children" :index="menu.url" class="mitem">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </template>
            <nav-menu
                v-for="(item, index) in menu.children"
                :key="index"
                :menu="item"
                :index="menu.url"
                class="mitem"
            ></nav-menu>
        </el-submenu>
        <el-menu-item v-else :index="menu.url" class="mitem">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: 'NavMenu', //组件自己调用自己的时候才有用
    props: {
        //组件间传值 父向子传值
        menu: {
            type: Object,
            required: true, //必须传入
        },
        // props:['menu']
    },
};
</script>

<style lang="less" scoped>
.mitem {
    width: 200px;
}
</style>
