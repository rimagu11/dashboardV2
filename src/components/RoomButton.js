import { Card, Metric, Flex } from "@tremor/react";
import { Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";


function RoomButton({text}) {
  const navigate = useNavigate();
  return (
    <li>
      <Card>
        <Flex alignItems="center" justifyContent="evenly">
          <Metric>Dashboard of {text}</Metric>

          <Button size="xl"
          onClick={()=>(navigate(`/Serverroom/${text}`))}
          >Server room 
          
          </Button>
        </Flex>
      </Card>
    </li>
  );
}
export default RoomButton;
