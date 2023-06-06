import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import firebaseConfig from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CircularProgress } from "@mui/material";

firebaseConfig.initializeApp(firebaseConfig);

const SendUIDAndNavigate = (Navigate) => {
  const sendUID = useQuery({
    queryKey: ["uid"],
    queryFn: () => firebase.auth().currentUser,
  });
  if (sendUID.isLoading) return <CircularProgress />
  if (sendUID.isError) return 
  <pre>{JSON.stringify(sendUID.error)}</pre>
  
  let uid =sendUID.data;

    Navigate("/dashboard", {uid})

}

function Loginpage() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage("");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        Navigate("/dashboard", {state:{uid: firebase.auth().currentUser.uid}});
      })
      .catch((error) => {
        setErrorMessage("Wrong Password or email!");
      });
  };


  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
           
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
         
        </Box>
      </Box>
    </Container>
  );
}
export default Loginpage;
