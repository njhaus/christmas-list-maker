import { useState } from "react";

import { Container, Stack, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Input, Button, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

import { testGifts, testNotes, testUser } from "../../data/userData";
import AddCode from "./AddCode";

const CurrentUser = () => {

    const [loading, isLoading] = useState(false);

    const [isEditing, setIsEditing] = useState('');

  // sent by react-router through params
  const list = '12345';
  
  // Set by API call
    const [user, setUser] = useState(testUser);
    const [gifts, setGifts] = useState(testGifts);
    const [notes, setNotes] = useState(testNotes);
  const [hasCode, setHasCode] = useState(false);
  
  const [newGift, setNewGift] = useState('');

     if (loading) {
       return (
         <Container>
           <Typography>...Loading</Typography>
         </Container>
       );
     } else if (!hasCode) {
         return (
           <Container>
             <Typography variant='h3'>
               Are you {user.name}? Create an access code to start adding gifts!
             </Typography>
             <AddCode/>
           </Container>
         );
     }

  return (
    <Container>
      <Stack>
        <Typography>{user.name}'s Christmas List</Typography>
      </Stack>
      <List>
        {gifts.map((gift) => (
          <ListItem key={gift._id}>
            {isEditing !== gift._id && (
              <>
                <ListItemText>{gift.description}</ListItemText>
                <ListItemButton>Edit</ListItemButton>
              </>
            )}
            {isEditing === gift._id && (
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
}

export default CurrentUser
