import { Card, Text, Metric, AreaChart, Title } from "@tremor/react";
import { dataFormatter, chartdata } from "../data/Areachartdata";

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
  } = useQuery({
    queryKey: ["history"],
    queryFn: () =>
      fetchData("/History/").then((res) => {
        return Object.values(res[data.RoomName]);
      }),
  });

  !isLoading && console.log("history", Object.values(history[0]));

  return (
    <div className="h-full basis-5/6 bg-blue-100 text-center">
      <div className="overflow-y-auto h-full basis-5/6">
        <div className="flex flex-col">
          <div className="mt-10 ml-20">
            <Typography variant="h4" className="text-left mt-10  ">
              {data?.RoomName}
            </Typography>
          </div>
          <div className="grid grid-rows-1 grid-cols-8 gap-2 mt-14 overflow-y-auto">
            <Card className="col-start-3 col-span-1 h-40">
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
              <TemperatureQuery value={data.Temperature} />
            </Card>
            <Card className="col-start-4 col-span-1 h-40">
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
              <HumidityQuery value={data.Humidity} />
            </Card>
            <Card className="col-start-5 col-span-1 h-40">
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
              <GazQuery value={data.Gaz} />
            </Card>
            <Card className="col-start-6 col-span-1 h-40">
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
              <SoundQuery value={data.Sound} />
            </Card>
          </div>
          <div className="grid grid-rows-1 grid-cols-8 gap-2 mt-6 ">
            <Card className="col-start-3 col-end-7">
              <Title>Temperature History</Title>
              <div className="h-72 mt-4">
                {!isLoading && (
                  <AreaChart
                    data={chartdata}
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
              <div className="h-72 mt-4">
                <AreaChart
                  data={chartdata}
                  index="date"
                  categories={["Humidity"]}
                  colors={["indigo"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={40}
                />
              </div>
            </Card>
            <Card className="col-start-3 col-end-7">
              <Title>Gaz History</Title>
              <div className="h-72 mt-4">
                <AreaChart
                  data={chartdata}
                  index="date"
                  categories={["Gaz"]}
                  colors={["indigo"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={40}
                />
              </div>
            </Card>
            <Card className="col-start-3 col-end-7">
              <Title>Sound History</Title>
              <div className="h-72 mt-4">
                <AreaChart
                  data={chartdata}
                  index="date"
                  categories={["Sound"]}
                  colors={["indigo"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={40}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashbody;
