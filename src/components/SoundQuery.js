import { CircularProgress } from "@mui/material";
import React from "react";
import {  Metric } from "@tremor/react";
import { fetchData } from "../Config/Firebase";
import { useQuery } from "@tanstack/react-query";


export default function SoundQuery() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["sound"],
    queryFn:fetchData("/Rooms/LTN1/Son"),
  });

  if (isLoading) return <CircularProgress />;

  if (error) return "";

  return (
    <Metric>
      <center>{data}</center>
    </Metric>
  );
}
