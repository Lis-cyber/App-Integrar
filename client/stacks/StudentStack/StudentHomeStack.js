import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StudentScreen from "../../screens/Student/StudentScreen"

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
      initialRouteName={"StudentScreen"}
      >
      <Stack.Screen name = "StudentScreen" component = {StudentScreen} />
    </Stack.Navigator>
  );
}