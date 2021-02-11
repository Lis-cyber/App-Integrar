import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StudentTeachers from "../../screens/Student/StudentTeachers"

const Stack = createStackNavigator();
export default function StudentHomeStack() {
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
      initialRouteName={"StudentTeachers"}
      >
      <Stack.Screen name = "StudentTeachers" component = {StudentTeachers} />
    </Stack.Navigator>
  );
}