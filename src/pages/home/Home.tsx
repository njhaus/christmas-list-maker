import { useState } from "react";

import { Container, Typography, Stack, Button, Tooltip, Box } from "@mui/material";
import HomeForm from "./HomeForm";
import HomeFooter from "./HomeFooter";
import LightString from "../../components/LightString";
import GiftBorder from "../../components/GiftBorder";
import LetterC from "../../components/LetterC";

export interface iHomeForm {
  handleCancel: () => void;
}

const Home = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleCancel = () => {
    setIsCreating(false);
    setIsOpening(false);
  };

  return (
    <Box
      className="main-background"
      sx={{
        margin: "0",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "info.main",
        padding: "0",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <LightString />
      <Box
        sx={{
          backgroundColor: "white",
          paddingBottom: "2rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "4rem",
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
      </Box>
      <Container
        sx={{
          padding: "2rem",
          paddingBottom: "10rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            marginTop: "4.5rem",
            width: "30rem",
            maxWidth: "100%",
            height: "60%",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "secondary.light",
              marginBottom: "1rem",
            }}
          >
            Share Christmas Lists with your crew!
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Make lists, choose recipients, view each other's lists, and even
            mark which gifts have been bought without the recipient being able
            to see. Create a list to get started!
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
                    Create a Group
                  </Button>
                </Tooltip>
                <Tooltip title="Open an existing list" placement="right" arrow>
                  <Button
                    onClick={() => setIsOpening(!isOpening)}
                    variant="outlined"
                    sx={{
                      marginTop: "1rem",
                      fontSize: "1.2rem",
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "secondary.light",
                        color: "secondary.light",
                      },
                    }}
                  >
                    Open a Group
                  </Button>
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
      <GiftBorder />
      <HomeFooter></HomeFooter>
    </Box>
  );
};

export default Home;
