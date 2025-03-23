import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const FullChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Keep a reference to the chart instance
    const dataLimit = 100;

    // Initialize the chart (only once)
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
                max: 500
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
                            { yAxis: 500, name: 'Max Limit' }
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
                            { yAxis: 1, name: 'Max Limit' }
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
                    end: 500, 
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

        const handleResize = () => {
            chartInstance.current.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chartInstance.current.dispose();
        };
    }, []); // Empty dependency array ensures this runs only once

    // Load data from localStorage and populate the chart
    useEffect(() => {
        if (!chartInstance.current) return;

        const option = chartInstance.current.getOption();

        // Retrieve data from localStorage
        const storedData = JSON.parse(localStorage.getItem("sensorData")) || [];

        if (storedData.length > 0) {
            const xAxisData = [];
            const phData = [];
            const tdsData = [];
            const tempData = [];
            const turbidityData = [];

            // Populate chart data
            storedData.forEach((entry) => {
                xAxisData.push(entry.count.toString());
                phData.push(entry.phValue);
                tdsData.push(entry.tdsValue);
                tempData.push(entry.temperature);
                turbidityData.push(entry.turbidity);
            });

            option.xAxis[0].data = xAxisData.slice(-dataLimit); // Limit data to the last `dataLimit` entries
            option.series[0].data = phData.slice(-dataLimit);
            option.series[1].data = tdsData.slice(-dataLimit);
            option.series[2].data = tempData.slice(-dataLimit);
            option.series[3].data = turbidityData.slice(-dataLimit);

            chartInstance.current.setOption(option);
        }
    }, []); // Run only once when the component is mounted

    return <div ref={chartRef} style={{ width: "100%", height: "700px" }} />;
};

export default FullChart;