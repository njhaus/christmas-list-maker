import { useState } from "react";
import { Container } from "@mui/material";
import ViewUser from "./ViewUser";
import CurrentUser from "./CurrentUser";

const UserRouter = () => {

    // Get the currentUser and user's name for this list id from state.
    // Need to get id from current user AND gift data for this page's user. (as well as id, but do not store the id anywhere.)
  // IN effect: IF current user, reroute to users/current
  //   IF NOT current user, reroute to users/view
  // DO NOT SEND SENSITIVE DATA. Only ever show the current user's id. Just get a response and send the data based on the response. Make another request on the proper route.

  // Set this with effect only. Return it from the backend as a separate property
  const [loading, setLoading] = useState(true);
    const [isThisUser, setIsThisUser] = useState(false);

  if (loading) {
    return <Container>Loading...</Container>;
  }
  
  return (
      <Container>
      {isThisUser
        ? <ViewUser />
        : <CurrentUser/>
      }
      
    </Container>
  )
}

export default UserRouter
