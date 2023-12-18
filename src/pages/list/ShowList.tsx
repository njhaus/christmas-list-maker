import { Fragment, useState } from 'react';

import { Link } from 'react-router-dom';

import { Container, Typography, Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddCode from '../user/AddCode';
import UserAccess from './UserAccess';
import { iListData } from "../../data/listData";

interface iShowList {
    list: iListData;

}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const ShowList = ({ list }: iShowList) => {
    
const [currentUser, setCurrentUser] = useState({name: '', id: 0})

  return (
    <Container>
      {currentUser.id === 0 ? (
        <UserAccess />
      ) : (
        <Typography variant="h4">
          Hello,{" "}
          {list.users.find((user) => user.name === currentUser.name)?.name}
        </Typography>
      )}

      {list.users.length < 1 ? (
        <Typography>
          Nobody is on your list yet! Click "Edit List" to add people.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Buys For</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.users.map((user) => (
                <TableRow
                  key={user.name}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Link to={`/user`}>
                      <Button>
                        {user.emoji}
                        {user.name}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {user.recipients.join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div>
        <HtmlTooltip
          title={
            <Fragment>
              <Typography color="inherit">Caution!</Typography>
              {"Editing your list will cause your list to be re-created."}
            </Fragment>
          }
        >
          <Button>Edit list</Button>
        </HtmlTooltip>
      </div>
    </Container>
  );
}

export default ShowList
