export default {
    data() {
        return {
            breadList: [],
        };
    },
    created() {
        this.getBreadCrumb();
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
    },
};
