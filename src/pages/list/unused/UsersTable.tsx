
import {
  Container,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
  Box,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import RecipientsDialog from "../RecipientsDialog";

const UsersTable = () => {
  return (
    <TableContainer
      className="red-box"
      component={Paper}
      sx={{
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Table
        sx={{
          // minWidth: 650,
          backgroundColor: "white",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Stack>
                <Typography
                  sx={{
                    fontSize: "1.7rem",
                    color: "white",
                    fontWeight: "200",
                  }}
                >
                  Name
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Typography
                sx={{
                  fontSize: "1.7rem",
                  color: "white",
                  fontWeight: "200",
                  paddingBottom: "0.75rem",
                }}
              >
                Buys For
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.users.map((user) => (
            <TableRow
              key={user.name}
              sx={{
                border: "none",
                // backgroundColor: 'white',
                "&:hover": {
                  filter: "brightness(0.5)",
                },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="left">
                <Button
                //   disabled={currentUser.id === "0"}
                //   onClick={() => handleVisitUserPage(user.name)}
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    "&.Mui-disabled": {
                      color: "white",
                    },
                  }}
                >
                  {/* {user.emoji} */}
                  {user.name}
                </Button>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "secondary.light",
                  fontSize: "1.2rem",
                  fontVariantCaps: "all-small-caps",
                }}
              >
                {typeof user.recipients === "string"
                  ? user.recipients
                  : user.recipients.join(", ")}
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              position: "relative",
              height: "2.5rem",
            }}
          >
            <TableCell
              sx={{
                height: "2.5rem",
                padding: "0",
              }}
            >
              {/* {list.users.some((user) =>
                user.recipients.includes("Anybody")
              ) ? (
                <RecipientsDialog
                  text="Create Recipients Lists"
                  handleSetRecipients={handleSetRecipients}
                  maxPeople={list.users.length - 1}
                  tooltip={false}
                  names={list.users.map((user) => user.name)}
                />
              ) : (
                <RecipientsDialog
                  text="Recreate Recipients Lists"
                  handleSetRecipients={handleSetRecipients}
                  maxPeople={list.users.length - 1}
                  tooltip={true}
                  names={list.users.map((user) => user.name)}
                />
              )} */}
            </TableCell>
            <TableCell
              sx={{
                height: "2.5rem",
              }}
            ></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
