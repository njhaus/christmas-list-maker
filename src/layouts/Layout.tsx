import { useState } from "react";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { apiPost } from "../services/api_service";
import Err from "./Err";

const Layout = () => {

    const navigate = useNavigate();
    const [err, setErr] = useState('')

    const handleLogout = () => {
        const slug = 'logout';
        const body = {};
        apiPost(slug, body).then((res) => {
          console.log(res);
          if (res?.message === "success") {
              console.log("Success...should be redirecting");
              navigate("/");
          } else if (res?.error) {
            console.log(res);
            setErr(res.error);
          } else {
            setErr("There was an error processing your request");
          }
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
