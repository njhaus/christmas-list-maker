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
  ListItemText,
  FormControl,
  Input,
  InputLabel,
  ListItemButton,
  Link,
} from "@mui/material";
import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { testNotes, testUser, testGifts, iViewUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import Err from "../error/Err";

interface iViewUserComponent {
  data: iViewUser;
  listId: string;
  currentUser: string;
}

const ViewUser = ({ data, listId, currentUser }: iViewUserComponent) => {
  const [loading, isLoading] = useState(false);

  const [user, setUser] = useState(data.name);
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

  const handleDeleteNote = (id: string, writer: string) => {
    setErr("");
    const slug = "user/note/delete";
    const body = {
      listId: listId,
      username: user,
      noteId: id,
      currentUser: currentUser,
    };
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

  if (loading) {
    return (
      <Container>
        <Typography>...Loading</Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "0",
      }}
    >
      {err && <Err err={err} setErr={setErr}></Err>}
      <Stack
        sx={{
          backgroundColor: "info.main",
          paddingBottom: "2.5rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
          }}
        >
          {user}'s Christmas List
        </Typography>
      </Stack>
      <Stack
        sx={{
          marginTop: "2rem",
        }}
      >
        <List>
          {gifts.length < 1 ? (
            <Typography
              variant="h5"
              sx={{
                color: "info.main",
              }}
            >
              {user} has not asked for any gifts yet.
            </Typography>
          ) : (
            <Container>
              <Typography
                variant="h5"
                sx={{
                  color: "info.main",
                }}
              >
                {user}'s' Gifts
              </Typography>
              {gifts.map((gift) => (
                <ListItem
                  key={gift.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "primary.dark",
                    fontSize: "1.2rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      flexGrow: "1",
                    }}
                  >
                    &#10052;{gift.description}
                  </Typography>
                  {gift.link && (
                    <Link href={gift.link} target="_blank">
                      <Button>Link</Button>
                    </Link>
                  )}
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
                          />
                        }
                        label={gift.bought !== 0 && gift.bought ? "" : "bought"}
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
                </ListItem>
              ))}
            </Container>
          )}
        </List>
        <Stack>
          <Typography
            variant="h5"
            sx={{
              color: "info.main",
            }}
          >
            Notes
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "info.main",
            }}
          >
            Write a note or add a gift you bought for {user}.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "info.main",
            }}
          >
            ({user} can't see your note, but other gift-givers can.)
          </Typography>
          <List>
            {notes.map((note) => (
              <ListItem
                key={note.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  color: "primary.dark",
                  fontSize: "1.2rem",
                }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: "1.2rem",
                    flexGrow: "1",
                  }}
                >
                  {note.description}
                </Typography>
                <Stack direction={"row"}>
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                    }}
                  >
                    By: {note.written_by}
                  </Typography>
                  {note.written_by === currentUser && (
                    <Button
                      onClick={() => handleDeleteNote(note.id, note.written_by)}
                      variant="outlined"
                      sx={{
                        marginLeft: "0.5rem",
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              </ListItem>
            ))}
          </List>
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <FormControl>
              <InputLabel
                htmlFor="note"
                sx={{
                  color: "primary.dark",
                }}
              >
                Add Note:
              </InputLabel>
              <Input
                id="note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                sx={{
                  color: "primary.dark",
                  width: "20rem",
                }}
              ></Input>
              <Button
                onClick={() => handleNewNote()}
                variant="contained"
                sx={{
                  width: "10rem",
                  margin: "1rem auto",
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
              width: "10rem",
              margin: "0rem auto",
            }}
          >
            Back
          </Button>
        </RouterLink>
      </Stack>
    </Container>
  );
};

export default ViewUser;
