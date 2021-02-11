import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
// import { Card } from "react-native-paper";
import { Card } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

export const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
      dni
      course {
        _id
        name
      }
    }
  }
`;

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      deliveries
      corrections {
        student {
          _id
          name
        }
        score
      }
    }
  }
`;

export const SET_CORRECTION = gql`
  mutation setCorrection($classID: ID!, $studentID: ID!, $score: String!) {
    editClass(
      _id: $classID
      input: { corrections: { student: $studentID, score: $score } }
    ) {
      corrections {
        student {
          _id
          name
        }
        score
      }
    }
  }
`;

const StudentsHomeworks = ({ route }) => {
  const { _id, courseId } = route.params;

  const {
    data: dataClass,
    loading: dataClassLoading,
    error: dataClassError,
  } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const {
    data: dataStudent,
    loading: loadingStudent,
    error: errorStudent,
  } = useQuery(GET_STUDENTS);

  const [
    editClass,
    { data: dataMutation, error: errorMutation, loading: loadingMutation },
  ] = useMutation(SET_CORRECTION);

  const handleFilePress = (dni) => {
    let dniSplitted = dni.split(".")[0];
    for (let i = 0; i < dataStudent.students.length; i++) {
      if (dniSplitted == dataStudent.students[i].dni) {
        return WebBrowser.openBrowserAsync(
          `http://${LOCAL_IP}:4000/download/students/${_id}/${dni}`
        );
      }
    }
  };

  if (dataClassLoading || loadingStudent || loadingMutation) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (dataClassError || errorStudent || errorMutation) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (dataClass || dataStudent || dataMutation) {
    const homeworkList = dataClass.classes[0].deliveries;
    const allStudents = dataStudent?.students;
    const dniFromData = dataClass?.classes[0].deliveries.map(
      (dni) => dni.split(".")[0]
    );
    let scores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const studentsCorrections = dataClass.classes[0].corrections;
    const studentsInCourse = allStudents.filter((_student) => {
      if (_student.course?._id === courseId) {
        return _student;
      }
    });

    const totalStudents = studentsInCourse.map((el) => el);

    const percentageStudentsWithHomework = Math.floor(
      (homeworkList.length / totalStudents.length) * 100
    );

    const handleOnPress = async ({ id, idStudent, score }) => {
      try {
        await editClass({
          variables: {
            classID: id,
            studentID: idStudent,
            score: score,
          },
          refetchQueries: [{ query: GET_CLASS_BY_ID }],
        });
      } catch (err) {
        console.log("error: ", err);
      }
    };

    const studentsWithHomework = allStudents.filter((student) => {
      if (dniFromData.includes(student.dni)) {
        return student;
      }
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.name}>
            Participación de alumnos: {percentageStudentsWithHomework}%
          </Text>
          <Card>
            <Card.Title>Tareas Recibidas</Card.Title>
            <Card.Divider />
            {homeworkList.length ? (
              homeworkList.map((studentFile, i) => {
                return (
                  <View style={styles.cardIn} key={i}>
                    {studentsWithHomework.map((oneStudent, i) => {
                      if (oneStudent.dni === studentFile.split(".")[0]) {
                        return (
                          <View key={i} style={styles.cont}>
                            <Text style={styles.text}>
                              {oneStudent.name} {oneStudent.lastname}
                            </Text>
                            {/* ------------------------------- Ver Nota ---------------------- */}
                            {studentsCorrections.map((studentScore, index2) => {
                              if (oneStudent._id === studentScore.student._id) {
                                return (
                                  <View key={index2}>
                                    <Text style={styles.textNote}>
                                      {" "}
                                      NOTA: {studentScore.score}
                                    </Text>
                                  </View>
                                );
                              }
                            })}
                            {/* ------------------------------ Seleccionar Nota----------------------- */}

                            <View style={styles.pickerView}>
                              <Picker
                                style={styles.picker}
                                onValueChange={(item) =>
                                  handleOnPress({
                                    id: _id,
                                    idStudent: oneStudent._id,
                                    score: item,
                                  })
                                }
                              >
                                <Picker.Item label="PTOS" value="null" />
                                {scores.map((item, index) => {
                                  return (
                                    <Picker.Item
                                      label={item}
                                      value={item}
                                      key={index}
                                    />
                                  );
                                })}
                              </Picker>
                            </View>
                            {/* -------------------------- Ver Archivo --------------------------- */}

                            <TouchableOpacity
                              style={styles.button}
                              activeOpacity={0.6}
                              underlayColor=""
                              onPress={() => handleFilePress(studentFile)}
                            >
                              <Text style={styles.textHigh}>VER</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })
            ) : (
              <View>
                <CenterView>
                  <Text>
                    Al parecer tus alumnos son un poco irresponsables...
                  </Text>
                </CenterView>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  cont: {
    justifyContent: "space-evenly",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    maxWidth: 900,
  },

  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
  },

  button: {
    backgroundColor: "#2290CD",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    minHeight: 30,
    borderRadius: 7,
    marginLeft: 30,
  },
  textHigh: {
    color: "white",
  },
  text: {
    marginRight: 5,
    fontSize: 16,
  },
  textNote: {
    fontSize: 14,
    color: "black",
    marginLeft: 20,
    marginRight: 30,
    alignSelf: "center",
  },
  pickerView: {
    fontSize: 5,
    backgroundColor: `#d8bfd8`,
    borderRadius: 8,
  },
  picker: {
    color: "white",
    maxHeight: 30,
    minHeight: 30,
    minWidth: 60,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    alignItems: "flex-start",
    color: "#2290CD",

  }
});
export default StudentsHomeworks;
