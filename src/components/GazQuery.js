import { CircularProgress } from "@mui/material";
import React from "react";
import { Metric } from "@tremor/react";
import { fetchData } from "../Config/Firebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function GazQuery() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gaz"],
    queryFn: fetchData("/Rooms/LTN1/Gaz"),
  });

  if (isLoading) return <CircularProgress />;

  if (error) return "";

  return (
    <Metric>
      <center>{data}</center>
    </Metric>
  );
}
