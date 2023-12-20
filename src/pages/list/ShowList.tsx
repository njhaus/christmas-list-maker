import { Fragment, useState } from "react";

import { Link } from "react-router-dom";

import { Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddCode from "../user/unused/AddCode";
import UserAccess from "./UserAccess";
import { iListData, iListUser } from "../../data/listData";
import { apiPost } from "../../services/api_service";
import Err from "../../layouts/Err";

interface iShowList {
  list: iListData;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

// ------------------------COMPONENT----------------------------------------------------------------

const ShowList = ({ list }: iShowList) => {
  const [currentUser, setCurrentUser] = useState({ name: "", id: 0 });
  const [err, setErr] = useState("");

  const handleCurrentUser = (user: string, code: string, hasCode: boolean) => {
    setErr("");
    const slug = hasCode ? "user/access" : "user/create";
    const body = {
      listId: list._id,
      name: user,
      code: code,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log(res);
        setCurrentUser(res.data);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    console.log("currentUser");
  };

  return (
    <Container>
      {currentUser.id === 0 && list.users.length > 1 ? (
        <UserAccess handleCurrentUser={handleCurrentUser} />
      ) : (
        <Typography variant="h4">
          {list.users.length > 1 && `Hello ${currentUser?.name}`}
          {/* {list.users.find((user) => user.name === currentUser.name)?.name} */}
        </Typography>
      )}
      {err && <Err err={err}></Err>}
      {list.users.length < 1 ? (
        <Typography>
          Nobody is on your list yet! Click "Edit List" to add people.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Buys For</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.users.map((user) => (
                <TableRow
                  key={user.name}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Button disabled={currentUser.id === 0}>
                      {user.emoji}
                      {user.name}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{user.recipients}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ShowList;
