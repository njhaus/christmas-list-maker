import { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import {
  FormControl,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { apiPost } from "../../services/api_service";
import Err from "../error/Err";
import TextInput from "../../components/TextInput";

export interface iHomeForm {
  handleCancel: () => void;
  title: string;
  method: string;
  action: string;
}

const HomeForm = ({ handleCancel, title, method, action }: iHomeForm) => {
  const [listTitle, setListTitle] = useState("");
  const [listCode, setListCode] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const slug = title === "Create" ? "home/new" : "home/open";
    setErr("");
    if (listTitle && listCode) {
      console.log(listTitle + listCode);
      const body = {
        title: listTitle,
        code: listCode,
      };
      apiPost(slug, body).then((res) => {
        console.log(res);
        if (res?.message === "success") {
          console.log("Success...should be redirecting");
          setListTitle("");
          setListCode("");
          navigate(`/list/${res.listId}`);
        } else if (res?.error) {
          console.log(res);
          setErr(res.error);
        } else {
          setErr("There was an error processing your request");
        }
      });
    } else {
      setErr("Please enter a name and code.");
    }
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px #930001",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
        }}
      >
        {title} a Group
      </Typography>
      <form method={method} action={action} onSubmit={(e) => handleForm(e)}>
        <Stack sx={{ alignItems: "center", justifyContent: "start" }}>
          <FormControl
            sx={{
              marginTop: "1rem",
            }}
          >
            <TextInput
              labelText="Group Title"
              id="title"
              onChange={setListTitle}
              aria="list title"
              type="text"
              labelColor={3}
              inputColor={3}
              minLength={4}
              maxLength={20}
              checkLength={true}
            ></TextInput>
          </FormControl>
          <FormControl
            sx={{
              marginTop: "1rem",
            }}
          >
            <TextInput
              labelText="Access Code"
              id="password"
              onChange={setListCode}
              aria="list password"
              type="password"
              labelColor={3}
              inputColor={3}
              minLength={4}
              maxLength={20}
            ></TextInput>
          </FormControl>
          {err && <Err err={err} setErr={setErr}></Err>}
          <Button
            type="submit"
            variant="contained"
            disabled={!listTitle || !listCode}
            sx={{
              marginTop: "2rem",
              width: "10rem",
              fontSize: "1.2rem",
              backgroundColor: "primary.main",
            }}
          >
            {title}
          </Button>
          <Button
            type="button"
            onClick={() => handleCancel()}
            variant="outlined"
            sx={{
              marginTop: "1rem",
              width: "10rem",
              fontSize: "1.2rem",
              borderColor: "info.dark",
              color: "info.dark",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default HomeForm;
