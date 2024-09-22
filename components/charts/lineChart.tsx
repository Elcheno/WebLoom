"use client";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

// const data = {
//   labels: public_projects.map((v) => new Date(v.created_at).toDateString()),
//   datasets: [
//     {
//       label: "Public",
//       data: public_projects.map((v, i) => i + 1),
//       fill: false,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1
//     },
//   ],
// }

export default function LineChart({ data }: { data: any }) {
  return <Line data={data} style={{ width: "full", height: "full" }} />;
}
