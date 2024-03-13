"use client";

import * as echarts from 'echarts';
import { useEffect, useRef } from "react";

export default function ChartCircle({ values }: any) {
  const chartDom = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(chartDom.current);
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      color: [
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#EDE574'
          },
          {
            offset: 1,
            color: '#E1F5C4'
          }
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#757F9A'
          },
          {
            offset: 1,
            color: '#D7DDE8'
          }
        ])
      ],
      series: [
        {
          name: 'Projects',
          type: 'pie',
          radius: '50%',
          data: values,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
            }
          }
        }
      ]       
    });
  });

  return (
    <div ref={chartDom} className="flex justify-center items-center h-[325px] w-[325px] 3xl:h-[450px] 3xl:w-[450px] m-auto"></div>
  )
}