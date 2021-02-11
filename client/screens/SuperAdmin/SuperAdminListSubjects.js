import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";

export const GET_SUBJECTS_FROM_COURSE_BY_ID = gql`
  query GetSubjectsFromCourseId($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      subjects {
        _id
        name
        teacher {
          name
          _id
        }
      }
    }
  }
`;

const DELETE_SUBJECT_BY_ID = gql`
  mutation DeleteSubject($_id: ID) {
    deleteSubject(_id: $_id) {
      _id
      name
    }
  }
`;

const SuperAdminListSubjects = ({ navigation, route }) => {
  const { _id } = route.params.params;
  const { data, loading, error } = useQuery(GET_SUBJECTS_FROM_COURSE_BY_ID, {
    variables: { _id },
  });

  const [deleteSubject, mutationData] = useMutation(DELETE_SUBJECT_BY_ID);

  if (loading || mutationData.loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error || mutationData.error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  } else if (data) {
    const subjects = data.courses[0].subjects;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("SuperAdminAddSubject", {
                params: data.courses[0]._id,
              })
            }
          >
            <Text
              style={styles.touchText}
            >
              Agregar Materia
            </Text>
          </TouchableHighlight>
          {subjects.length ? (
            <Card>
              <Card.Title>MATERIAS DE {data.courses[0].name}</Card.Title>
              <Card.Divider />
              {subjects.map((subject, i) => {
                return (
                  <View key={subject._id} style={styles.cards}>
                    <Text style={{ fontSize: 18 }}>{subject.name}</Text>
                    {subject.teacher ? (
                      <TouchableHighlight
                        style={styles.buttonDel}
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() =>
                          navigation.navigate("DeleteTeacherFromSubject", {
                            params: { id: subject._id },
                          })
                        }
                      >
                        <Text style={styles.textHigh}>Borrar Profesor</Text>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        style={styles.button}
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() =>
                          navigation.navigate("AddTeacherToSubject", {
                            screen: "AddTeacherToSubject",
                            params: { id: subject._id, name: subject.name },
                          })
                        }
                      >
                        <Text style={styles.textHigh}>Agregar Profesor</Text>
                      </TouchableHighlight>
                    )}
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor=""
                      style={styles.buttonEx}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar curso",
                          `¿Está seguro que desea eliminar esta materia:
                          "${subject.name}"?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: async () =>
                                await deleteSubject({
                                  variables: { _id: subject._id },
                                  refetchQueries: [
                                    { query: GET_SUBJECTS_FROM_COURSE_BY_ID },
                                  ],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.textHigh}>X</Text>
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY MATERIAS PARA ESTE CURSO</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    // marginLeft: 12,
  },
  cards: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 900,
    alignItems: "center"
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  img: {
    color: "white",
    fontSize: 15,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //width: 334,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 7,
    justifyContent: "center",
    minWidth: 130,
    minHeight: 40,
    alignItems: 'center'
  },
  buttonDel: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    justifyContent: "center",
    minWidth: 130,
    minHeight: 40,
    alignItems: 'center'
  },
  buttonEx: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 2,
    width: 35,
    height: 40,
    justifyContent: "center",
  },
  textHigh: {
    color: "white",
  },
});


export default SuperAdminListSubjects;
