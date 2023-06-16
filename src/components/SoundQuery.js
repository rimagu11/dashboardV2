import { CircularProgress } from "@mui/material";
import React from "react";
import { Metric } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";

export default function SoundQuery({ value }) {
  return (
    <Metric>
      <center className="text-black">{value}</center>
    </Metric>
  );
}
