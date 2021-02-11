import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import CoursesStack from "../../stacks/AdminStack/CoursesStack";
import HomeStack from "../../stacks/AdminStack/HomeStack";
import OptionsStack from "../../stacks/AdminStack/OptionsStack";
import TasksStack from "../../stacks/AdminStack/TasksStack";
import TeachersStack from "../../stacks/AdminStack/TeachersStack"
const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      activeColor="#f0edf6"
      inactiveColor="#e22882"
      barStyle={{ backgroundColor: "#159aed" }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
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
      {/* <Tab.Screen
        name="Tareas"
        component={TasksStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-clipboard-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Cursos"
        component={CoursesStack}
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
        name="Profesores"
        component={TeachersStack}
        options={{
          tabBarIcon: () => {
            return (
              <View>
                <Icon name={"ios-person-outline"} size={25} color={"white"}/>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={OptionsStack}
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

export default MyTabs;
