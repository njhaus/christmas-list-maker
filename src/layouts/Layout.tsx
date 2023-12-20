import { useState } from "react";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { apiPost } from "../services/api_service";
import useAuth from "../hooks/useAuth";
import Err from "./Err";
import { initialListData } from "../data/listData";
import { testCurrentUser } from "../data/userData";

const Layout = () => {

    const navigate = useNavigate();
  const [err, setErr] = useState('')
  const { currentUser, setCurrentUser } = useAuth();
  const { list, setList } = useAuth();

    const handleLogout = () => {
        const slug = 'logout';
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
    }

    if (err) {
        return <Err err={err}></Err>
    }

  return (
    <div>
        <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
}

export default Layout
