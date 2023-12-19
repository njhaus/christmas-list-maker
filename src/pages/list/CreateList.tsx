import { useState , useRef, useEffect} from "react";

import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Stack,
  List,
  ListItem
} from "@mui/material";

import { iListData, iListUser } from "../../data/listData";
import { apiPost } from "../../services/api_service";


interface iCreateList {
    list: iListData;
  handleCreate: () => void;
  handleSubmitList: (users: iListUser[]) => void;
}

const CreateList = ({ list, handleCreate, handleSubmitList }: iCreateList) => {

  const [users, setUsers] = useState(list.users);
  const [newUser, setNewUser] = useState('')

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref && ref?.current) {
      ref.current.focus();
    }
  }, [users])

  const handleUsers = (username: string) => {
    const addUser = {
      name: username,
      emoji: String.fromCodePoint(0x1f600),
      recipients: ['Anybody'],
      hasCode: false
    };
    setUsers([...users, addUser])
    setNewUser('')
  }

  const updateUser = (newUsername: string, idx: number) => {
    setNewUser('');
    const updatedUsers = users.map((user, index) => {
      if (index === idx) {
        return { ...user, name: newUsername };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  return (
    <div>
      <Typography variant="h3">Enter names:</Typography>
      <form method="post" action="list/edit">
        <Stack>
          <List>
            {users.map((user, i) => {
              if (user.name) {
                return (
                  <ListItem key={i}>
                 <Input
                   id={user.name}
                   aria-describedby="edit user"
                   value={user.name}
                   onChange={(e) => updateUser(e.target.value, i)}
                 />
               </ListItem>)
              }
            })}
            <ListItem>
              <Input
                ref={ref}
                id="new-user"
                aria-describedby="new-user"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                onBlur={(e) => handleUsers(e.target.value)}
              />
            </ListItem>
            {newUser && (
              <ListItem>
                <Input
                  id="new-user-2"
                  aria-describedby="my-helper-text"
                  value={''}
                />
              </ListItem>
            )}
          </List>
        </Stack>
        <Button onClick={() => {
          handleSubmitList(users);
          handleCreate()
        }}>Save List</Button>
        <Button onClick={() => handleCreate()}>Cancel</Button>
      </form>
    </div>
  );
};

export default CreateList;
