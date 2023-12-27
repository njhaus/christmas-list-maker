// import { useState } from "react";

// import { FormControl, InputLabel, Input, Typography, Button, Stack } from "@mui/material";

// import { iHomeForm } from "../Home";

// const OpenForm = ({ handleCancel }: iHomeForm) => {
  
//   const [listName, setListName] = useState("");
//   const [listCode, setListCode] = useState("");

//   return (
//     <div>
//       <Typography variant="h3">Open a list</Typography>
//       <form method="get" action="/list">
//         <Stack>
//           <FormControl>
//             <InputLabel htmlFor="title">List Name</InputLabel>
//             <Input
//               id="title"
//               aria-describedby="my-helper-text"
//               value={listName}
//             />
//           </FormControl>
//           <FormControl>
//             <InputLabel htmlFor="code">Access Code</InputLabel>
//             <Input
//               id="code"
//               aria-describedby="my-helper-text"
//               value={listCode}
//             />
//           </FormControl>
//           <Button>Open</Button>
//           <Button onClick={() => handleCancel()}>Cancel</Button>
//         </Stack>
//       </form>
//     </div>
//   );
// }

// export default OpenForm
