import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  Box,
} from "@mui/material";
import UserAccess from "./UserAccess";
import { iListData } from "../../data/listData";
import { testCurrentUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import Err from "../error/Err";
import useAuth from "../../hooks/useAuth";
import RecipientsDialog from "./RecipientsDialog";
import LetterC from "../../components/LetterC";

interface iShowList {
  list: iListData;
  handleSetRecipients: (names: string[], num: number) => void;
}

// ------------------------COMPONENT----------------------------------------------------------------

const ShowList = ({ list, handleSetRecipients }: iShowList) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
  };

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
          console.log(res.error);
          // setErr(res.error);
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
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          paddingBottom: "2rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "1.5rem",
          boxShadow: "0px 5px 15px #930001",
          position: "relative",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "info.main",
          }}
        >
          {list.title}
          {/* {list.users.find((user) => user.name === currentUser.name)?.name} */}
        </Typography>
      </Box>

      <Container
        sx={{
          marginTop: "2rem",
          position: "relative",
          width: "100%",
        }}
      >
        {err && <Err err={err} setErr={setErr}></Err>}
        {currentUser.id === "0" && list.users.length > 1 ? (
          <UserAccess handleCurrentUser={handleCurrentUser} />
        ) : (
          <Typography
            variant="h4"
            sx={{
              marginTop: "2rem",
              color: "secondary.light",
            }}
          >
            {list.users.length > 1 && `Hello, ${currentUser?.name}!`}
          </Typography>
        )}
        <Typography
          sx={{
            marginTop: "0.75rem",
            color: "white",
            // fontWeight: "200",
          }}
        >
          
          {list.users.length > 0 &&
            currentUser.id === "0"
            && "Log in to view people's lists."
          }
          {list.users.length > 0 &&
            currentUser.id !== "0"
                && "Click a name to view that person's list"
            }
        </Typography>
        {list.users.length < 1 ? (
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Nobody is on your list yet! Click "Edit List" to add people.
          </Typography>
        ) : (
          <List
            sx={{
              width: "100%",
              maxWidth: "900px",
              padding: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-evenly",
              margin: "0 auto",
            }}
          >
            {list.users.map((user, i) => (
              <ListItem
                key={i}
                sx={{
                  marginBottom: "1rem",
                  width: "100%",
                  maxWidth: "400px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  gap: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "0.5 1rem",
                }}
              >
                <Box>
                  <LetterC height={"2.5rem"} />
                </Box>
                <Box>
                  <Button
                    disabled={currentUser.id === "0"}
                    onClick={() => handleVisitUserPage(user.name)}
                    variant="text"
                    sx={{
                      fontSize: "1.2rem",
                      "&.Mui-disabled, &:hover": {
                        color: "primary.main",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    {/* {user.emoji} */}
                    {/* <Typography>❆</Typography> */}
                    <Typography
                      sx={{
                        color: "primary.dark",
                        fontWeight: "600",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Button>
                  <Box
                    sx={{
                      color: "info.dark",
                      fontSize: "1.2rem",
                      fontVariantCaps: "all-small-caps",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        minWidth: "5rem",
                      }}
                    >
                      Buys For:
                    </Typography>
                    <Typography>
                      {typeof user.recipients === "string"
                        ? user.recipients
                        : user.recipients.join(", ")}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        {list.users.some((user) => user.recipients.includes("Anybody")) &&
          list.users.length > 0 && (
            <RecipientsDialog
              text="Create Recipients Lists"
              handleSetRecipients={handleSetRecipients}
              maxPeople={list.users.length - 1}
              tooltip={false}
              names={list.users.map((user) => user.name)}
            />
          )}
        {!list.users.some((user) => user.recipients.includes("Anybody")) &&
          list.users.length > 0 && (
            <RecipientsDialog
              text="Recreate Recipients Lists"
              handleSetRecipients={handleSetRecipients}
              maxPeople={list.users.length - 1}
              tooltip={true}
              names={list.users.map((user) => user.name)}
            />
          )}
      </Container>
    </>
  );
};

export default ShowList;
