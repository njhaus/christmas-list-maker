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
  Link
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Err from "../../layouts/Err";
import { iGift, iEditUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";

interface iEditUserComponent {
  data: iEditUser;
  listId: string;
}

const EditUser = ({data, listId}: iEditUserComponent) => {
  
  

  // Set by API call
  const [user, setUser] = useState(data.name);
  const [gifts, setGifts] = useState(data.gifts);

  const [err, setErr] = useState('')

  const [newGift, setNewGift] = useState("");
  const [newLink, setNewLink] = useState("");
// Is editing takes the id of the gift being edited. The values of the edited gift/link are sotred in the edit states
  const [isEditing, setIsEditing] = useState("");
  const [editGift, setEditGift] = useState('');
  const [editLink, setEditLink] = useState("");

  // Edit a gift
  const handleEdit = (id: string) => {
    setErr("");
    const thisGift = gifts.find(gift => gift.id === id)
    const slug = "user/gift/edit";
    const body = {
      giftId: id,
      description: editGift ? editGift : thisGift?.description,
      link: editLink ? editLink : thisGift?.link,
      listId: listId
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.editedGift) {
        console.log(res);
        setGifts([...gifts.filter(gift => gift.id !== id), res.editedGift])
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setIsEditing('');
    setEditGift('');
    setEditLink('');
  }

  // Make a new gift
  const handleSaveNew = () => {
    setErr("");
    const slug = 'user/gift/new'
    const body = {
      newGift: newGift,
      newLink: newLink,
      listId: listId
    }
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.newGift) {
        console.log(res);
        setGifts([...gifts, res.newGift])
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setNewGift('');
    setNewLink('');
  }

  // Delete a gift
  const handleDelete = (id: string) => {
    setErr("")
    const slug = "user/gift/delete";
    const body = {
      giftId: id,
      listId: listId,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log(res);
        setGifts([...gifts.filter(gift => gift.id !== id)])
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
  }

  return (
    <Container>
      {err && <Err err={err}></Err>}
      <Stack>
        <Typography>{user}'s Christmas List</Typography>
      </Stack>
      <List>
        {gifts.length < 1 ? (
          <Typography>You have no gifts on your list yet.</Typography>
        ) : (
          gifts.map((gift) => (
            <ListItem key={gift.id}>
              {isEditing !== gift.id && (
                <>
                  <ListItemText>{gift.description}</ListItemText>
                  {gift.link && (
                    <Link href={gift.link} target="_blank">
                      <Button>Link</Button>
                    </Link>
                  )}
                  <ListItemButton
                    onClick={() => {
                      setEditGift(gift.description);
                      setEditLink(gift.link);
                      setIsEditing(gift.id);
                    }}
                  >
                    Edit
                  </ListItemButton>
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
                  <ListItemButton onClick={() => handleEdit(gift.id)}>
                    Save
                  </ListItemButton>
                </>
              )}
              <ListItemButton onClick={() => handleDelete(gift.id)}>
                Delete
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      <Stack>
        <Typography>Add a gift</Typography>
        <FormControl>
          <InputLabel htmlFor="gift">Add Gift:</InputLabel>
          <Input
            id="gift"
            value={newGift}
            onChange={(e) => setNewGift(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="link">Link to gift:</InputLabel>
          <Input
            id="link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          ></Input>
          <Button onClick={() => handleSaveNew()}>Save Gift</Button>
        </FormControl>
      </Stack>
      <RouterLink to={`/list/${listId}`}>
        <Button>Back</Button>
      </RouterLink>
    </Container>
  );
};

export default EditUser;
