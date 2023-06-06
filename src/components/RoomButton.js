import { Card, Metric, Flex } from "@tremor/react";
import { Button } from "@tremor/react";


function RoomButton() {
  
  return (
    <li>
      <Card>
        <Flex alignItems="center" justifyContent="evenly">
          <Metric>Dashboard of LTN 1</Metric>

          <Button size="xl">
            Server room 1
          </Button>
        </Flex>
      </Card>
    </li>
  );
}
export default RoomButton;