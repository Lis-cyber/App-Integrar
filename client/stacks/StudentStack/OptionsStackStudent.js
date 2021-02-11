import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OptionsScreenStudent from "../../screens/Options/OptionsScreenStudent";
import ChangePassScreen from "../../screens/Options/ChangePassScreen";
import EditProfileScreen from "../../screens/Options/EditProfileScreen";

const Stack = createStackNavigator();

export default function OptionsStackStudent() {
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
      <Stack.Screen name="Options" component={OptionsScreenStudent} />
      <Stack.Screen name="ResetPass" component={ChangePassScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
