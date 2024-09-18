"use client";

import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

Chart.register(CategoryScale);

export default function ChartPie({
  data
} : {
  data: any
}) {
  return (
    <Carousel className="w-full max-w-xs m-auto">
      <CarouselContent>
        {
          data.map((item: any, index: number) => (
            <CarouselItem key={index}>
              <Pie
                data={item}
              />
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      

  )
}