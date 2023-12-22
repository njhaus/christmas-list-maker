import {  useState, useEffect, Fragment } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Container, Typography, Button, Stack } from "@mui/material";
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
import { testCurrentUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import Err from "../../layouts/Err";
import useAuth from "../../hooks/useAuth";
import { testUser } from "../../data/userData";
import RecipientsDialog from "./RecipientsDialog";

interface iShowList {
  list: iListData;
  handleSetRecipients: (names: string[], num: number) => void;
}

// ------------------------COMPONENT----------------------------------------------------------------

const ShowList = ({ list, handleSetRecipients }: iShowList) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();
  const location = useLocation();


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
  };

  const handleVisitUserPage = (user: string) => {
    navigate(`/user/${list._id}/${user}`, {
      state: { ...location.state, listId: list._id, username: user },
    });
  }

  // Get user if already logged in (Uses token)
  useEffect(() => {
    const getUser = async () => {
      console.log("Running API call to get user");
      const body = {};
      const slug = "user/find";
      apiPost(slug, body).then((res) => {
        if (res?.message === "success") {
          setCurrentUser(res.data);
        } else if (res?.error) {
          console.log(res.error)
          setErr(res.error);
        } else {
          console.log("no currently logged in user");
          setErr("");
        }
        setIsLoading(false);
      });
    };
    // Checks if user has been uploaded -- 0 is placeholder, which means it has not.
    if (currentUser.id === "0" && list.users.length > 0) {
      getUser();

      return () => {
        setCurrentUser(testCurrentUser);
        setErr("");
        setIsLoading(true);
      };
    } 
    setIsLoading(false);
  }, [])

  return (
    <>
      {currentUser.id === "0" && list.users.length > 1 ? (
        <UserAccess handleCurrentUser={handleCurrentUser} />
      ) : (
        <Container
          sx={{
            backgroundColor: "white",
            paddingBottom: "2rem",
            borderRadius: "0 0 20% 20%",
            marginTop: "-1px",
            paddingTop: "1.5rem",
            boxShadow: "0px 5px 15px #930001",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
            }}
          >
            {list.users.length > 1 && `Hello, ${currentUser?.name}!`}
            {/* {list.users.find((user) => user.name === currentUser.name)?.name} */}
          </Typography>
        </Container>
      )}
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginTop: "2rem",
            color: "secondary.light",
          }}
        >
          {list.title}
        </Typography>
        {err && <Err err={err} setErr={setErr}></Err>}
        {list.users.length < 1 ? (
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "primary.dark",
            }}
          >
            Nobody is on your list yet! Click "Edit List" to add people.
          </Typography>
        ) : (
          <TableContainer
            className="red-box"
            component={Paper}
            sx={{
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <Table
              sx={{
                // minWidth: 650,
                backgroundColor: "info.main",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: "1.7rem",
                          color: "white",
                          fontWeight: "200",
                        }}
                      >
                        Name
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "white",
                          fontWeight: "200",
                        }}
                      >
                        {currentUser.id === "0" && list.users.length
                          ? "Log in to view people's lists."
                          : "Click a name to view that person's list"}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: "1.7rem",
                        color: "white",
                        fontWeight: "200",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      Buys For
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Button
                        disabled={currentUser.id === "0"}
                        onClick={() => handleVisitUserPage(user.name)}
                        sx={{
                          color: "white",
                          fontSize: "1.2rem",
                          "&.Mui-disabled": {
                            color: "white",
                          },
                        }}
                      >
                        {/* {user.emoji} */}
                        {user.name}
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "secondary.light",
                        fontSize: "1.2rem",
                        fontVariantCaps: "all-small-caps",
                      }}
                    >
                      {typeof user.recipients === "string"
                        ? user.recipients
                        : user.recipients.join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{
                    position: "relative",
                    height: "2.5rem",
                  }}
                >
                  <TableCell
                    sx={{
                      height: "2.5rem",
                      padding: "0",
                    }}
                  >
                    {list.users.some((user) =>
                      user.recipients.includes("Anybody")
                    ) ? (
                      <RecipientsDialog
                        text="Create Recipients Lists"
                        handleSetRecipients={handleSetRecipients}
                        maxPeople={list.users.length - 1}
                        tooltip={false}
                        names={list.users.map((user) => user.name)}
                      />
                    ) : (
                      <RecipientsDialog
                        text="Recreate Recipients Lists"
                        handleSetRecipients={handleSetRecipients}
                        maxPeople={list.users.length - 1}
                        tooltip={true}
                        names={list.users.map((user) => user.name)}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      height: "2.5rem",
                    }}
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default ShowList;
