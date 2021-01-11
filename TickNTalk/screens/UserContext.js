import React, { useState, createContext } from "react";
import { Text, View } from "react-native";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    uid: "",
    isLoggedIn: null, //hihi
    profilePhotoUrl: "default",
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
