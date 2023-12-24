import { useState, useEffect, Fragment } from 'react';

import { Container, Typography, Button, Box } from '@mui/material'
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import CreateList from './CreateList';
import ShowList from './ShowList';

import { initialListData } from '../../data/listData';

import { useLocation, Link, useParams } from 'react-router-dom';
import { apiPost } from '../../services/api_service';
import { iListUser } from '../../data/listData';
import useAuth from '../../hooks/useAuth';
import { makeList } from "../../utils/create_list";
import Loading from '../../components/Loading';


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

// ------------------------COMPONENT----------------------------------------------------------------

const List = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(initialListData.users.length < 1);
  // const [list, setList] = useState(initialListData);
  const [err, setErr] = useState('');
  const { list, setList } = useAuth();
  console.log(list);
  const listId = useParams();


  // Get list upon page load
  useEffect(() => {
    console.log(list);
    const getList = async () => {
      console.log('Running API call to get list')
      const body = listId;
      const slug = "list/find";
      apiPost(slug, body).then((res) => {
        if (res?.message === "success") {
          setList(res.data);
          setIsLoading(false);
        } else if (res?.error) {
          console.log(res.error)
          setErr('res.error')
        } else {
          setErr("There was an error processing your request");
        }
        // setIsLoading(false);
      });
    };
    // Checks if list has been uploaded -- 1234 is placeholder, which means it has not.
    if (list._id === "1234" || isLoading === true) {
      getList();

      return () => {
        setList(initialListData);
        setErr('')
        setIsLoading(true);
      };
    } else if (!listId) {
      setErr("Please enter your list name and access code to view this page.");
    }
  }, []);


    const handleCreate = () => {
      setIsCreating(!isCreating);
    };
  
  
  const handleSubmitList = (users: iListUser[]) => {
    console.log('sdvdsvdsvdsvdsv');
    const filteredUsers = users.filter((obj, index, array) => {
      return array.findIndex((item) => item.name === obj.name) === index;
    });
    console.log(filteredUsers);
    if (filteredUsers.length > 0) {
      const prevList = list;
      setList({ ...list, users: filteredUsers });
      const slug = "list/create";
      const body = { ...list, users: users };
      console.log(body);
      apiPost(slug, body).then((res) => {
        console.log(res);
        if (res?.message === "success") {
          console.log("Success saving list");
        } else if (res?.error) {
          setList(prevList);
          console.log(res);
          setErr(res.error);
        } else {
          setList(prevList);
          setErr("There was an error processing your request");
        }
      });
    }
  };

  const handleSetRecipients = (names: string[], num: number) => {
    if (num > names.length - 1) {
      setErr("Too many recipients. Please choose a smaller number of recipients.")
      return
    }
    const recipientList = makeList(names, num);
    const slug = "list/recipients";
    const body = { ...list, users: recipientList };
    console.log(body);
    apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log("Success saving list");
        setList(body)
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
  }


  if (isLoading) {
      return (
          <Loading/>
    )
  }

  if (err) {
    return <Container>
      {err}
      <Link to={'/'}><Button>Return Home</Button></Link>
    </Container>;
  }
  
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
        width: "100%",
        paddingBottom: "8rem",
        minHeight: 'calc(100vh - 6.5rem)'
      }}
    >
      {isCreating && (
        <CreateList
          list={list}
          handleCreate={handleCreate}
          handleSubmitList={handleSubmitList}
        />
      )}
      {!isCreating && (
        <>
          <ShowList list={list} handleSetRecipients={handleSetRecipients} />
          {list.users.length > 0 ? (
            <HtmlTooltip
              title={
                <Fragment>
                  <Typography color="inherit">Caution!</Typography>
                  {
                    "Editing your list will cause your list to be re-created and your recipient list will be reset."
                  }
                </Fragment>
              }
            >
              <Button
                onClick={() => {
                  handleCreate();
                }}
                variant="outlined"
                sx={{
                  marginTop: "2rem",
                  width: "10rem",
                  fontSize: "1.2rem",
                  borderColor: "secondary.main",
                  color: "secondary.main",
                }}
              >
                Edit list
              </Button>
            </HtmlTooltip>
          ) : (
            <Button
              onClick={() => {
                handleCreate();
              }}
              variant="contained"
              sx={{
                marginTop: "2rem",
                width: "10rem",
                fontSize: "1.2rem",
              }}
            >
              Edit list
            </Button>
          )}
        </>
      )}
    </Box>
  );
}

export default List
