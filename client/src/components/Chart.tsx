// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// interface BPMChartProps {
//   bpmData: number[];
// }
// const BPMChart: React.FC<BPMChartProps> = ({ bpmData }) => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     const bpmChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: bpmData.map((_, i) => i + 1),
//         datasets: [
//           {
//             label: 'BPM',
//             data: bpmData,
//             fill: false,
//             borderColor: 'red',
//             tension: 0.1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         animation: false,
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });

//     return () => {
//       bpmChart.destroy();
//     };
//   }, [bpmData]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default BPMChart;

// Chart.tsx
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// interface BPMChartProps {
//   bpmData: number[];
//   startTime: Date; // 시작시간 받기
// }

// const BPMChart: React.FC<BPMChartProps> = ({ bpmData, startTime }) => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     const getLabelAt = (index: number) => {
//       const date = new Date(startTime.getTime() + index * 1000);
//       return index % 300 === 0 ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
//     };

//     const bpmChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: bpmData.map((_, i) => getLabelAt(i)),
//         datasets: [
//           {
//             label: 'BPM',
//             data: bpmData,
//             fill: false,
//             borderColor: 'red',
//             tension: 0.1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         animation: false,
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });

//     return () => {
//       bpmChart.destroy();
//     };
//   }, [bpmData, startTime]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default BPMChart;


//환자 여러명
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BPMChart: React.FC<{ 
  bpmData: { time: string; bpm: number }[];
  showTimeAxis?: boolean;
}> = ({ bpmData, showTimeAxis = true }) => {
  const data = {
    labels: bpmData.map(point => point.time),   // ⏰ 문자열 시간
    datasets: [
      {
        label: '',
        data: bpmData.map(point => point.bpm),  // ✅ value 필드 사용
        borderColor: 'rgb(231, 54, 31)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        tension: 0.3,
        pointRadius: 4,              // ✅ 점 크기 조정
        pointBackgroundColor: 'red', // ✅ 점 색상 추가
        showLine: true,              // ✅ 선 표시 보장
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: '실시간 심박수 그래프',
      },
    },
    scales: {
      x: showTimeAxis
        ? {
            title: {
              display: true,
              text: '시간',
            },
            ticks: {
              maxRotation: 90,
              minRotation: 45,
            },
          }
        : {
            display: false,
          },
      y: {
        title: {
          display: true,
          text: 'BPM',
        },
        beginAtZero: true,
        suggestedMax: 120,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BPMChart;

