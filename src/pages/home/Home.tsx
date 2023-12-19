import { useState } from 'react';

import { Container, Typography, Stack, Button, Tooltip } from '@mui/material';
import HomeForm from './HomeForm';

export interface iHomeForm {
    handleCancel: () => void;
}

const Home = () => {

    const [isCreating, setIsCreating] = useState(false)
    const [isOpening, setIsOpening] = useState(false);

    const handleCancel = () => {
        setIsCreating(false);
        setIsOpening(false);
    }

  return (
    <Container>
      <Typography variant="h1">Christmas List Maker</Typography>
      <Stack sx={{ width: "30rem" }}>
        <Typography>
          Quick explanation.....Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Et, voluptatum veritatis, corporis praesentium
          explicabo consequatur natus magnam nesciunt qui autem labore ipsa
          numquam incidunt. Nam dolore necessitatibus, ratione optio delectus
          eveniet tempora iste expedita facere, adipisci tempore saepe aut ex
          laborum similique omnis. Dicta libero corrupti dolore illo.
          Accusantium, labore.
        </Typography>
        {isCreating && (
          <HomeForm
            handleCancel={handleCancel}
            title="Create"
            method="post"
            action="home/new"
          />
        )}
        {isOpening && (
          <HomeForm
            handleCancel={handleCancel}
            title="Open"
            method="get"
            action="home/open"
          />
        )}
        {!isCreating && !isOpening && (
          <>
            <Tooltip title="Make a new list" placement="right" arrow>
              <Button onClick={() => setIsCreating(!isCreating)}>Create</Button>
            </Tooltip>
            <Tooltip title="Open an existing list" placement="right" arrow>
              <Button onClick={() => setIsOpening(!isOpening)}>Open</Button>
            </Tooltip>
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Home
