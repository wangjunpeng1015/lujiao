import echarts from 'echarts'
export const drawLine = () => {
    let option;
    option = {
        color: ["#ed9d3c", '#4fd7fd'],
        // backgroundColor: '#1c2431',//地图背景色
        title: {
            x: 'center',
            top: "20",
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            selectedMode: false,//取消图例上的点击事件
            data: ['支付宝', '微信'],
            textStyle: {
                fontSize: '12',
                color: '#000'
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['K4310', 'K43102', 'K52001', 'H2021', 'H2021'],
                axisLabel: {
                    // rotate: 45,//斜体字可不用
                    textStyle: {
                        fontSize: '12',
                        color: '#000'
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 100,//设置左侧Y轴最小刻度
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(135,140,147,0.8)'
                    }
                },//设置横线样式
                axisLabel: {
                    textStyle: {
                        fontSize: '12',
                        color: '#000'
                    }
                },
            }
        ],
        series: [
            {
                name: '支付宝',
                type: 'bar',
                stack: '排名',
                data: [120, 132, 101, 134, 90],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                barWidth: 8
            },
            {
                name: '微信',
                type: 'bar',
                stack: '排名',
                data: [220, 182, 191, 234, 290],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                barWidth: 8,
                itemStyle: {
                    normal: {
                        barBorderRadius: [30, 30, 0, 0],
                    }
                }
            },
        ],
        dataZoom: [{
            type: 'slider',
            realtime: true,
            filterMode: 'none',
            height: 30,
            handleIcon: 'path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0',
            handleSize: '100%',
            handleStyle: {
                color: "#fff",
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 4
            },
            textStyle: {
                color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#D7F4FF',
            dataBackground: {
                lineStyle: {
                    width: 0
                },
                areaStyle: {
                    color: 'transparent'
                }
            },
            fillerColor: '#00EBFF',
            labelFormatter: ''
        }],
    };
    return option;

}