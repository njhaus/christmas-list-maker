import { Container, Button } from "@mui/material";

import { Link } from "react-router-dom";

interface iErr {
    err: string;
}

const Err = ({err}: iErr) => {
  return (
    <Container>
      {err}
      <Link to={'/'}><Button>Return Home</Button></Link>
    </Container>
  )
}

export default Err
