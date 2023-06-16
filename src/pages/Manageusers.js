import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../components/Sidebar";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../Config/Firebase";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function ManageUsers() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["display users data"],
    queryFn: () => fetchData("Users/"),
  });
  const navigate = useNavigate();
  const handleOnClick = (link) =>{
    navigate(link);
  };
  if (isLoading) return <CircularProgress />;

  if (error) return "An error has occurred: " + error.message;

  const createData = (FullName, Email, Matricule) => {
    return { FullName, Email, Matricule };
  }

  let rows = Object.values(data).map(user =>{
      return (createData(
      user.FullName,
      user.Matricule,
      user.email,
      [<Button variant="contained"color="error">Delete</Button> ]
    ))
  })
  console.log(rows);
  return (
    <Sidebar>
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Users</Typography>
                </Stack>
                <div>
                  <Button
                  onClick={()=>(navigate('/Register'))}
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add user
                  </Button>
                </div>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card>
                  <Title>List of users</Title>
                  <Table className="mt-5">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Full Name</TableHeaderCell>
                        <TableHeaderCell>Matricule</TableHeaderCell>
                        <TableHeaderCell>Email Address</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.FullName}>
                          <TableCell>{row.FullName}</TableCell>
                          <TableCell>
                            <Text>{row.Email}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{row.Matricule}</Text>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          </TableCell>

                          <TableCell></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Box>
            </Stack>
          </Container>
        </Box>
      </>
    </Sidebar>
  );
}


