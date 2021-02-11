import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import OptionsStackTeacher from "../../stacks/TeachersStack/OptionsStackTeacher";
import TeacherHomeStack from "../../stacks/TeachersStack/TeachersHomeStack"
import TeacherSubjectStack from "../../stacks/TeachersStack/TeacherSubjectStack"
import TeacherCoursesStack from "../../stacks/TeachersStack/TeacherCoursesStack"


const Tab = createMaterialBottomTabNavigator();
function TabTeacher() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      activeColor="#f0edf6"
      inactiveColor="#e22882"
      barStyle={{ backgroundColor: "#159aed" }}
    >
      <Tab.Screen
        name="Inicio"
        component={TeacherHomeStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-home-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
       <Tab.Screen
        name="Materias"
        component={TeacherSubjectStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-book-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={TeacherCoursesStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-school-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={OptionsStackTeacher}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-settings-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabTeacher;
