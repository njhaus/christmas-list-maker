import { useState } from "react";

import {
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Input,
  Button,
  ListItemButton,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Err from "../error/Err";
import { iGift, iEditUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";

interface iEditUserComponent {
  data: iEditUser;
  listId: string;
}

const EditUser = ({ data, listId }: iEditUserComponent) => {
  // Set by API call
  const [user, setUser] = useState(data.name);
  const [gifts, setGifts] = useState(data.gifts);

  const [err, setErr] = useState("");

  const [newGift, setNewGift] = useState("");
  const [newLink, setNewLink] = useState("");
  // Is editing takes the id of the gift being edited. The values of the edited gift/link are sotred in the edit states
  const [isEditing, setIsEditing] = useState("");
  const [editGift, setEditGift] = useState("");
  const [editLink, setEditLink] = useState("");

  // Edit a gift
  const handleEdit = (id: string) => {
    setErr("");
    const thisGift = gifts.find((gift) => gift.id === id);
    const slug = "user/gift/edit";
    const body = {
      giftId: id,
      description: editGift ? editGift : thisGift?.description,
      link: editLink ? editLink : thisGift?.link,
      listId: listId,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.editedGift) {
        console.log(res);
        setGifts([...gifts.filter((gift) => gift.id !== id), res.editedGift]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setIsEditing("");
    setEditGift("");
    setEditLink("");
  };

  // Make a new gift
  const handleSaveNew = () => {
    setErr("");
    const slug = "user/gift/new";
    const body = {
      newGift: newGift,
      newLink: newLink,
      listId: listId,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.newGift) {
        console.log(res);
        setGifts([...gifts, res.newGift]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setNewGift("");
    setNewLink("");
  };

  // Delete a gift
  const handleDelete = (id: string) => {
    setErr("");
    const slug = "user/gift/delete";
    const body = {
      giftId: id,
      listId: listId,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log(res);
        setGifts([...gifts.filter((gift) => gift.id !== id)]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
  };

  return (
    <Container
      sx={{
        backgroundColor: "info.main",
        minHeight: "calc(100vh - 4.5rem)",
        padding: "0",
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "info.main",
          }}
        >
          {user}'s Christmas List
        </Typography>
      </Stack>
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
        <List>
          {gifts.length < 1 ? (
            <Typography
              variant="h5"
              sx={{
                color: "white",
              }}
            >
              You have no gifts on your list yet.
            </Typography>
          ) : (
            <Container>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                }}
              >
                My Gifts
              </Typography>
              {gifts.map((gift) => (
                <ListItem
                  key={gift.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "primary.dark",
                    fontSize: "1.2rem",
                  }}
                >
                  {isEditing !== gift.id && (
                    <>
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
                      <Button
                        onClick={() => {
                          setEditGift(gift.description);
                          setEditLink(gift.link);
                          setIsEditing(gift.id);
                        }}
                        variant="outlined"
                        sx={{
                          width: "3rem",
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                  {isEditing === gift.id && (
                    <>
                      <Input
                        id="edit-gift"
                        value={editGift}
                        onChange={(e) => setEditGift(e.target.value)}
                      ></Input>
                      <Input
                        id="edit-link"
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                      ></Input>
                      <Button
                        onClick={() => handleEdit(gift.id)}
                        variant="outlined"
                        sx={{
                          width: "3rem",
                        }}
                      >
                        Save
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={() => handleDelete(gift.id)}
                    variant="outlined"
                    sx={{
                      width: "5rem",
                      borderColor: "secondary.dark",
                      color: "secondary.dark",
                      marginLeft: "0.3rem",
                    }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </Container>
          )}
        </List>
        <Stack
          sx={{
            margin: "2rem auto",
            padding: "1rem",
            backgroundColor: "white",
            width: "80%",
            maxWidth: "600px",
            borderRadius: "10px",
            boxShadow: "0px 0px 15px #930001",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "primary.dark",
              textAlign: "center",
            }}
          >
            Add a gift
          </Typography>
          <FormControl
            sx={{
              marginTop: "1rem",
            }}
          >
            <InputLabel
              htmlFor="gift"
              sx={{
                fontSize: "1.2rem",
                color: "primary.dark",
              }}
            >
              Add gift
            </InputLabel>
            <Input
              id="gift"
              value={newGift}
              onChange={(e) => setNewGift(e.target.value)}
              sx={{
                fontSize: "1.2rem",
                color: "info.main",
              }}
            ></Input>
          </FormControl>
          <FormControl
            sx={{
              marginTop: "1rem",
            }}
          >
            <InputLabel
              htmlFor="link"
              sx={{
                fontSize: "1.2rem",
                color: "primary.dark",
              }}
            >
              Link to gift
            </InputLabel>
            <Input
              id="link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              sx={{
                fontSize: "1.2rem",
                color: "info.main",
              }}
            ></Input>
          </FormControl>
          <Button
            onClick={() => handleSaveNew()}
            variant="contained"
            sx={{
              width: "10rem",
              margin: "1rem auto",
            }}
          >
            Save Gift
          </Button>
          <RouterLink to={`/list/${listId}`}>
            <Button
              variant="outlined"
              sx={{
                width: "10rem",
                margin: "0 auto",
              }}
            >
              Back
            </Button>
          </RouterLink>
        </Stack>
      </Container>
    </Container>
  );
};

export default EditUser;
