// import { useState } from "react";

// import { FormControl, InputLabel, Input, Typography, Button, Stack } from "@mui/material";

// import { iHomeForm } from "../Home";

// const CreateForm = ({ handleCancel }: iHomeForm) => {

//   const [listName, setListName] = useState('');
//   const [listCode, setListCode] = useState('');

//   return (
//     <div>
//       <Typography variant="h3">Create a List</Typography>
//       <form method='post' action='/list/create'>
//         <Stack>
//           <FormControl>
//             <InputLabel htmlFor="title">List Name</InputLabel>
//             <Input id="title" aria-describedby="my-helper-text" value={listName} />
//           </FormControl>
//           <FormControl>
//             <InputLabel htmlFor="code">Access Code</InputLabel>
//             <Input id="code" aria-describedby="my-helper-text" value={listCode} />
//           </FormControl>
//           <Button>Create</Button>
//           <Button onClick={() => handleCancel()}>Cancel</Button>
//         </Stack>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;
