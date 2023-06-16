import { CircularProgress } from "@mui/material";
import React from "react";
import {  Metric } from "@tremor/react";
import { fetchData } from "../Config/Firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export default function HumidityQuery({value}) {
  return (
    <Metric>
     
      <center>{value}% </center>
    </Metric>
  );
}
