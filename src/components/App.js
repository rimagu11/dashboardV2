import { Login } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import Loginpage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Serverroom from "../pages/Serverroom";
import Manageusers from "../pages/Manageusers";
import Register from "../pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Serverroom" element={<Serverroom />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/manageusers" element={<Manageusers />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
