<template>
<div class="content" :style='{"minHeight":"100vh","padding":"0 30px"}'>
	<div class="text" :style='{"margin":"50px auto","fontSize":"24px","color":"rgb(51, 51, 51)","textAlign":"center","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
    <div class="cardView">
        <div class="cards" :style='{"margin":"0 0 20px 0","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
			<div :style='{"boxShadow":"0 1px 6px rgba(0,0,0,.3)","margin":"3px 10px","borderRadius":"40px","display":"flex"}' v-if="isAuth('bingxiangxinxi','首页总数')">
				<div :style='{"width":"80px","background":"#ffc523","height":"80px"}'></div>
				<div :style='{"width":"160px","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#333","fontWeight":"bold","height":"24px"}'>{{bingxiangxinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"16px","color":"#666","height":"24px"}'>冰箱信息总数</div>
				</div>
			</div>
			<div :style='{"boxShadow":"0 1px 6px rgba(0,0,0,.3)","margin":"3px 10px","borderRadius":"40px","display":"flex"}' v-if="isAuth('zhinengjiaju','首页总数')">
				<div :style='{"width":"80px","background":"#ffc523","height":"80px"}'></div>
				<div :style='{"width":"160px","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#333","fontWeight":"bold","height":"24px"}'>{{zhinengjiajuCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"16px","color":"#666","height":"24px"}'>智能家居总数</div>
				</div>
			</div>
        </div>
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('bingxiangxinxi','首页统计')">
                <div id="bingxiangxinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('bingxiangxinxi','首页统计')">
                <div id="bingxiangxinxiChart2" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('bingxiangxinxi','首页统计')">
                <div id="bingxiangxinxiChart3" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('bingxiangxinxi','首页统计')">
                <div id="bingxiangxinxiChart4" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('bingxiangxinxi','首页统计')">
                <div id="bingxiangxinxiChart5" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('zhinengjiaju','首页统计')">
                <div id="zhinengjiajuChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('zhinengjiaju','首页统计')">
                <div id="zhinengjiajuChart2" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: ;margin: 0 10px;" v-if="isAuth('zhinengjiaju','首页统计')">
                <div id="zhinengjiajuChart3" style="width:100%;height:400px;"></div>
            </el-card>
        </div>
    </div>
</div>
</template>
<script>
//8
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
            bingxiangxinxiCount: 0,
            zhinengjiajuCount: 0,
		};
	},
  mounted(){
    this.init();
    this.getbingxiangxinxiCount();
    this.bingxiangxinxiChat1();
    this.bingxiangxinxiChat2();
    this.bingxiangxinxiChat3();
    this.bingxiangxinxiChat4();
    this.bingxiangxinxiChat5();
    this.getzhinengjiajuCount();
    this.zhinengjiajuChat1();
    this.zhinengjiajuChat2();
    this.zhinengjiajuChat3();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    },
    getbingxiangxinxiCount() {
        this.$http({
            url: `bingxiangxinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.bingxiangxinxiCount = data.data
            }
        })
    },

    bingxiangxinxiChat1() {
      this.$nextTick(()=>{

        var bingxiangxinxiChart1 = echarts.init(document.getElementById("bingxiangxinxiChart1"),'macarons');
        this.$http({
            url: `bingxiangxinxi/value/spmc/jiage`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].spmc);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].spmc
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '冰箱价格',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:70
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                bingxiangxinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    bingxiangxinxiChart1.resize();
                };
            }
        });
      })
    },

    bingxiangxinxiChat2() {
      this.$nextTick(()=>{

        var bingxiangxinxiChart2 = echarts.init(document.getElementById("bingxiangxinxiChart2"),'macarons');
        this.$http({
            url: "bingxiangxinxi/group/pinpai",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].pinpai);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].pinpai
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '冰箱品牌',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                bingxiangxinxiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    bingxiangxinxiChart2.resize();
                };
            }
        });
      })
    },

    bingxiangxinxiChat3() {
      this.$nextTick(()=>{

        var bingxiangxinxiChart3 = echarts.init(document.getElementById("bingxiangxinxiChart3"),'macarons');
        this.$http({
            url: "bingxiangxinxi/group/nxdj",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].nxdj);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].nxdj
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '冰箱能效等级',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                bingxiangxinxiChart3.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    bingxiangxinxiChart3.resize();
                };
            }
        });
      })
    },


    bingxiangxinxiChat4() {
      this.$nextTick(()=>{

        var bingxiangxinxiChart4 = echarts.init(document.getElementById("bingxiangxinxiChart4"),'macarons');
        this.$http({
            url: "bingxiangxinxi/group/mks",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].mks);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].mks
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '冰箱款式',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'line',
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                bingxiangxinxiChart4.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    bingxiangxinxiChart4.resize();
                };
            }
        });
      })
    },

    bingxiangxinxiChat5() {
      this.$nextTick(()=>{

        var bingxiangxinxiChart5 = echarts.init(document.getElementById("bingxiangxinxiChart5"),'macarons');
        this.$http({
            url: "bingxiangxinxi/group/zlfs",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].zlfs);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].zlfs
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '制冷方式',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: ['25%', '55%'],
                                roseType: 'area',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                bingxiangxinxiChart5.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    bingxiangxinxiChart5.resize();
                };
            }
        });
      })
    },

    getzhinengjiajuCount() {
        this.$http({
            url: `zhinengjiaju/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.zhinengjiajuCount = data.data
            }
        })
    },

    zhinengjiajuChat1() {
      this.$nextTick(()=>{

        var zhinengjiajuChart1 = echarts.init(document.getElementById("zhinengjiajuChart1"),'macarons');
        this.$http({
            url: "zhinengjiaju/sectionStat/haopingshu",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].haopingshu);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].haopingshu
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '好评情况',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:70
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                zhinengjiajuChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    zhinengjiajuChart1.resize();
                };
            }
        });
      })
    },

    zhinengjiajuChat2() {
      this.$nextTick(()=>{

        var zhinengjiajuChart2 = echarts.init(document.getElementById("zhinengjiajuChart2"),'macarons');
        this.$http({
            url: "zhinengjiaju/group/shangpinleixing",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].shangpinleixing);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].shangpinleixing
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '商品类型',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:70
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                zhinengjiajuChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    zhinengjiajuChart2.resize();
                };
            }
        });
      })
    },

    zhinengjiajuChat3() {
      this.$nextTick(()=>{

        var zhinengjiajuChart3 = echarts.init(document.getElementById("zhinengjiajuChart3"),'macarons');
        this.$http({
            url: "zhinengjiaju/group/shangpinpinpai",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].shangpinpinpai);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].shangpinpinpai
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '商品品牌',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                zhinengjiajuChart3.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    zhinengjiajuChart3.resize();
                };
            }
        });
      })
    },




  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
</style>
