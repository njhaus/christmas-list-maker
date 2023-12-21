import { Container, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

interface iErr {
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}

const Err = ({err, setErr}: iErr) => {
  return (
    <Container>
      <Typography sx={{
        color: 'warning.main'
      }}
      >{err}</Typography>
      {/* <Link to={"/"}> */}
        <Button onClick={() => setErr('')}>Ok</Button>
      {/* </Link> */}
    </Container>
  );
}

export default Err
