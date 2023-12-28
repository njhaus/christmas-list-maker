import { useState } from "react";

import { Button, Container, FormControl, Stack, Typography } from "@mui/material";
import TextInput from "../../components/TextInput";

interface iUserAccess {
  handleCurrentUser: (user: string, code: string, hasCode: boolean) => void;
}

const UserAccess = ({handleCurrentUser }: iUserAccess) => {

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [reset, setReset] = useState(false);

    return (
      <Container
        sx={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "10px",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
          }}
        >
          Log in or create an access code.
        </Typography>
        <form method="post" action="user/">
          <Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                marginTop: "0.5rem",
                paddingX: "0.5rem",
              }}
            >
              <FormControl>
                <TextInput
                  labelText="Name"
                  id="name"
                  onChange={setName}
                  aria="list name"
                  type="text"
                  labelColor={3}
                  inputColor={3}
                  minLength={1}
                  maxLength={20}
                  checkLength={isCreating}
                  reset={reset}
                ></TextInput>
              </FormControl>
              <FormControl>
                <TextInput
                  labelText="Access Code"
                  id="code"
                  onChange={setCode}
                  aria="list code"
                  type="password"
                  labelColor={3}
                  inputColor={3}
                  minLength={4}
                  maxLength={20}
                  checkLength={isCreating}
                  reset={reset}
                ></TextInput>
              </FormControl>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              {isCreating ? (
                <Button
                  disabled={!name || !code}
                  onClick={() => {
                    handleCurrentUser(name, code, false);
                    setIsCreating(false);
                    setName("");
                    setCode("");
                    setReset(!reset)
                  }}
                  variant="contained"
                  sx={{
                    marginTop: "1rem",
                    width: "12rem",
                    fontSize: "1.2rem",
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  disabled={!name || !code}
                  onClick={() => {
                    handleCurrentUser(name, code, true);
                    setName("");
                    setCode("");
                    setReset(!reset);
                  }}
                  variant="contained"
                  sx={{
                    marginTop: "1rem",
                    width: "12rem",
                    fontSize: "1.2rem",
                  }}
                >
                  Go!
                </Button>
              )}
              <Button
                onClick={() => setIsCreating(!isCreating)}
                variant="outlined"
                sx={{
                  marginTop: "0.5rem",
                  fontSize: "1.2rem",
                }}
              >
                {isCreating ? "Cancel" : "Create Access Code"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    );
};

export default UserAccess;
