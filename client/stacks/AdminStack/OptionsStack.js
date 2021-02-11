import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OptionsScreen from "../../screens/Options/OptionsScreen";
import ChangePassScreen from "../../screens/Options/ChangePassScreen";
import EditProfileScreen from "../../screens/Options/EditProfileScreen";

const Stack = createStackNavigator();

export default function OptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
      }}
      initialRouteName={"Options"}
    >
      <Stack.Screen name="Options" component={OptionsScreen} />
      <Stack.Screen name="ResetPass" component={ChangePassScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
