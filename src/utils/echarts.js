import echarts from 'echarts'
export const drawLine = (data) => {
    // {
    //     name: ['xxx','rrr'],
    //     data: [[1,2],[3,4]],
    //     xAxis:[],
    // }
    let aliData = [
        13,
        20,
        23,
        43,
        65,
        45,
        76,
        98,
        199,
        200,
        311,
        433,
        450,
        490,
        510,
        555,
        579,
        600
    ];
    let wxData = [
        3,
        10,
        13,
        23,
        35,
        45,
        56,
        68,
        199,
        211,
        311,
        333,
        350,
        390,
        410,
        455,
        479,
        500
    ];
    let ysfData = [
        24,
        31,
        33,
        53,
        65,
        75,
        96,
        188,
        299,
        400,
        511,
        633,
        750,
        890,
        910,
        1555,
        1579,
        1600
    ];
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