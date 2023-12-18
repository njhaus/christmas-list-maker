import { useState } from "react";

import { Button, Container, FormControl, Input, Stack, InputLabel } from "@mui/material";

const UserAccess = () => {

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

    return (
      <Container>
        <h4>
          Type in your name and access code to view other's lists and change
          your own!
        </h4>
        <p>Click on your name to add a code if you don't have one yet.</p>
        <form method="post" action="user/">
          <Stack>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" aria-describedby="Your name" value={name} />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="code">Access Code</InputLabel>
              <Input id="code" aria-describedby="Your code" value={ code} />
            </FormControl>
            <Button>Go!</Button>
          </Stack>
        </form>
      </Container>
    );
};

export default UserAccess;
