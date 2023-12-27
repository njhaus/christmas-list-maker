import { Box, Typography } from '@mui/material'


const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 6.5rem)",
        backgroundColor: "info.main",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          paddingBottom: "1.5rem",
          borderRadius: "0 0 20% 20%",
          marginTop: "-1px",
          paddingTop: "1rem",
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
          Loading...
          {/* <LetterC height={"6.5rem"} margin={["-1rem", "-0.75rem"]} />
          hristmas List Maker */}
        </Typography>
      </Box>
      {/* <Typography
        variant="h3"
        sx={{
          color: "white",
          marginTop: "5rem",
        }}
      >
        Loading...
      </Typography> */}
    </Box>
  );
}

export default Loading
