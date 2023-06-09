import { Card, Title, Text, Grid, Metric, Flex } from "@tremor/react";
import { Button } from "@tremor/react";

import RoomButton from "../components/RoomButton.js";
import Sidebar from "../components/Sidebar.js";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../Config/Firebase.js";

function Serverroom() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Serverroom"],
    queryFn: () => fetchData("/Rooms/"),
  });

  if (isLoading) return "Loading...";

  !isLoading && console.log("data", data);

  if (error) return "An error has occurred: " + error.message;
  return (
    <Sidebar>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
          }}
        >
          <ul>
            {Object.values(data).map((roomdata) => (
              <RoomButton key={roomdata.RoomName} text={roomdata.RoomName} />
            ))}
          </ul>
        </div>
      </main>
    </Sidebar>
  );
}
export default Serverroom;
