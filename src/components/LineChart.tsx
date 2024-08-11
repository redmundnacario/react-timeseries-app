import React, { useEffect, useRef } from "react";
import Highcharts, { Options, Chart } from "highcharts";
import { TimeSeries } from "../models/TimeSeriesData";

interface LineChartProps {
  data: TimeSeries; // Replace this with your actual data type
  title: string;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, color = "#7cb5ec" }) => {
  const chartRef = useRef<Chart | null>(null);
  const chartId = `line-chart-${title.replace(/\s+/g, '-').toLowerCase()}`;

  useEffect(() => {
    const formattedData = data.map((point) => {
      return [new Date(point[0]).getTime(), point[1]]; // Convert timestamp to milliseconds
    });

    const options: Options = {
      chart: {
        type: "line",
      },
      title: {
        text: title,
      },
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%l%p %m/%d/%y", Number(this.value));
          },
          style: { textOverflow: "none" },
        },
      },
      series: [
        {
          name: title,
          data: formattedData,
          color,
          type:"line"
        },
      ],
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: `<table><tr><th colspan="2" style="text-align: left; border-bottom: 1px solid;">{point.key:%l%p %m/%d/%y}</th></tr>`,
        pointFormat: `<tr><td style="color: {series.color}">{series.name}</td><td style="text-align: right; padding-left: 1rem;"><b>{point.y}</b></td></tr>`,
        footerFormat: `</table>`,
      },
    };

    // Render the Highcharts chart
    chartRef.current = Highcharts.chart(chartId, options);

    return () => {
      // Clean up the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, title, color]);

  return <div id={chartId}></div>;
};

export default LineChart;
