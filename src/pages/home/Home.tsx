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
    <Container
      sx={{
        margin: "0",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        padding: "0",
      }}
    >
      <Container
        sx={{
          backgroundColor: "primary.dark",
          paddingBottom: "3rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "3rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "secondary.main",
          }}
        >
          Christmas List Maker
        </Typography>
      </Container>
      <Container
        sx={{
          padding: "2rem"
        }}
      >
        <Stack
          sx={{
            marginTop: "4.5rem",
            width: "30rem",
            maxWidth: "100%",
            height: "60%",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "info.dark",
            }}
          >
            With Christmas List Maker you and your crew can make Christmas lists
            and choose recipients for each person on the list. You can then add
            gifts to your list and view gifts others have added to theirs. You
            can even communicate to each other which gifts have been bought
            without the recipient being able to see! Create a list to get
            started!
          </Typography>
          <Stack
            sx={{
              marginTop: "3rem",
            }}
          >
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
                  <Button
                    onClick={() => setIsCreating(!isCreating)}
                    variant="contained"
                    sx={{
                      fontSize: "1.2rem",
                      backgroundColor: "primary.main",
                    }}
                  >
                    Create a List
                  </Button>
                </Tooltip>
                <Tooltip title="Open an existing list" placement="right" arrow>
                  <Button
                    onClick={() => setIsOpening(!isOpening)}
                    variant="outlined"
                    sx={{
                      marginTop: "1rem",
                      fontSize: "1.2rem",
                      borderColor: "info.dark",
                      color: "info.dark",
                    }}
                  >
                    Open a List
                  </Button>
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}

export default Home
