import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import {Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";


const TeacherView = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  
  return (
    <CenterView>
      <Image
          source={require("../../assets/title.png")}
          style={styles.titleName}
        />
      <Text style={styles.title}>
        ¡Hola {user.name}
        {user.lastname}, Bienvenido!
      </Text>
      <View style={styles.cont}>
        <View style={styles.materias}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Materias", {
                screen:"TeacherListSubjects",
              })
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/materias.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>MATERIAS</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.alumn}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Cursos", {
                screen:"TeacherListCourses",
              })
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/cursos.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>CURSOS</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  materias: {
    justifyContent: "center",
    alignItems: "center",
  },
  courses: {
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 10,
    width: 156,
    height: 168,
  },
  title: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 25,
    fontWeight: "bold"
  },
  touch: {
    margin: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    fontSize: 18,
    color: "#000000",
  },
  titleName: {
    width: 150,
    height: 80,
  }
});

export default TeacherView;

// Crear Screens:
// TeacherScreen --> Ready
//    TeacherListSubjects : --> Ready
//      TeacherListUnit (AddUnit, DeleteUnit)
//          AddUnit
//        TeacherListClass (AddClass, DeleteClass)
//    TeacherListCourse :  --> Ready
//      TeacherListStudent --> Ready
//        StudentDetail: --> Ready
