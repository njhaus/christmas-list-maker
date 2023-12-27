import { ListItem, Box } from "@mui/material";
import LetterC from "./LetterC";

const ListItemCLM = () => {
  return (
    <ListItem
    //   key={i}
      sx={{
        marginBottom: "1rem",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        gap: "1.5rem",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "0.5 1rem",
      }}
    >
      <Box>
        <LetterC height={"2.5rem"} />
      </Box>
      <Box>
       {/* {firstchildren} */}
        <Box
          sx={{
            color: "info.dark",
            fontSize: "1.2rem",
            fontVariantCaps: "all-small-caps",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginLeft: "0.5rem",
          }}
        >
          {/* {secondChildren} */}
        </Box>
      </Box>
    </ListItem>
  );
}

export default ListItemCLM
