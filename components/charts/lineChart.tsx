"use client";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function LineChart({ data }: { data: any }) {
  return (
    <Line data={data} style={{ width: "full", height: "full" }}/>
  )
}
