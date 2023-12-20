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
} from "@mui/material";
import { Link } from "react-router-dom";

import { testGifts, testNotes, testUser } from "../../data/userData";
import AddCode from "./unused/AddCode";
import { iGift, iEditUser } from "../../data/userData";

interface iEditUserComponent {
  data: iEditUser;
}

const EditUser = ({data}: iEditUserComponent) => {
  
  const [isEditing, setIsEditing] = useState("");

  // Set by API call
  const [user, setUser] = useState(data.name);
  const [gifts, setGifts] = useState(data.gifts);


  const [newGift, setNewGift] = useState("");

  return (
    <Container>
      <Stack>
        <Typography>{user}'s Christmas List</Typography>
      </Stack>
      <List>
        {gifts.length < 1
          ? <Typography>You have no gifts on your list yet.</Typography>
        : gifts.map((gift) => (
          <ListItem key={gift.id}>
            {isEditing !== gift.id && (
              <>
                <ListItemText>{gift.description}</ListItemText>
                <ListItemButton>Edit</ListItemButton>
              </>
            )}
            {isEditing === gift.id && (
              <>
                <Input id="edit-gift" value={gift.description}></Input>
                <ListItemButton>Save</ListItemButton>
              </>
            )}
            <ListItemButton>Delete</ListItemButton>
          </ListItem>
        ))}
      </List>
      <Stack>
        <Typography>Add a gift</Typography>
        <FormControl>
          <InputLabel htmlFor="gift">Add Gift:</InputLabel>
          <Input id="gift" value={newGift}></Input>
          <Button>Save Gift</Button>
        </FormControl>
      </Stack>
      <Link to="">
        <Button></Button>
      </Link>
    </Container>
  );
};

export default EditUser;
