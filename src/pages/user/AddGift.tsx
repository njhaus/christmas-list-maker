
import { useState } from "react";
import { Stack, Typography, FormControl, Input, InputLabel, Button } from "@mui/material";
import Err from "../error/Err";
import { apiPost } from "../../services/api_service";
import { iGift } from "../../data/userData";
import { formConstraint } from "../../utils/form_contraints";

interface iAddGift {
  gifts: iGift[];
  setGifts: React.Dispatch<React.SetStateAction<iGift[]>>;
    listId: string;
    handleIsAdding: () => void
}
    
const AddGift = ({gifts, setGifts, listId, handleIsAdding}: iAddGift) => {

  const [newGift, setNewGift] = useState("");
    const [newLink, setNewLink] = useState("");
    
    const [err, setErr] = useState('');

  // Make a new gift
  const handleSaveNew = () => {
    setErr("");
    // Add https:// to link if it is not there -- link will not work otherwise
    const link = newLink ? newLink.match("https://")
      ? newLink
      : `https://${newLink}`
      : '';

    const slug = "user/gift/new";
    const body = {
      newGift: newGift,
      newLink: link,
      listId: listId,
    };
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.newGift) {
        console.log(res);
        setGifts([...gifts, res.newGift]);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
    setNewGift("");
    setNewLink("");
    handleIsAdding();
  };
    
    
  return (
    <Stack
      sx={{
        margin: "2rem auto",
        padding: "1rem",
        backgroundColor: "white",
        width: "80%",
        maxWidth: "600px",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px #930001",
      }}
    >
      {err && <Err err={err} setErr={setErr}></Err>}
      <Typography
        variant="h4"
        sx={{
          color: "primary.dark",
          textAlign: "center",
        }}
      >
        Add a gift
      </Typography>
      <FormControl
        sx={{
          marginTop: "1rem",
        }}
      >
        <InputLabel
          htmlFor="gift"
          sx={{
            fontSize: "1.2rem",
            color: "primary.dark",
          }}
        >
          Add gift
        </InputLabel>
        <Input
          id="gift"
          value={newGift}
          onChange={(e) => {
            if (formConstraint(e.target.value, 40)) {
              setNewGift(e.target.value)
            }
          }}
          sx={{
            fontSize: "1.2rem",
            color: "info.main",
          }}
        ></Input>
      </FormControl>
      <FormControl
        sx={{
          marginTop: "1rem",
        }}
      >
        <InputLabel
          htmlFor="link"
          sx={{
            fontSize: "1.2rem",
            color: "primary.dark",
          }}
        >
          Link to gift
        </InputLabel>
        <Input
          id="link"
          value={newLink}
          onChange={(e) => {
            if (formConstraint(e.target.value, 200)) {
              setNewLink(e.target.value)
            }
          }}
          sx={{
            fontSize: "1.2rem",
            color: "info.main",
          }}
        ></Input>
      </FormControl>
      <Button
        onClick={() => handleSaveNew()}
        variant="contained"
        sx={{
          width: "10rem",
          margin: "1rem auto",
        }}
      >
        Save Gift
      </Button>
        <Button
            onClick={() => handleIsAdding()}
            variant="outlined"
            sx={{
            width: "10rem",
            margin: "0 auto",
            }}
        >
            Cancel
        </Button>
    </Stack>
  );
}

export default AddGift
