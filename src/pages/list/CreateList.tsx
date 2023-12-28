import { useState , useRef, useEffect} from "react";

import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
   Box, Container
} from "@mui/material";

import { iListData, iListUser } from "../../data/listData";
import LetterC from "../../components/LetterC";


interface iCreateList {
    list: iListData;
  handleCreate: () => void;
  handleSubmitList: (users: iListUser[]) => void;
}

const CreateList = ({ list, handleCreate, handleSubmitList }: iCreateList) => {

  const [users, setUsers] = useState(list.users);
  const [newUser, setNewUser] = useState('');
  const [err, setErr] = useState('')

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref && ref?.current) {
      ref.current.focus();
    }
  }, [users])

  const handleUsers = (username: string) => {
    if (!username.match(/[<>&"';*]/g)) {
      const addUser = {
        name: username,
        emoji: String.fromCodePoint(0x1f600),
        recipients: ['Anybody'],
        hasCode: false
      };
      setUsers([...users, addUser])
      setNewUser('')
    }
    else {
      setErr('Invalid characters not allowed in names')
    }
  }

  const updateUser = (newUsername: string, idx: number) => {
    setNewUser('');
    if (!newUsername.match(/[<>&"';*]/g)) {
      const updatedUsers = users.map((user, index) => {
        if (index === idx) {
          return { ...user, name: newUsername };
        }
        return user;
      });
      setUsers(updatedUsers);
    }
  }

  useEffect(() => {
    if (
      users
        .map((user, i) =>
          users.find((chkuser, idx) => chkuser.name === user.name && idx !== i && chkuser.name !== '')
        )
        .some((val) => val)
    ) {
      setErr("You cannot have two users with the same name.");
    } else {
      setErr('')
    }
  }, [newUser, users])
  

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          backgroundColor: "white",
          paddingBottom: "1.5rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "1rem",
          width: "100%",
          boxShadow: "0px 5px 15px #930001",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "info.main",
          }}
        >
          <LetterC height={"6.5rem"} margin={["-1rem", "-0.75rem"]} />
          hristmas List Maker
        </Typography>
      </Container>
      <form method="post" action="list/edit">
        <Stack
          sx={{
            alignItems: "center",
            marginTop: "2rem",
            minHeight: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "secondary.light",
            }}
          >
            Enter names:
          </Typography>
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
                      sx={{
                        width: "12rem",
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    />
                  </ListItem>
                );
              }
            })}
            <ListItem>
              <FormControl>
                <InputLabel
                  htmlFor="new-user"
                  sx={{
                    color: "secondary.light",
                  }}
                >
                  Name
                </InputLabel>
                <Input
                  disabled={err ? true : false}
                  ref={ref}
                  id="new-user"
                  aria-describedby="new-user"
                  value={newUser}
                  onChange={(e) => {
                    if (!e.target.value.match(/[<>&"';*]/g)) {
                      setNewUser(e.target.value);
                    }
                  }
                  }
                  onBlur={(e) => handleUsers(e.target.value)}
                  sx={{
                    marginTop: "2rem",
                    width: "12rem",
                    fontSize: "1.2rem",
                    color: "secondary.light",
                  }}
                />
              </FormControl>
            </ListItem>
            {newUser && (
              <ListItem>
                <FormControl>
                  <InputLabel htmlFor="new-user-temp">List Name</InputLabel>
                  <Input
                    id="new-user-temp"
                    aria-describedby="temporary"
                    value={""}
                    sx={{
                      marginTop: "2rem",
                      width: "12rem",
                      fontSize: "1.2rem",
                      color: "secondary.light",
                    }}
                  />
                </FormControl>
              </ListItem>
            )}
          </List>
          {err && <Typography>{err}</Typography>}
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          {list.users.length > 0 && (
            <Typography
              sx={{
                maxWidth: "80%",
                color: "secondary.dark",
                fontSize: "1.2rem",
              }}
            >
              Warning! Making changes to this list will reset all users and
              erase any recipient lists you have created.
            </Typography>
          )}
          <Button
            disabled={err ? true : false}
            onClick={() => {
              handleSubmitList(users.filter((user) => user.name !== ""));
              handleCreate();
            }}
            variant="contained"
            sx={{
              marginTop: "1rem",
              width: "10rem",
              fontSize: "1.2rem",
            }}
          >
            Save List
          </Button>
          <Button
            onClick={() => handleCreate()}
            variant="outlined"
            sx={{
              marginTop: "1rem",
              width: "10rem",
              fontSize: "1.2rem",
              borderColor: "secondary.light",
              color: "secondary.light",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateList;
