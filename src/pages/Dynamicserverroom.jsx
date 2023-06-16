import { Card, Title, Text, Grid, Metric, Flex } from "@tremor/react";
import { Button } from "@tremor/react";

import RoomButton from "../components/RoomButton.js";
import Sidebar from "../components/Sidebar.js";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../Config/Firebase.js";
import { useParams } from "react-router";
import Dashbody from "../components/Dashbody.js";

function Serverroom() {
  const { id: roomName } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["Serverroom"],
    queryFn: () => fetchData("/Rooms/"),
  });

  if (isLoading) return "Loading...";

  !isLoading && console.log("data", Object.values(data));

  if (error) return "An error has occurred: " + error.message;
  return (
    <Sidebar>
      <main>
        {!isLoading && (
          <Dashbody
            data={Object.values(data).find((room) => room.RoomName == roomName)}
          />
        )}
      </main>
    </Sidebar>
  );
}
export default Serverroom;
