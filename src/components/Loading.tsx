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
        </Typography>
      </Box>
    </Box>
  );
}

export default Loading
