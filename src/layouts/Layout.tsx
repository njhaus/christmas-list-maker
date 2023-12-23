import { ReactNode, useState } from "react";

import { Button, Stack, Typography, Box } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

import { apiPost } from "../services/api_service";
import useAuth from "../hooks/useAuth";
import Err from "../pages/error/Err";
import footer from "../pages/home/HomeFooter";
import { initialListData } from "../data/listData";
import { testCurrentUser } from "../data/userData";
import GiftBorder from "../components/GiftBorder";
import LightString from "../components/LightString";
import LetterC from "../components/LetterC";

interface iLayout {
  children: JSX.Element;
}

const Layout = ({ children }: iLayout) => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const { currentUser, setCurrentUser } = useAuth();
  const { list, setList } = useAuth();

  const handleLogout = () => {
    const slug = "logout";
    const body = {};
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log("Success...should be redirecting");
        setList(initialListData);
        setCurrentUser(testCurrentUser);
        navigate("/");
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
      setList(initialListData);
      setCurrentUser(testCurrentUser);
    });
  };

  if (err) {
    return (
      <>
        <Err err={err} setErr={setErr}></Err>
        <Link to={"/"}>
          <Button>Return Home</Button>
        </Link>
      </>
    );
  }

  return (
    <Box
      sx={{
        margin: "0",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <LightString />
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link to={"/"}>
          <Button
            variant={"contained"}
            sx={{
              backgroundColor: "#ffffff",
              height: "3.5rem",
              width: "3.5rem",
              zIndex: "10",
              padding: "0",
              margin: "0.25rem",
              "&:hover": {
                backgroundColor: "info.light",
              },
            }}
          >
            <LetterC height={"3rem"}></LetterC>
          </Button>
        </Link>
        <Button
          onClick={() => handleLogout()}
          variant={"contained"}
          sx={{
            backgroundColor: "#ffffff",
            color: "primary.dark",
            zIndex: "10",
            padding: "0",
            margin: "0.25rem",
            height: "3.5rem",
            width: "3.5rem",
            "&:hover": {
              backgroundColor: "info.light",
            },
          }}
        >
          Log Out
        </Button>
      </Stack>
      {children}
      <GiftBorder />
    </Box>
  );
};

export default Layout;
