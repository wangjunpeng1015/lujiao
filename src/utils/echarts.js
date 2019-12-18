import echarts from 'echarts'
export const drawLine = (data) => {
    // {
    //     name: ['xxx','rrr'],
    //     data: [[1,2],[3,4]],
    //     xAxis:[],
    // }
    let option = {
        color: ["#1aadec", "#07de6d", "#f72520"],
        grid: {
            top: "10%"
        },
        legend: {
            data: data.name,
            x: "center",
            y: "5%"
        },
        title: {
            text: "今日收款"
        },
        tooltip: {
            trigger: "axis"
        },
        xAxis: {
            type: "category",
            data: data.xAxis,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            name: "金额",
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false
            }
        },
        series: data.data
    };
    return option;
}