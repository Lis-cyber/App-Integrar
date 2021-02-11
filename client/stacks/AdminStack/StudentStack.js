import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditStudentScreen from "../../screens/SuperAdmin/EditStudentScreen";
import SuperAdminListStudents from "../../screens/SuperAdmin/SuperAdminListStudents";
import AddStudentScreen from "../../screens/SuperAdmin/AddStudentScreen";
import ImageExample from "../../utils/ImageExample"
import AdminStudentDetail from "../../screens/SuperAdmin/AdminStudentDetail"
import CreateStudentsCsv from "../../utils/CreateStudentsCsv"

const Stack = createStackNavigator();

export default function StudentStack() {
    return (
        <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
      }}
      initialRouteName={"ListStudents"}
      >
      <Stack.Screen name="ListStudents" component={SuperAdminListStudents} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      <Stack.Screen name="CreateStudentsCsv" component={CreateStudentsCsv} />
      <Stack.Screen name="ImageExample" component={ImageExample} />
      <Stack.Screen name="EditStudent" component={EditStudentScreen} />
      <Stack.Screen name="AdminStudentDetail" component={AdminStudentDetail} />
    </Stack.Navigator>
    )
}