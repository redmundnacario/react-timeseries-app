import React, { useState, useEffect } from 'react';
import { formatObsDataToLineChartData, RawObservationList } from '../models/ObservationData';
import { TimeSeries } from '../models/TimeSeriesData';
import LineChart from './LineChart';
import { getAverageData } from '../utils/AverageFunctions';
import { ONE_DAY, ONE_MONTH, ONE_WEEK, TWO_DAYS } from '../constants/Intervals';

// Define a type for the data you expect from the API
type Props = {}

const TimeSeriesContainer = (props: Props) => {

  const [data, setData] = useState<TimeSeries>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Replace with your API endpoint
    fetch('/api/observations/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: TimeSeries) => {
        setData(formatObsDataToLineChartData(data as unknown as RawObservationList));
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {
        data.length && <>
          <LineChart 
          data={data}
          title="Raw data" />
        <LineChart 
          data={getAverageData(data, ONE_DAY)}
          title="Average 24 hour data" />
        <LineChart 
          data={getAverageData(data, TWO_DAYS)}
          title="Average 48 hour data" />
        <LineChart 
          data={getAverageData(data, ONE_WEEK)}
          title="Average weekly data" />
        <LineChart 
          data={getAverageData(data, ONE_MONTH)}
          title="Average Monthly data" />
        </>
      }
    
    </div>
  );
}

export default TimeSeriesContainer
