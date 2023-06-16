import { CircularProgress } from "@mui/material";
import { fetchData } from "../Config/Firebase";
import {  Metric } from "@tremor/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function TemperatureQuery({value}) {
  
  return (
    <Metric>
      <center>{value}°C </center>
    </Metric>
  );
}
