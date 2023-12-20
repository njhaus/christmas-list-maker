import { useState } from "react";

import { Button, Container, FormControl, Input, Stack, InputLabel } from "@mui/material";

interface iUserAccess {
  handleCurrentUser: (user: string, code: string, hasCode: boolean) => void;
}

const UserAccess = ({handleCurrentUser }: iUserAccess) => {

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

    return (
      <Container>
        <h4>
          {isCreating
            ? 'Type your name and an access code, then click "Save!"'
            : "Type in your name and access code to view other's lists and change your own!"}
        </h4>
        <form method="post" action="user/">
          <Stack>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                aria-describedby="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </FormControl>
            {isCreating ? (
              <Button
                onClick={() => {
                  handleCurrentUser(name, code, false);
                  setIsCreating(false);
                  setName("");
                  setCode("");
                }}
              >
                Save
              </Button>
            ) : (
                <Button
                  onClick={() => {
                    handleCurrentUser(name, code, true);
                  }}
                >
                  Go!
                </Button>
            )}
            <Button onClick={() => setIsCreating(!isCreating)}>
              {isCreating ? "Cancel" : "Create Access Code"}
            </Button>
          </Stack>
        </form>
      </Container>
    );
};

export default UserAccess;
