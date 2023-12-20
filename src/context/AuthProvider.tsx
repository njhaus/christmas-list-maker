import { createContext, ReactNode, useState } from "react"
import { iListData, iListUser, initialListData } from "../data/listData"
import { iCurrentUser, testCurrentUser, testUser } from "../data/userData";

interface iAuthProvider {
    list: iListData;
    setList: React.Dispatch<React.SetStateAction<iListData>>;
    currentUser: iCurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<iCurrentUser>>
}


export const AuthContext = createContext<iAuthProvider>({
  list: initialListData,
    setList: () => { }, // Provide a default function for setList
    currentUser: testCurrentUser,
    setCurrentUser: () => { },
});


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [list, setList] = useState(initialListData);
    const [currentUser, setCurrentUser] = useState(testCurrentUser);


  return (
    <AuthContext.Provider value={{list, setList, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
