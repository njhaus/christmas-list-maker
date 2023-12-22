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
          paddingBottom: "3rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            fontWeight: '600'
          }}
        >
          {isCreating
            ? 'Type your name and an access code, then click SAVE.'
            : "Log in to view other's lists and change your own!"}
        </Typography>
        <form method="post" action="user/">
          <Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                marginTop: "0.5rem",
              }}
            >
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  aria-describedby="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    fontSize: "1.2rem",
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="code">Access Code</InputLabel>
                <Input
                  type="password"
                  id="code"
                  aria-describedby="Your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{
                    fontSize: "1.2rem",
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
