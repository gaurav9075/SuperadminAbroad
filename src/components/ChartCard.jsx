import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export const ChartCard = ({ type, transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category))];
  const dataset = categories.map(cat => transactions.filter(t => t.category === cat).reduce((sum, t) => sum + Number(t.amount), 0));

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Amount by Category',
        data: dataset,
        backgroundColor: ['#60a5fa', '#f87171', '#fbbf24', '#34d399', '#a78bfa'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 shadow rounded h-80">
      <h2 className="text-xl font-semibold mb-2 text-center">{type === 'bar' ? 'Monthly Overview' : 'Category Breakdown'}</h2>
      {type === 'bar' ? <Bar data={data} /> : <Pie data={data} />}
    </div>
  );
};