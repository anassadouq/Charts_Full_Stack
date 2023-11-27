import React, { useState, useEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { BarController, BarElement } from 'chart.js';
Chart.register(BarController, BarElement);

export default function BarChart() {
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
            text: ''
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
        type: 'bar',
        data: chartData,
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
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