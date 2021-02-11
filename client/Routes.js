import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import CenterView from "./utils/CenterView";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./providers/AuthProvider";
import MyTabs from "./tabs/AdminTabs/Tab";
import TabTeacher from "./tabs/TeachersTabs/TeachersTab";
import AuthStack from "./stacks/AuthStack/AuthStack";
import TabStudent from "./tabs/StudentTab/StudentTab";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // We check if the user is logged or not
  useEffect(() => {
    (async () => {
      try {
        const storageUser = await AsyncStorage.getItem("user");
        if (storageUser) {
          setUser(JSON.parse(storageUser));
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [setUser]);

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );

  return (
    <NavigationContainer>
      {user === null ? (
        <AuthStack />
      ) : user.role === "Admin" ? (
        <MyTabs role={user.role} />
      ) : user.role === "Teacher" ? (
        <TabTeacher role={user.role} />
      ) : user.role === "Student" ? (
        <TabStudent role={user.role} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
