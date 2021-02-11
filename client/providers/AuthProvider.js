import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: null,
  logout: () => {},
  resetpass: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout: async () => {
          console.log("Log out triggered");
          try {
            setUser(null);
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("teachers");
          } catch (err) {
            console.log(err);
          }
        },
        resetpass: (email) => {
          console.log("Reset password triggered", email);
        },
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
