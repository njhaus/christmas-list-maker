import { Box, Button, Typography } from "@mui/material";


interface iErr {
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}

const Err = ({err, setErr}: iErr) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        width: '20rem',
        borderRadius: '10px',
        margin: '0 auto',
        padding: '0.5rem',
        position: 'absolute',
        top: '50vh',
        left: '50%',
        transform: 'translate(-50%, -25vh)',
        zIndex: '20',
        boxShadow: '0px 2px 10px black'
      }}
    >
      <Typography
        sx={{
          color: "primary.dark",
        }}
      >
        Error: {err}
      </Typography>
      {/* <Link to={"/"}> */}
      <Button onClick={() => setErr("")} variant="outlined" sx={{marginTop: '0.5rem'}}>Ok</Button>
      {/* </Link> */}
    </Box>
  );
}

export default Err
