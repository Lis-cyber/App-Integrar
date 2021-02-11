import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListCourses from "../../screens/Teacher/TeacherListCourses"
import TeacherListStudents from "../../screens/Teacher/TeacherListStudents"
import StudentDetail from "../../screens/Teacher/StudentDetail"


const Stack = createStackNavigator();
export default function TechersCoursesStack() {
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
      initialRouteName={"TeacherListCourses"}
    >
      <Stack.Screen name="TeacherListStudents" component={TeacherListStudents} />
      <Stack.Screen name="StudentDetail" component={StudentDetail} />
      <Stack.Screen name="TeacherListCourses" component={TeacherListCourses} />
    </Stack.Navigator>
  );
}
