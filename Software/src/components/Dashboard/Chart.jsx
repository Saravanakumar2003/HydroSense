import React, { useEffect, useRef, useContext } from "react";
import * as echarts from "echarts";
import { SensorDataContext } from "../SensorDataContext";

const Chart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Keep a reference to the chart instance
    const dataLimit = 10; // Show only the last 10 data points

    // Get sensor data from context
    const { phValue, tdsValue, temperature, turbidity, count } = useContext(SensorDataContext);

    // Initialize the chart (only once)
    useEffect(() => {
        if (!chartRef.current) return;

        chartInstance.current = echarts.init(chartRef.current);

        const option = {
            tooltip: { trigger: "axis" },
            legend: {
                data: ["pH", "TDS", "Water Temp", "Turbidity"],
                bottom: 0,
                textStyle: { color: "#fff" },
            },
            xAxis: { type: "category", name: "Count", data: [], boundaryGap: false },
            yAxis: {
                type: "value",
                name: "Sensor Value",
                min: 0,
                max: 500, // Adjusted max value for TDS
            },
            series: [
                { name: "pH", type: "line", data: [], smooth: true, itemStyle: { color: "#2E93fA" } },
                { name: "TDS", type: "line", data: [], smooth: true, itemStyle: { color: "#66DA26" } },
                { name: "Water Temp", type: "line", data: [], smooth: true, itemStyle: { color: "#FF9800" } },
                { name: "Turbidity", type: "line", data: [], smooth: true, itemStyle: { color: "#D7263D" } },
            ],
            animationDuration: 1000,
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

    // Load the last 10 data points from localStorage when the component is loaded
    useEffect(() => {
        if (!chartInstance.current) return;

        const option = chartInstance.current.getOption();

        // Retrieve data from localStorage
        const storedData = JSON.parse(localStorage.getItem("sensorData")) || [];
        const recentData = storedData.slice(-dataLimit); // Get the last 10 data points

        const xAxisData = [];
        const phData = [];
        const tdsData = [];
        const tempData = [];
        const turbidityData = [];

        // Populate chart data
        recentData.forEach((entry) => {
            xAxisData.push(entry.count.toString());
            phData.push(entry.phValue);
            tdsData.push(entry.tdsValue);
            tempData.push(entry.temperature);
            turbidityData.push(entry.turbidity);
        });

        option.xAxis[0].data = xAxisData;
        option.series[0].data = phData;
        option.series[1].data = tdsData;
        option.series[2].data = tempData;
        option.series[3].data = turbidityData;

        chartInstance.current.setOption(option);
    }, []); // Run only once when the component is mounted

    // Update the chart in real-time with new data from context
    useEffect(() => {
        if (!chartInstance.current) return;

        const option = chartInstance.current.getOption();

        // Push real-time data from context
        option.xAxis[0].data.push(count.toString());
        option.series[0].data.push(phValue);
        option.series[1].data.push(tdsValue);
        option.series[2].data.push(temperature);
        option.series[3].data.push(turbidity);

        // Maintain data limit
        if (option.xAxis[0].data.length > dataLimit) {
            option.xAxis[0].data.shift();
            option.series.forEach((series) => series.data.shift());
        }

        chartInstance.current.setOption(option);
    }, [phValue, tdsValue, temperature, turbidity, count]); // Update chart when sensor data or count changes

    return <div ref={chartRef} style={{ width: "100%", height: "450px" }} />;
};

export default Chart;