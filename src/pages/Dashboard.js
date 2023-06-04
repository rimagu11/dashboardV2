import Dashbody from "../components/Dashbody";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return <Sidebar children={<Dashbody />} />;
}

export default Dashboard;