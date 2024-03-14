"use client";

import { useEffect, useRef } from "react";
import * as echarts from 'echarts';

export default function ChartGradient({ valueString, xAxisOptions }: any) {
  const chartDom = useRef(null);

  const values = JSON.parse(valueString);

  useEffect(() => {
    if (chartDom) {
      let myChart = echarts.init(chartDom.current);
      myChart.setOption({
        color: ['#D7DDE8', '#E1F5C4', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxisOptions
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: values
      });
      return () => {
        myChart.dispose();
      }
    }
  });

  return (
    <div ref={chartDom} className="flex justify-center items-center h-[300px] w-[600px] 3xl:h-[450px] 3xl:w-[750px] m-auto"></div>
  )
}