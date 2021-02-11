import React, { useContext } from "react";
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  Image,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";

const SuperAdminView = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <CenterView>
      <Text style={styles.title}>¡Hola {user.name}! Bienvenido</Text>
      <View style={styles.cont}>
        <View style={styles.courses}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor=""
            style={styles.touch}
            onPress={() =>
              navigation.navigate("Cursos", { screen: "GradesScreen" })
            }
          >
            <View style={styles.button}>
              <Image source={require("../../assets/grades.jpg")} style={styles.img} />
              <Text style={styles.touchText}>GRADOS</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.teachers}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor=""
            style={styles.touch}
            onPress={() =>
              navigation.navigate("Profesores", {
                screen: "SuperAdminListTeachers",
              })
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/teachers.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>PROFESORES</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.alumn}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor=""
          style={styles.touch}
          onPress={() =>
            navigation.navigate("Profesores", { screen: "ListStudents" })
          }
        >
          <View style={styles.button}>
            <Image source={require("../../assets/student.jpg")} style={styles.img} />
            <Text style={styles.touchText}>ALUMNOS</Text>
          </View>
        </TouchableHighlight>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  teachers: {
    // marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alumn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  courses: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    // marginTop: 10,
    width: 156,
    height: 180,
  },
  title: {
    // fontFamily: "roboto",
    fontSize: 20,
    color: "#2290CD",
    marginTop: 30,
  },
  touch: {
    margin: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    //fontFamily: 'Iowan Old Style',
    fontSize: 16,
    color: "#000000",
  },
});

export default SuperAdminView;
