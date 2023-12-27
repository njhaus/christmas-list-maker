import { useState } from "react";

import {
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  Input,
  Button,
  Box,
  FormControl
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import Err from "../error/Err";
import { iEditUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import AddGift from "./AddGift";
import LetterC from "../../components/LetterC";

interface iEditUserComponent {
  data: iEditUser;
  listId: string;
}

const EditUser = ({ data, listId }: iEditUserComponent) => {
  // Set by API call
  const user = data.name;
  const [gifts, setGifts] = useState(data.gifts);
  const [isAdding, setIsAdding] = useState(false)

  const [err, setErr] = useState("");

  // Is editing takes the id of the gift being edited. The values of the edited gift/link are sotred in the edit states
  const [isEditing, setIsEditing] = useState("");
  const [editGift, setEditGift] = useState("");
  const [editLink, setEditLink] = useState("");

  // Open add a gift
  const handleIsAdding = () => {
    setIsAdding(!isAdding)
  }

  // Edit a gift
  const handleEdit = (id: string) => {
    setErr("");
    const thisGift = gifts.find((gift) => gift.id === id);
    // Add https:// to link if it is not there -- link will not work otherwise
    const link = editLink ? editLink.match('https://') ? editLink : `https://${editLink}` : thisGift?.link;
    const slug = "user/gift/edit";
    const body = {
      giftId: id,
      description: editGift ? editGift : thisGift?.description,
      link: link,
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
          {user}'s Christmas List
        </Typography>
      </Stack>
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
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
          <Container >
            <Typography
              variant="h4"
              sx={{
                color: "white",
              }}
            >
              My Gifts
            </Typography>
            <List
              sx={{
                margin: "1rem auto",
              }}
            >
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
                  {isEditing !== gift.id && (
                    <>
                      <Box>
                        <LetterC height={"2.5rem"} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "primary.dark",
                            fontWeight: "600",
                          }}
                        >
                          {gift.description}
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
                          {gift.link && (
                            <a href={gift.link} target="_blank" rel="noopener">
                              <Button>Link</Button>
                            </a>
                          )}
                          <Button
                            onClick={() => {
                              setEditGift(gift.description);
                              setEditLink(gift.link);
                              setIsEditing(gift.id);
                            }}
                            variant="text"
                            sx={{
                              width: "3rem",
                              color: "info.dark",
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(gift.id)}
                            variant="text"
                            sx={{
                              width: "5rem",
                              // borderColor: "secondary.dark",
                              color: "secondary.dark",
                              marginLeft: "0.3rem",
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )}
                  {isEditing === gift.id && (
                    <>
                      <Box>
                        <LetterC height={"2.5rem"} />
                      </Box>
                      <Box>
                        <FormControl>
                          <Input
                            id="edit-gift"
                            value={editGift}
                            onChange={(e) => setEditGift(e.target.value)}
                            sx={{
                              color: "info.dark",
                            }}
                          ></Input>
                        </FormControl>
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
                          <FormControl>
                            <Input
                              id="edit-link"
                              value={editLink}
                              onChange={(e) => setEditLink(e.target.value)}
                              sx={{
                                color: "info.dark",
                              }}
                            ></Input>
                          </FormControl>
                          <Button
                            onClick={() => handleEdit(gift.id)}
                            variant="outlined"
                            sx={{
                              width: "3rem",
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </Container>
        )}
        {isAdding ? (
          <AddGift
            gifts={gifts}
            setGifts={setGifts}
            listId={listId}
            handleIsAdding={handleIsAdding}
          />
        ) : (
          <Button
            onClick={() => handleIsAdding()}
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              marginTop: "1rem",
              width: "7.5rem",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              "&:active": {
                backgroundColor: "info.dark",
              },
            }}
          >
            Add a Gift
          </Button>
        )}
      </Container>
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
    </Box>
  );
};

export default EditUser;
