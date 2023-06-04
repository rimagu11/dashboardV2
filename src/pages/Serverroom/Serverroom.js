import { Card, Title, Text, Grid, Metric, Flex } from "@tremor/react";
import { Button } from "@tremor/react";

import RoomButton from "./RoomButton.js";

function Serverroom(){
  

  return (
    <main>
      <div style={{ display: "flex",alignItems: "center",  height: "100vh", width: "100vw", justifyContent: "center" }}>

      <Grid numColsMd={2} className="mt-2 gap-6">
        <RoomButton/>
        <RoomButton/>
        <RoomButton/>
        
      </Grid>
      </div>
    </main>
  );
};
export default Serverroom;
