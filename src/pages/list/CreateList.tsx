import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import React from "react";

import { iListData } from "../../data/listData";


interface iCreateList {
    list: iListData;
    handleCreate: () => void;
}

const CreateList = ({ list, handleCreate }: iCreateList) => {
  return (
    <div>
      <Typography variant="h2">Enter names:</Typography>
      <form method="post" action="list/edit">
        <Stack>
          <FormControl>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
        </Stack>
        <Button>Open</Button>
        <Button onClick={() => handleCreate()}>Cancel</Button>
      </form>
    </div>
  );
};

export default CreateList;
