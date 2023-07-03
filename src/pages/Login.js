import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import firebaseConfig from "../Config/Firebase";

firebase.initializeApp(firebaseConfig);

const SendUIDAndNavigate = (Navigate) => {
  const sendUID = useQuery({
    queryKey: ["uid"],
    queryFn: () => firebase.auth().currentUser.uid,
  });

  if (sendUID.isLoading) return <CircularProgress />;
  if (sendUID.isError) return <pre>{JSON.stringify(sendUID.error)}</pre>;

  let uid = sendUID.data;

  Navigate("/dashboard", { uid });
};

function LoginPage() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage("");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        Navigate("/Serverroom", {
          state: { uid: firebase.auth().currentUser.uid },
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
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
            value={email} // Added value prop to bind the email state
            onChange={(e) => setEmail(e.target.value)} // Added onChange handler to update the email state
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
            value={password} // Added value prop to bind the password state
            onChange={(e) => setpassword(e.target.value)} // Added onChange handler to update the password state
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          { errorMessage && errorMessage.code === "auth/wrong-password" ? (
            <p className="text-sm text-red-600">Please make sure to enter a valid password</p>
          ) :errorMessage && errorMessage.code === " auth/invalid-email	" ? (
            <p className="text-sm text-red-600">Please make sure to enter a valid mail</p>
          ) : null }
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
