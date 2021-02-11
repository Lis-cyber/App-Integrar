import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import {Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";
import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const GET_TEACHERS_FROM_STUDENT = gql`
  query GetTeachersFromStudent($dni: String) {
    students(dni: $dni) {
      _id
      name
      course {
        name
        subjects {
          name
          teacher {
            name
            _id
            lastname
            whatsapp
          }
        }
      }
    }
  }
`;



const StudentScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user
  const { data, loading, error } = useQuery(GET_TEACHERS_FROM_STUDENT, {
    variables: { dni },
  });
if (data){
  AsyncStorage.setItem("teachers", JSON.stringify(data?.students[0].course?.subjects));
}
  return (
    <CenterView>
      <Text style={styles.title}>
        ¡Hola {user.name}
        {user.lastname}! Bienvenido
      </Text>
      <View style={styles.twoImages}>
      <View style={styles.alumn}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Materias", {screen:"StudentSubjects"})
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/5836.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>Mis Materias</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.alumn}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Profesores", {screen:"StudentTeachers"})
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/teacher.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText}>Mis Profesores</Text>
            </View>
          </TouchableHighlight>
        </View>
        </View>
      <View style={styles.cont}>
        <View style={styles.materias}>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("Mi Perfil", {screen: "StudentProfile"})
            }
          >
            <View style={styles.button}>
              <Image
                source={require("../../assets/53571.jpg")}
                style={styles.img}
              />
              <Text style={styles.touchText3}>Mi Perfil</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  twoImages: {
    marginLeft: 40,
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
  img: {
    //marginTop: 5,
    width: 158,
    height: 165,
  },
  title: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 25,
  },
  touch: {
    //margin: 7,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  touchText: {
    fontSize: 18,
    color: "#272626",
    fontWeight: "bold",
  },
  touchText3: {
    fontSize: 18,
    color: "#272626",
    fontWeight: "bold",
    margin: 12
  },
  alumn: {
    margin: 15
  },
});

export default StudentScreen;
