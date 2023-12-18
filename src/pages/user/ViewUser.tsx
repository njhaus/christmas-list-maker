import { Container, Stack, Typography, List, ListItem, Checkbox , FormControlLabel, Button, ListItemText, FormControl, Input, InputLabel} from "@mui/material";
import { useState } from "react"
import { testNotes, testUser, testGifts } from "../../data/userData";

const ViewUser = () => {

    const [loading, isLoading] = useState(false);

    const [user, setUser] = useState(testUser)
    const [gifts, setGifts] = useState(testGifts);
  const [notes, setNotes] = useState(testNotes);
  
  const [newNote, setNewNote] = useState('');

    if (loading) {
        return (
            <Container>
                <Typography>...Loading</Typography>
            </Container>
        )
    }

  return (
    <Container>
      <Stack>
        <Typography>{user.name}'s Christmas List</Typography>
      </Stack>
      <Stack>
        <List>
          {gifts.map((gift) => (
            <ListItem key={gift._id}>
              <ListItemText>{gift.description}</ListItemText>
              <FormControl>
                <FormControlLabel
                  control={<Checkbox checked={gift.bought} />}
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
            Write a note or add a gift you bought for {user.name}.
          </Typography>
          <Typography>
            ({user.name} can't see your note, but other gift-givers can.)
          </Typography>
          <List>
            {notes.map((note) => (
              <ListItem key={note._id}>
                <ListItemText>{note.text}</ListItemText>
                <ListItemText>By: {note.writer}</ListItemText>
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
      </Stack>
    </Container>
  );
}

export default ViewUser
