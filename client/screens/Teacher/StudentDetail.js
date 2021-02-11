import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";

export const GET_STUDENTS_BY_ID = gql`
  query GetStudentById($_id: ID) {
    students(_id: $_id) {
      _id
      name
      lastname
      dni
      email
      whatsapp
      address
      birthday
      picture
      course {
        _id
        name
        subjects {
          _id
          name
          modules {
            _id
            name
            classes {
              _id
              name
              deliveries
            }
          }
        }
      }
    }
  }
`;

function StudentDetail({ route }) {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_STUDENTS_BY_ID, {
    variables: { _id },
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    const student = data.students[0];

    return (
      <CenterView>
        <View style={styles.card}>
          <ScrollView>
            <View style={styles.centerView}>
              <View>
                <UserAvatar
                  size={100}
                  name={`${student.name} ${student.lastname}`}
                  style={{
                    backgroundColor: "#2290CD",
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    marginTop: 20,
                    alignSelf: "center",
                  }}
                />
              </View>

              <Text style={styles.textName}>
                {`${student.name} ${student.lastname}`}
              </Text>
              <Text style={styles.textRole}>Estudiante</Text>

              <View style={styles.cardcount}>
                <Text style={styles.count}>Calificaciones</Text>
              </View>
              {/* ------------------------------------------------- */}
              <View style={styles.inputScore}>
                <Text style={styles.touchScore}>Unidad</Text>
                <Text style={styles.touchScore}>%</Text>
                <Text style={styles.touchScore}>Estado{"         "}</Text>
              </View>
              {/* -------------------- Percentage ----------------------------- */}

              {student.course.subjects[0].modules?.map((unity, index) => {
                const deliveriesPerModule = unity.classes?.map(
                  (classes, index) => {
                    let count = 0;
                    classes.deliveries?.map((el) => {
                      if (el.split(".", 1)[0] === student.dni) {
                        count += 1;
                      } else {
                        count;
                      }
                      return count;
                    });
                    return count;
                  }
                );
                const reducer = deliveriesPerModule?.reduce(
                  (acc, currentValue) => {
                    acc += currentValue;
                    return acc;
                  },
                  0
                );
                const percentage = Math.floor(
                  (reducer / unity.classes.length) * 100
                );

                return (
                  <View key={index} style={styles.inputScore}>
                    <Text style={styles.touchScore}>{unity.name}</Text>
                    <Text style={styles.touchScore}>
                      {isNaN(percentage) ? <>---</> : percentage + "%"}
                    </Text>
                    {percentage === 100 ? (
                      <Text style={styles.touchScore}>Excelente</Text>
                    ) : percentage >= 85 ? (
                      <Text style={styles.touchScore}>Muy Bueno</Text>
                    ) : percentage >= 70 ? (
                      <Text style={styles.touchScore}>Bueno</Text>
                    ) : percentage >= 60 ? (
                      <Text style={styles.touchScore}>Aprobado</Text>
                    ) : percentage >= 45 ? (
                      <Text style={styles.touchScore}>Desaprobado</Text>
                    ) : percentage >= 30 ? (
                      <Text style={styles.touchScore}>Bajo desempeño</Text>
                    ) : percentage >= 10 ? (
                      <Text style={styles.touchScore}>Muy bajo desempeño</Text>
                    ) : isNaN(percentage)  ? (
                      <Text style={styles.touchScore}>Sin estado{"       "}</Text>
                    ) : (
                      <Text style={styles.touchScore}>Alumno en riesgo</Text>
                    )}
                  </View>
                );
              })}
              {/* ------------------------------------------------- */}
            </View>

            {/* -------------------------------------------------------------- */}
            <View style={styles.cardcount}>
              <Text style={styles.count}>Datos Personales</Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.touch}>Correo: {`${student.email}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>DNI: {`${student.dni}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>
                Dirección: {`${student.address}`}
              </Text>
            </View>
            <View style={[styles.input, styles.inputMateria]}>
              <Text style={styles.touch}>Fecha: {`${student.birthday}`}</Text>
            </View>
          </ScrollView>
        </View>
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 10,
    color: "#2290CD",
    width: 90,
    textAlign: "center",
    fontSize: 14,
  },
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
  },

  touchLink: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    shadowOpacity: 80,
    elevation: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  card: {
    width: `100%`,
    height: `100%`,
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cardcount: {
    width: `100%`,
    height: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  count: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  user: {
    backgroundColor: "#2290CD",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  textName: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "center",
  },
  textRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  inputScore: {
    alignSelf: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 5,
    marginTop: 8,
  },
  touchScore: {
    justifyContent: "flex-start",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  inputMateria: {
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentDetail;
