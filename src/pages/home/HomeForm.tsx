import { useState, FormEvent } from "react";

// import { redirect } from "react-router-dom";
import { useNavigate, useLocation} from "react-router-dom";


import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { apiPost } from "../../services/api_service";


export interface iHomeForm {
    handleCancel: () => void;
  title: string;
  method: string;
  action: string;
}

const HomeForm = ({ handleCancel, title, method, action }: iHomeForm) => {
  const [listTitle, setListTitle] = useState("");
  const [listCode, setListCode] = useState("");
  const [err, setErr] = useState('');

  const navigate = useNavigate();


  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const slug = title === "Create" ? 'home/new' : 'home/open';
    setErr('');
    if (listTitle && listCode) {
      console.log(listTitle + listCode)
      const body = {
        title: listTitle,
        code: listCode
      }
      apiPost(slug, body).then((res) => {
        console.log(res);
        if (res?.message === "success") {
          console.log("Success...should be redirecting");
          setListTitle("");
          setListCode("");
          navigate(`/list/${res.data.id}`);
        }
        else if (res?.error ) {
          console.log(res);
          setErr(res.error);
        }
        else {
          setErr("There was an error processing your request");
        }
      });
    }
    else {
      setErr('Please enter a name and code.')
    }
  };

  return (
    <div>
      <Typography variant="h3">{title} a List</Typography>
      <form method={method} action={action} onSubmit={(e) => handleForm(e)}>
        <Stack>
          <FormControl>
            <InputLabel htmlFor="title">List Name</InputLabel>
            <Input
              id="title"
              aria-describedby="my-helper-text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="code">Access Code</InputLabel>
            <Input
              type="password"
              id="code"
              aria-describedby="my-helper-text"
              value={listCode}
              onChange={(e) => setListCode(e.target.value)}
            />
          </FormControl>
          <Button type="submit">{title}</Button>
          <Button type="button" onClick={() => handleCancel()}>Cancel</Button>
          {err && <Typography>{err}</Typography>}
        </Stack>
      </form>
    </div>
  );
};

export default HomeForm;
