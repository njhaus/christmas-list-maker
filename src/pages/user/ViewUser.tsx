import { Container, Stack, Typography, List, ListItem, Checkbox, FormControlLabel, Button, ListItemText, FormControl, Input, InputLabel, ListItemButton } from "@mui/material";
import { useState } from "react"

import { Link as RouterLink } from "react-router-dom";


import { testNotes, testUser, testGifts, iViewUser } from "../../data/userData";
import { apiPost } from "../../services/api_service";
import Err from "../../layouts/Err";

interface iViewUserComponent {
  data: iViewUser,
  listId: string
} 

const ViewUser = ({ data, listId }: iViewUserComponent) => {
  const [loading, isLoading] = useState(false);

  const [user, setUser] = useState(data.name);
  const [gifts, setGifts] = useState(data.gifts);
  const [notes, setNotes] = useState(data.notes);

  const [newNote, setNewNote] = useState("");

  const [err, setErr] = useState('')

  const handleBuyGift = (id: string) => {
    // Handles buying or 'un-buying' gift
    const previousGifts = gifts;
    const thisGift = gifts.find(gift => gift.id === id);
    if (thisGift && thisGift?.bought) {
      thisGift.bought = !thisGift.bought
      setGifts([...gifts, thisGift])

      const slug = "user/gift/buy";
      const body = {
        giftId: id,
        bought: thisGift.bought,
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
    }
  }


  if (loading) {
    return (
      <Container>
        <Typography>...Loading</Typography>
      </Container>
    );
  }

  return (
    <Container>
      {err && <Err err={err}></Err>}
      <Stack>
        <Typography>{user}'s Christmas List</Typography>
      </Stack>
      <Stack>
        <List>
          {gifts.map((gift) => (
            <ListItem key={gift.id}>
              <ListItemText>{gift.description}</ListItemText>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!gift.bought ? false : true}
                      onChange={() => handleBuyGift(gift.id)}
                    />
                  }
                  label="Bought"
                />
              </FormControl>
              {gift.bought && (
                <ListItemText>Bought by: {gift.buyer_name}</ListItemText>
              )}
            </ListItem>
          ))}
        </List>
        <Stack>
          <Typography>
            Write a note or add a gift you bought for {user}.
          </Typography>
          <Typography>
            ({user} can't see your note, but other gift-givers can.)
          </Typography>
          <List>
            {notes.map((note) => (
              <ListItem key={note.id}>
                <ListItemText>{note.text}</ListItemText>
                <ListItemText>By: {note.written_by}</ListItemText>
                <ListItemButton>Delete</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Stack>
            <FormControl>
              <InputLabel htmlFor="note">Add Note:</InputLabel>
              <Input id="note" value={newNote}></Input>
              <Button>Save Note</Button>
            </FormControl>
          </Stack>
        </Stack>
        <RouterLink to={`/list/${listId}`}>
          <Button>Back</Button>
        </RouterLink>
      </Stack>
    </Container>
  );
};

export default ViewUser
