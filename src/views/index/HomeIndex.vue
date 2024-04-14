<template>
    <div>
        <el-row :gutter="24" style="margin-bottom: 20px" class="total">
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div class="fl">
                        <p>本月进件</p>
                        <p style="font-weight: bold">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size: 12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="out">
                    <div class="fl">
                        <p>本月放款(元)</p>
                        <p style="font-weight: bold">121000000</p>
                        <p>
                            +1.25%
                            <span style="font-size: 12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-money ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allin">
                    <div class="fl">
                        <p>累计进件</p>
                        <p style="font-weight: bold">128700</p>
                        <p>
                            +11.48%
                            <span style="font-size: 12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-date ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="allout">
                    <div class="fl">
                        <p>累计放款</p>
                        <p style="font-weight: bold">923380079</p>
                        <p>
                            -2.06%
                            <span style="font-size: 12px">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-coin ico"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="16">
                <el-card shadow="always">
                    <div slot="header" style="text-align: center" class="fl">进件统计分析</div>
                    <div style="height: 240px; width: 100%" ref="analysis"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <div slot="header" style="text-align: center" class="fl">进件统计占比</div>
                    <div style="height: 240px" ref="percent"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mt">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="height: 653.33px">
                    <el-calendar v-model="date"> </el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { get } from '@/utils/http';
export default {
    data() {
        return {
            date: new Date(),
        };
    },
    mounted() {
        this.drawLine();
        this.drawPie();
    },
    methods: {
        async drawLine() {
            // 1.准备一个窗口用来显示图表
            var myChart = echarts.init(this.$refs.analysis);
            const { data } = await get('/line');
            let keys = [];
            let values = [];
            for (let key in data) {
                keys.push(key);
                values.push(data[key]);
            }
            // 2.配置图表配置项
            const option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['Email'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: keys,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#4f88ff', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#fff', // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        data: values,
                    },
                ],
            };
            // 3.调用方法，生成图表
            myChart.setOption(option);
        },
        drawPie() {
            var myChart = echarts.init(this.$refs.percent);
            const option = {
                tooltip: {
                    trigger: 'item',
                },
                series: [
                    {
                        name: '进件分析',
                        type: 'pie',
                        radius: ['25%', '75%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 5,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 15,
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: true,
                        },
                        data: [
                            { value: 1048, name: '电子产品' },
                            { value: 735, name: '日用百货' },
                            { value: 580, name: '服装' },
                            { value: 484, name: '箱包' },
                            { value: 300, name: '鞋' },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
// .el-card {
//     padding: 0px 0px;

//     border: none !important;
// }
.ico {
    float: right;
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
}
.in {
    background: #4f88ff;
    &:hover {
        cursor: pointer;
        opacity: 0.8; //透明度
        transition: 0.5s; //动画过渡的更加顺滑
        transform: scale(1.1); //放大倍数
    }
}
.total {
    p {
        line-height: 30px;
        color: #fff;
        font-size: 16px;
    }
}
.allin {
    background: #5050ff;
    &:hover {
        cursor: pointer;
        opacity: 0.8; //透明度
        transition: 0.5s; //动画过渡的更加顺滑
        transform: scale(1.1); //放大倍数
    }
}
.allout {
    background: #f49b3b;
    &:hover {
        cursor: pointer;
        opacity: 0.8; //透明度
        transition: 0.5s; //动画过渡的更加顺滑
        transform: scale(1.1); //放大倍数
    }
}
.out {
    background: #f27075;
    &:hover {
        cursor: pointer;
        opacity: 0.8; //透明度
        transition: 0.5s; //动画过渡的更加顺滑
        transform: scale(1.1); //放大倍数
    }
}
.time p {
    color: #666;
}
</style>
