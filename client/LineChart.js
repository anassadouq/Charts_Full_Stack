import React, { useState, useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

export default function LineChart() {
  const [chartData, setChartData] = useState({});
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/employe");
      const data = await res.json();
      const chartData = {
        labels: data.map((user) => user.name),
        datasets: [
          {
            label: "Age",
            data: data.map((user) => user.age),
            borderColor: "rgba(75,192,192,1)",
            fill: false
          },
        ],
      };
      setChartData(chartData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(chartData).length) {
      const myChartRef = chartRef.current;
      if (myChartRef) {
        myChartRef.destroy();
      }
      const myChart = new Chart(canvasRef.current, {
        type: 'line',
        data: chartData,
      });
      chartRef.current = myChart;
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="myChart" ref={canvasRef} />
    </div>
  );
}