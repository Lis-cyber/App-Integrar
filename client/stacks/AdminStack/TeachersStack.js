import { createStackNavigator } from "@react-navigation/stack";
import SuperAdminListTeachers from "../../screens/SuperAdmin/SuperAdminListTeachers";
import React from "react";
import EditTeacherScreen from "../../screens/SuperAdmin/EditTeacherScreen";
import AddTeacherScreen from "../../screens/SuperAdmin/AddTeacherScreen";
import EditStudentScreen from "../../screens/SuperAdmin/EditStudentScreen";
import SuperAdminListStudents from "../../screens/SuperAdmin/SuperAdminListStudents";
import AddStudentScreen from "../../screens/SuperAdmin/AddStudentScreen";
import TeacherClassDetails from "../../screens/Teacher/TeacherClassDetails";
import FilesFromClass from "../../screens/Teacher/FilesFromClass"
import HomeworkFromClass from "../../screens/Teacher/HomeworkFromClass"
import CreateStudentsCsv from "../../utils/CreateStudentsCsv"
import TeacherDetail from "../../screens/SuperAdmin/TeacherDetail"
import AdminStudentDetail from "../../screens/SuperAdmin/AdminStudentDetail"
import ImageExample from "../../utils/ImageExample"
import CreateTeachersCsv from "../../utils/CreateTeachersCsv"

const Stack = createStackNavigator();
//Combinado temporalmente student y teacher en un solo stack
export default function TeachersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00aadd",
        },
        title: "integrAR",
        headerTintColor: "#fff",
      }}
      // initialRouteName={"SuperAdminListTeachers"}
    >
      <Stack.Screen
        name="SuperAdminListTeachers"
        component={SuperAdminListTeachers}
      />
      <Stack.Screen name="EditTeacher" component={EditTeacherScreen} />
      <Stack.Screen name="AddTeacher" component={AddTeacherScreen} />
      <Stack.Screen name="ListStudents" component={SuperAdminListStudents} />
      <Stack.Screen name="EditStudent" component={EditStudentScreen} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      <Stack.Screen name="CreateStudentsCsv" component={CreateStudentsCsv} />
      <Stack.Screen name="TeacherClassDetails" component={TeacherClassDetails} />
      <Stack.Screen name="FilesFromClass" component={FilesFromClass} />
      <Stack.Screen name="HomeworkFromClass" component={HomeworkFromClass} />
      <Stack.Screen name="TeacherDetail" component={TeacherDetail} />
      <Stack.Screen name="AdminStudentDetail" component={AdminStudentDetail} />
      <Stack.Screen name="ImageExample" component={ImageExample} />
      <Stack.Screen name="CreateTeachersCsv" component={CreateTeachersCsv} />
      

    </Stack.Navigator>
  );
}
