
import { TimeSeries } from "../models/TimeSeriesData";

const groupByInterval = (data: TimeSeries, interval: number) => {
  const grouped: { [key: number]: number[] } = {};

  data.forEach(([timestamp, value]) => {
    // Round the timestamp to the nearest interval
    const intervalStart = Math.floor(timestamp / interval) * interval;
    if (!grouped[intervalStart]) {
      grouped[intervalStart] = [];
    }
    grouped[intervalStart].push(value);
  });

  return grouped;
};


const averageGroupedData = (groupedData: { [key: number]: number[] }): TimeSeries => {
  return Object.entries(groupedData).map(([timestamp, values]) => [
    parseInt(timestamp),
    values.reduce((a, b) => a + b, 0) / values.length,
  ]);
};

export const getAverageData = (
  data: TimeSeries,
  interval: number
): TimeSeries => {
  const groupedData = groupByInterval(data, interval);
  return averageGroupedData(groupedData);
};
