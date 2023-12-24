import { useState } from "react";

import { Button, Container, FormControl, Input, Stack, InputLabel, Typography } from "@mui/material";

interface iUserAccess {
  handleCurrentUser: (user: string, code: string, hasCode: boolean) => void;
}

const UserAccess = ({handleCurrentUser }: iUserAccess) => {

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

    return (
      <Container
        sx={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "10px",
          maxWidth: '400px',
          position: 'relative',
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
                <InputLabel
                  htmlFor="name"
                  sx={{
                    fontSize: "1.2rem",
                    color: "info.dark",
                  }}
                >
                  Name
                </InputLabel>
                <Input
                  id="name"
                  aria-describedby="Your name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    fontSize: "1.2rem",
                    color: "info.dark",
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="code"
                  sx={{
                    fontSize: "1.2rem",
                    color: "info.dark",
                  }}
                >
                  Access Code
                </InputLabel>
                <Input
                  type="password"
                  id="code"
                  aria-describedby="Your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{
                    fontSize: "1.2rem",
                    color: "info.dark",
                  }}
                />
              </FormControl>
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              {isCreating ? (
                <Button
                  onClick={() => {
                    handleCurrentUser(name, code, false);
                    setIsCreating(false);
                    setName("");
                    setCode("");
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
                  onClick={() => {
                    handleCurrentUser(name, code, true);
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
