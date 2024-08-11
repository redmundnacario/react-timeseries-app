export type ObservationBase = {
  timestamp: Date;
  value: number;
}

export type RawObservation = {
  equipmentId: number;
  id: number;
  flag: string;
  created_at: Date;
  updated_at: Date;
} & ObservationBase

export type AvgObservation = ObservationBase

export type RawObservationList = Array<RawObservation>
export type AvgObservationList = Array<AvgObservation>

// Transform data

// Function to format the data
export const formatObsDataToLineChartData = (data: RawObservationList | AvgObservationList): [number, number][] => {
  return data.map((point) => [
    new Date(point.timestamp),
    point.value,
  ]) as [number, number][];
};
