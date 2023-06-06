import { CircularProgress } from "@mui/material";
import React from "react";
import {  Metric } from "@tremor/react";
import { fetchData } from "../Config/Firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export default function HumidityQuery() {
  
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["humidity"],
    queryFn:fetchData("/Rooms/LTN1/Humidity"),
  });

  if (isLoading) return <CircularProgress/>;

  if (error) return "";

  return (
    <Metric>
     
      <center>{data}% </center>
    </Metric>
  );
}
