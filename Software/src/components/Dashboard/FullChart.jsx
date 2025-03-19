import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const FullChart = () => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null);
    const dataLimit = 30;
    let count = 0;

    function getRandom(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    useEffect(() => {
        if (!chartRef.current) return;

        chartInstance.current = echarts.init(chartRef.current);

        let option = {
            tooltip: { trigger: 'axis' },
            legend: { 
                data: ['pH', 'TDS', 'Water Temp', 'Turbidity'], 
                top: 0,
                textStyle: { color: '#fff' }
            },
            xAxis: { type: 'category', name: 'Count', data: [], boundaryGap: false },
            yAxis: { 
                type: 'value', 
                name: 'Sensor Value', 
                min: 0, 
                max: 100
            },
            series: [
                { 
                    name: 'pH', 
                    type: 'line', 
                    data: [], 
                    smooth: true, 
                    itemStyle: { color: '#2E93fA' },
                    markLine: {
                        data: [
                            { yAxis: 8, name: 'Max Limit' }
                        ],
                        lineStyle: { color: '#2E93fA' }
                    }
                },
                { 
                    name: 'TDS', 
                    type: 'line', 
                    data: [], 
                    smooth: true, 
                    itemStyle: { color: '#66DA26' },
                    markLine: {
                        data: [
                            { yAxis: 50, name: 'Max Limit' }
                        ],
                        lineStyle: { color: '#66DA26' }
                    }
                },
                { 
                    name: 'Water Temp', 
                    type: 'line', 
                    data: [], 
                    smooth: true, 
                    itemStyle: { color: '#FF9800' },
                    markLine: {
                        data: [
                            { yAxis: 30, name: 'Max Limit' }
                        ],
                        lineStyle: { color: '#FF9800' }
                    }
                },
                { 
                    name: 'Turbidity', 
                    type: 'line', 
                    data: [], 
                    smooth: true, 
                    itemStyle: { color: '#D7263D' },
                    markLine: {
                        data: [
                            { yAxis: 100, name: 'Max Limit' }
                        ],
                        lineStyle: { color: '#D7263D' }
                    }
                },
            ],
            animationDuration: 1000,
            dataZoom: [
                { 
                    type: 'inside', 
                    start: 0, 
                    end: 100 
                },
                { 
                    start: 0, 
                    end: 100, 
                    handleIcon: 'M0,0 v9.7h5 v-9.7h-5 Z', 
                    handleSize: '110%', 
                    handleStyle: { color: '#fff' }, 
                    textStyle: { color: '#fff' } 
                }
            ],
            toolbox: {
                feature: {
                    saveAsImage: { title: 'Save as Image' },
                    restore: { title: 'Restore' },
                    dataZoom: { title: { zoom: 'Zoom', back: 'Reset Zoom' } }
                },
                iconStyle: {
                    borderColor: '#fff'
                }
            }
        };

        chartInstance.current.setOption(option);

        const updateChart = () => {
            count++;
            let ph = getRandom(6.5, 8.5);
            let tds = getRandom(10, 50);
            let temp = getRandom(20, 35);
            let turbidity = getRandom(0, 5);

            option.xAxis.data.push(count.toString());
            option.series.forEach((series, i) => series.data.push([ph, tds, temp, turbidity][i]));

            if (option.xAxis.data.length > dataLimit) {
                option.xAxis.data.shift();
                option.series.forEach(series => series.data.shift());
            }

            chartInstance.current.setOption(option);
        };

        const interval = setInterval(updateChart, 5000);

        const handleResize = () => {
            chartInstance.current.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
            chartInstance.current.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "700px" }} />;
};

export default FullChart;