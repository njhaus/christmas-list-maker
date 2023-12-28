import {
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  Checkbox,
  Box,
  FormControlLabel,
  Button,
  FormControl,
  Input,
  InputLabel,
  Link,
} from "@mui/material";
import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { iViewUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import Err from "../error/Err";
import LetterC from "../../components/LetterC";
import { formConstraint } from "../../utils/form_contraints";
import { apiValidation } from "../../utils/api_validation";

interface iViewUserComponent {
  data: iViewUser;
  listId: string;
  currentUser: string;
}

const ViewUser = ({ data, listId, currentUser }: iViewUserComponent) => {

  const user = data.name;
  const [gifts, setGifts] = useState(data.gifts);
  const [notes, setNotes] = useState(data.notes);

  const [newNote, setNewNote] = useState("");

  const [err, setErr] = useState("");

  const handleBuyGift = (id: string) => {
    // Handles buying or 'un-buying' gift
    setErr("");
    const previousGifts = gifts;
    const thisGift = gifts.find((gift) => gift.id === id);
    if (thisGift) {
      thisGift.bought = !thisGift.bought;
      setGifts(
        [...gifts.filter((gift) => gift.id !== id), thisGift].sort((a, b) =>
          a.description > b.description ? 1 : -1
        )
      );
      const slug = "user/gift/buy";
      const body = {
        giftId: id,
        bought: thisGift.bought,
        listId: listId,
      };
      apiPost(slug, body).then((res) => {
        console.log(res);
        if (res?.message === "success" && res?.boughtGift) {
          console.log(res);
          thisGift.buyer_name = res.boughtGift.name;
          setGifts(
            [...gifts.filter((gift) => gift.id !== id), thisGift].sort((a, b) =>
              a.description > b.description ? 1 : -1
            )
          );
        } else if (res?.error) {
          console.log(res);
          setGifts(previousGifts);
          setErr(res.error);
        } else {
          setGifts(previousGifts);
          setErr("There was an error processing your request");
        }
      });
    }
  };

  const handleNewNote = () => {
    setErr("");
    const slug = "user/note/create";
    const body = {
      description: newNote,
      listId: listId,
      username: user,
    };
    if (!apiValidation(body)) {
      setErr(
        "We've encountered some invalid values. Please review your input and make sure it meets the required criteria. Once you've made the necessary changes, please try submitting again."
      );
      return;
    }
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.newNote) {
        console.log(res);
        setNotes([...notes, res.newNote]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setNewNote("");
  };

  const handleDeleteNote = (id: string) => {
    setErr("");
    const slug = "user/note/delete";
    const body = {
      listId: listId,
      username: user,
      noteId: id,
      currentUser: currentUser,
    };
    if (!apiValidation(body)) {
      setErr(
        "We've encountered some invalid values. Please review your input and make sure it meets the required criteria. Once you've made the necessary changes, please try submitting again."
      );
      return;
    }
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.deletedNote) {
        console.log(res);
        setNotes([...notes.filter((note) => note.id !== id)]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
        minHeight: "calc(100vh - 4.5rem)",
        paddingBottom: "8rem",
      }}
    >
      {err && <Err err={err} setErr={setErr}></Err>}
      <Stack
        sx={{
          backgroundColor: "white",
          paddingBottom: "2.5rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "2rem",
          boxShadow: "0px 5px 15px #930001",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "info.main",
          }}
        >
          {user.slice(0, 1).toUpperCase()}
          {user.slice(1)}'s Christmas List
        </Typography>
      </Stack>
      <Stack
        sx={{
          marginTop: "2rem",
        }}
      >
        {gifts.length < 1 ? (
          <Typography
            variant="h4"
            sx={{
              color: "white",
            }}
          >
            {user.slice(0, 1).toUpperCase()}
            {user.slice(1)} has not asked for any gifts yet.
          </Typography>
        ) : (
          <Container>
            <Typography
              variant="h4"
              sx={{
                color: "white",
              }}
            >
              {user.slice(0, 1).toUpperCase()}
              {user.slice(1)}'s Gifts
            </Typography>
            <List>
              {gifts.map((gift) => (
                <ListItem
                  key={gift.id}
                  sx={{
                    margin: "1rem auto",
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
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                      }}
                    >
                      {gift.description}
                      {gift.link && (
                        <Link href={gift.link} target="_blank" rel="noopener">
                          <Button>Link</Button>
                        </Link>
                      )}
                    </Typography>
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
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <FormControl>
                          <FormControlLabel
                            control={
                              <Checkbox
                                disabled={
                                  gift.bought && gift.buyer_name !== currentUser
                                    ? true
                                    : false
                                }
                                checked={!gift.bought ? false : true}
                                onChange={() => handleBuyGift(gift.id)}
                                sx={{
                                  padding: "0",
                                  marginRight: "0.5rem",
                                }}
                              />
                            }
                            label={
                              gift.bought !== 0 && gift.bought ? "" : "bought"
                            }
                            sx={{
                              color: "primary.main",
                            }}
                          />
                        </FormControl>
                        {gift.bought !== 0 && gift.bought && (
                          <Typography
                            sx={{
                              color: "primary.main",
                            }}
                          >
                            Bought by: {gift.buyer_name}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Container>
        )}
        <Box
          sx={{
            marginTop: "1.5rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              marginBottom: "0.5rem",
            }}
          >
            Notes
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "white",
            }}
          >
            Write a note or add a gift you bought for{" "}
            {user.slice(0, 1).toUpperCase()}
            {user.slice(1)}.
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "white",
              fontVariantCaps: "all-small-caps",
            }}
          >
            ({user} can't see your note, but other gift-givers can.)
          </Typography>
        </Box>
        <Stack
          sx={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "1rem auto",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          {notes.length < 1 ? (
            <Typography
              sx={{
                color: "primary.dark",
              }}
            >
              No notes yet!
            </Typography>
          ) : (
            <List>
              {notes.map((note) => (
                <ListItem
                  key={note.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    color: "primary.dark",
                    fontSize: "1.2rem",
                    gap: "0rem",
                    // borderBottom: "1px solid #00320b",
                  }}
                >
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: "1.2rem",
                    }}
                  >
                    "{note.description}"
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "baseline",
                      borderBottom: "1px solid #ccc",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontSize: "1.2rem",
                        fontVariantCaps: "all-small-caps",
                      }}
                    >
                      By: {note.written_by}
                    </Typography>
                    {note.written_by === currentUser && (
                      <Button
                        onClick={() => handleDeleteNote(note.id)}
                        variant="text"
                        sx={{
                          marginLeft: "0.75rem",
                          color: "secondary.dark",
                          padding: "0",
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </Stack>
                </ListItem>
              ))}
            </List>
          )}
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <FormControl>
              <InputLabel
                htmlFor="note"
                sx={{
                  color: "info.dark",
                }}
              >
                Add Note:
              </InputLabel>
              <Input
                id="note"
                value={newNote}
                onChange={(e) => {
                  if (formConstraint(e.target.value, 100)) {
                    setNewNote(e.target.value)
                  }
                }}
                sx={{
                  color: "info.dark",
                  width: "20rem",
                }}
              ></Input>
              <Button
                onClick={() => handleNewNote()}
                variant="contained"
                sx={{
                  width: "10rem",
                  marginTop: "1rem",
                  marginX: "auto",
                }}
              >
                Save Note
              </Button>
            </FormControl>
          </Stack>
        </Stack>
        <RouterLink to={`/list/${listId}`}>
          <Button
            variant="outlined"
            sx={{
              width: "7.5rem",
              margin: "1rem auto",
              color: "white",
              borderColor: "white",
            }}
          >
            Back
          </Button>
        </RouterLink>
      </Stack>
    </Box>
  );
};

export default ViewUser;
