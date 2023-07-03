import { Card, Text, Metric, AreaChart, Title } from "@tremor/react";
import {
  dataFormatter,
  chartdata,
  formatData,
  huDataFormatter,
} from "../data/Areachartdata";

import { Typography, SvgIcon, Avatar } from "@mui/material";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { GiGasStove } from "react-icons/gi";
import { AiTwotoneSound } from "react-icons/ai";
import TemperatureQuery from "./TemperatureQuery";
import HumidityQuery from "./HumidityQuery";
import SoundQuery from "./SoundQuery";
import GazQuery from "./GazQuery";
import { fetchData } from "../Config/Firebase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Dashbody({ data }) {
  const {
    isLoading,
    error,
    data: history,
    isError,
  } = useQuery({
    queryKey: ["history"],
    queryFn: () =>
      fetchData(`/Rooms/${data?.RoomName}/History/`).then((res) =>
        Object.values(res)
      ),
  });
  !isLoading && console.log("history", Object.values(history[0]));
  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="h-full text-center bg-blue-100 basis-5/6">
      <div className="h-full overflow-y-auto basis-5/6">
        <div className="flex flex-col">
          <div className="mt-10 ml-20">
            <Typography variant="h4" className="mt-10 text-left ">
              {data?.RoomName}
            </Typography>
          </div>
          <div className="grid grid-cols-8 grid-rows-1 gap-2 overflow-y-auto mt-14">
            <Card className="h-40 col-span-1 col-start-3">
              <center>
                <Avatar
                  sx={{
                    backgroundColor: "#002699",
                    height: 56,
                    width: 56,
                  }}
                >
                  <SvgIcon>
                    <CiTempHigh />
                  </SvgIcon>
                </Avatar>
              </center>
              <Text>
                {" "}
                <center>Temperature </center>
              </Text>
              <TemperatureQuery value={data?.Temperature} />
            </Card>
            <Card className="h-40 col-span-1 col-start-4">
              <center>
                <Avatar
                  sx={{
                    backgroundColor: "#0033cc",
                    height: 56,
                    width: 56,
                  }}
                >
                  <SvgIcon>
                    <WiHumidity />
                  </SvgIcon>
                </Avatar>
              </center>
              <Text>
                {" "}
                <center>Humidity </center>{" "}
              </Text>
              <HumidityQuery value={data?.Humidity} />
            </Card>
            <Card className="h-40 col-span-1 col-start-5">
              <center>
                <Avatar
                  sx={{
                    backgroundColor: "#0039e6",
                    height: 56,
                    width: 56,
                  }}
                >
                  <SvgIcon>
                    <GiGasStove />
                  </SvgIcon>
                </Avatar>
              </center>
              <Text>
                <center>Gaz</center>
              </Text>
              <GazQuery value={data?.Gas} />
            </Card>
            <Card className="h-40 col-span-1 col-start-6">
              <center>
                <Avatar
                  sx={{
                    backgroundColor: "#3366ff",
                    height: 56,
                    width: 56,
                  }}
                >
                  <SvgIcon>
                    <AiTwotoneSound />
                  </SvgIcon>
                </Avatar>
              </center>
              <Text>
                <center>Sound</center>{" "}
              </Text>
              <SoundQuery value={data?.Sound} />
            </Card>
          </div>
          <div className="grid grid-cols-8 grid-rows-1 gap-2 mt-6 ">
            <Card className="col-start-3 col-end-7">
              <Title>Temperature History</Title>
              <div className="mt-4 h-72">
                {!isLoading && (
                  <AreaChart
                    data={formatData(Object.values(history[0]), "Temperature")}
                    index="date"
                    categories={["Temperature"]}
                    colors={["cyan"]}
                    valueFormatter={dataFormatter}
                    yAxisWidth={40}
                  />
                )}
              </div>
            </Card>
            <Card className="col-start-3 col-end-7">
              <Title>Humidity History</Title>
              <div className="mt-4 h-72">
                {!isLoading && (
                  <AreaChart
                    data={formatData(Object.values(history[0]), "Humidity")}
                    index="date"
                    categories={["Humidity"]}
                    colors={["indigo"]}
                    valueFormatter={huDataFormatter}
                    yAxisWidth={40}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashbody;
