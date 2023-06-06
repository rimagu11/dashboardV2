import { CircularProgress } from "@mui/material";
import { fetchData } from "../Config/Firebase";
import {  Metric } from "@tremor/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function TemperatureQuery() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey:["temperature"],
    queryFn:fetchData("/Rooms/LTN1/Temperature"),
  });

  if (isLoading) return <CircularProgress />;

  if (error) return "";

  return (
    <Metric>
      <center>{data}°C </center>
    </Metric>
  );
}
