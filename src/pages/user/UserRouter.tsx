import { useState, useEffect } from "react";

import { Box } from "@mui/material";

import { useParams } from "react-router-dom";

import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import Err from "../error/Err";
import { apiPost } from "../../services/api_service";
import {
  testEditUser,
  testViewUser,
} from "../../data/userData";
import Loading from "../../components/Loading";
import { apiValidation } from "../../utils/api_validation";

const UserRouter = () => {
  // Get the currentUser and user's name for this list id from state.
  // Need to get id from current user AND gift data for this page's user. (as well as id, but do not store the id anywhere.)
  // IN effect: IF current user, reroute to users/current
  //   IF NOT current user, reroute to users/view
  // DO NOT SEND SENSITIVE DATA. Only ever show the current user's id. Just get a response and send the data based on the response. Make another request on the proper route.
  // const location = useLocation();
  // Set this with effect only. Return it from the backend as a separate property
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  // const { list, setList } = useAuth();
  const { listId, username } = useParams();

  const [viewUser, setViewUser] = useState(testViewUser);
  const [editUser, setEditUser] = useState(testEditUser);
  const [err, setErr] = useState("");

  // Get data for VIEW USER or AM USER (Matches currentuser) (Uses user token) or OTHER user (if token does not match)
  // Get currentUser NAME ONLY
  useEffect(() => {
    const getUser = async () => {
      console.log("Running API call to get user");
      const body = {
        listId: listId,
        name: username,
      };
      const slug = "user/data";
      if (!apiValidation(body)) {
        setErr(
          "We've encountered some invalid values. Please review your input and make sure it meets the required criteria. Once you've made the necessary changes, please try submitting again."
        );
        return;
      }
      apiPost(slug, body).then((res) => {
        if (res?.message === "success" && res?.data) {
          if (res.data?.editUser && res.data?.currentUser) {
            console.log(res.data);
            setEditUser(res.data.editUser);
            setCurrentUser(res.data.currentUser);
          } else if (res.data?.viewUser) {
            console.log(res.data.viewUser);
            setViewUser(res.data.viewUser);
            setCurrentUser(res.data.currentUser);
          } else {
            console.log("no data returned");
            setErr("No data exists for this user.");
          }
        } else if (res?.error) {
          console.log(res.error);
          setErr(res.error);
        } else {
          console.log("no currently logged in user");
          setErr("");
        }
        setIsLoading(false);
      });
    };
    // Checks if user has been uploaded -- 0 is placeholder, which means it has not.
    getUser();

    return () => {
      setErr("");
      setIsLoading(true);
    };
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {err && <Err err={err} setErr={setErr}></Err>}
      {viewUser.gifts[0]?.id !== "0" && (
        <ViewUser
          data={viewUser}
          listId={listId ? listId : ""}
          currentUser={currentUser}
        />
      )}
      {editUser.gifts[0]?.id !== "0" && (
        <EditUser data={editUser} listId={listId ? listId : ""} />
      )}
    </Box>
  );
};

export default UserRouter;
