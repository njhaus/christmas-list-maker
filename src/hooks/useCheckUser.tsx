import { iListUser } from "../data/listData";
import { apiPost } from "../services/api_service";

const useCheckUser = (user: iListUser, setUser,  ) => {
    const checkUser = () => {
      apiPost(slug, body).then((res) => {
      console.log(res);
      if (res?.message === "success") {
        console.log(res);
        setCurrentUser(res.data);
      } else if (res?.error) {
        console.log(res);
        setErr(res.error);
      } else {
        setErr("There was an error processing your request");
      }
    });
  };
  }
  
    return 
}

export default useCheckUser
