import React, { useState, useEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { DoughnutController } from 'chart.js';
Chart.register(DoughnutController);

export default function DonutChart() {
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
            label: "Salary",
            data: data.map((user) => user.salary),
            backgroundColor: ["#FF0000","#FFA500","#FFFF00","#7CFC00","#00BFFF","#8A2BE2",'#FF69B4','#eec0c8'],
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
        type: 'doughnut',
        data: chartData,
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const label = data.labels[tooltipItem.index];
                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                const total = data.datasets[tooltipItem.datasetIndex].data.reduce((a, b) => a + b);
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return label + ': ' + percentage;
              }
            }
          }
        }
      });
      chartRef.current = myChart;
    }
  }, [chartData]);

  return (
    <div style={{"width":"63%"}} className="mx-3">
      <canvas id="myChart" ref={canvasRef} />
    </div>
  );
}