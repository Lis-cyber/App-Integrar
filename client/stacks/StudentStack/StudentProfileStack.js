import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StudentProfile from "../../screens/Student/StudentProfile"

const Stack = createStackNavigator();
export default function StudentProfileStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#00aadd",
        },
        headerTintColor: "#fff",
        title: "integrAR",
        headerTitleStyle: {
          fontSize: 20,
          // fontFamily: "roboto",
        },
      }}
      initialRouteName={"StudentProfile"}
      >
      <Stack.Screen name = "StudentProfile" component = {StudentProfile} />
    </Stack.Navigator>
  );
}