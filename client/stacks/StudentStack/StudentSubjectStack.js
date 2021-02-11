import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import StudentSubjects from "../../screens/Student/StudentSubjects"
import StudentSubjectDetail from "../../screens/Student/StudentSubjectDetail"
import StudentListClasses from "../../screens/Student/StudentListClasses"
import StudentClassDetail from "../../screens/Student/StudentClassDetail"
import StudentFilesFromClass from "../../screens/Student/StudentFilesFromClass"
import StudentHomeworkFromClass from "../../screens/Student/StudentHomeworkFromClass"
import UploadDelivery from "../../utils/UploadDelivery"
import StudentCorrectionFromClass from "../../screens/Student/StudentCorrectionFromClass"

const Stack = createStackNavigator();
export default function StudentSubjectsStack() {
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
      initialRouteName={"StudentSubjects"}
      >
      <Stack.Screen name = "StudentSubjects" component = {StudentSubjects} />
      <Stack.Screen name = "StudentSubjectDetail" component = {StudentSubjectDetail} />
      <Stack.Screen name = "StudentListClasses" component = {StudentListClasses} />
      <Stack.Screen name = "StudentClassDetail" component = {StudentClassDetail} />
      <Stack.Screen name = "StudentFilesFromClass" component = {StudentFilesFromClass} />
      <Stack.Screen name = "StudentHomeworkFromClass" component = {StudentHomeworkFromClass} />
      <Stack.Screen name = "UploadDelivery" component = {UploadDelivery} />
      <Stack.Screen name = "StudentCorrectionFromClass" component = {StudentCorrectionFromClass} />
    </Stack.Navigator>
  );
}