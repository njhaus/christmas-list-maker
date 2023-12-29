
import { useState } from "react";
import { Stack, Typography, FormControl, Input, InputLabel, Button } from "@mui/material";
import { apiPost } from "../../services/api_service";
import { iGift } from "../../data/userData";
import { formConstraint } from "../../utils/form_contraints";
import { apiValidation } from "../../utils/api_validation";

interface iAddGift {
  gifts: iGift[];
  setGifts: React.Dispatch<React.SetStateAction<iGift[]>>;
    listId: string;
  handleIsAdding: () => void;
  handleErr: (error: string) => void
}
    
const AddGift = ({gifts, setGifts, listId, handleIsAdding, handleErr}: iAddGift) => {

  const [newGift, setNewGift] = useState("");
    const [newLink, setNewLink] = useState("");

  // Make a new gift
  const handleSaveNew = () => {
    handleErr("");
    // Add https:// to link if it is not there -- link will not work otherwise
    const link = newLink ? newLink.match("https://")
      ? newLink
      : `https://${newLink}`
      : '';

    const slug = "user/gift/new";
    const body = {
      giftDescription: newGift,
      link: link,
      listId: listId,
    };
    if (!apiValidation(body)) {
      handleErr(
        "We've encountered some invalid values. Please review your input and make sure it meets the required criteria. Once you've made the necessary changes, please try submitting again."
      );
      return;
    }
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success" && res?.newGift) {
        console.log(res);
        setGifts([...gifts, res.newGift]);
      } else if (res?.error) {
        console.log(res);
        handleErr(res.error);
      } else {
        handleErr("There was an error processing your request");
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
        disabled={!newGift}
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
